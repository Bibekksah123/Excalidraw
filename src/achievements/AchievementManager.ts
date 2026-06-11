import { ACHIEVEMENTS, getAchievementById, getCurrentLevel } from "./achievements";
import {
  Achievement,
  AchievementNotification,
  AchievementProgress,
  RequirementType,
  UserAchievementData,
  UserAchievementState,
  UserStats,
} from "./types";

const STORAGE_KEY = "excalidraw-achievements";

const createDefaultStats = (): UserStats => ({
  [RequirementType.SHAPES_DRAWN]: 0,
  [RequirementType.ELEMENTS_CREATED]: 0,
  [RequirementType.DRAWINGS_CREATED]: 0,
  [RequirementType.EXPORTS_COMPLETED]: 0,
  [RequirementType.COLLAB_INVITES_SENT]: 0,
  [RequirementType.UNDO_ACTIONS]: 0,
  [RequirementType.TIME_SPENT_MINUTES]: 0,
});

const hasWindow = () => typeof window !== "undefined" && !!window.localStorage;

export class AchievementManager {
  private users = new Map<string, UserAchievementData>();
  private notifications: AchievementNotification[] = [];

  constructor() {
    this.load();
  }

  initializeUser(userId: string): UserAchievementData {
    const existing = this.users.get(userId);
    if (existing) {
      return existing;
    }

    const startingLevel = getCurrentLevel(0);

    const user: UserAchievementData = {
      userId,
      unlockedAchievements: [],
      totalPoints: 0,
      level: startingLevel.level,
      levelName: startingLevel.name,
      stats: createDefaultStats(),
    };

    this.users.set(userId, user);
    this.persist();
    return user;
  }

  getUserData(userId: string): UserAchievementData {
    return this.initializeUser(userId);
  }

  updateStat(userId: string, stat: RequirementType, increment = 1): Achievement[] {
    const user = this.initializeUser(userId);
    user.stats[stat] = Math.max(0, user.stats[stat] + increment);

    const unlocked = this.evaluateUnlocks(user);
    this.persist();
    return unlocked;
  }

  setStat(userId: string, stat: RequirementType, value: number): Achievement[] {
    const user = this.initializeUser(userId);
    user.stats[stat] = Math.max(0, value);

    const unlocked = this.evaluateUnlocks(user);
    this.persist();
    return unlocked;
  }

  getUnlockedAchievements(userId: string): Achievement[] {
    const user = this.initializeUser(userId);
    const unlockedIds = new Set(user.unlockedAchievements.map((item) => item.id));

    return ACHIEVEMENTS.filter((achievement) => unlockedIds.has(achievement.id));
  }

  getProgress(userId: string): AchievementProgress[] {
    const user = this.initializeUser(userId);
    const unlockedIds = new Set(user.unlockedAchievements.map((item) => item.id));

    return ACHIEVEMENTS.map((achievement) => {
      const current = user.stats[achievement.requirement.type] ?? 0;
      const target = achievement.requirement.target;
      const completed = unlockedIds.has(achievement.id);

      return {
        achievementId: achievement.id,
        current,
        target,
        completed,
        percentage: Math.min(100, Math.floor((current / target) * 100)),
      };
    });
  }

  getNotifications(): AchievementNotification[] {
    return [...this.notifications];
  }

  clearNotifications(): void {
    this.notifications = [];
  }

  exportUserData(userId: string): string {
    return JSON.stringify(this.initializeUser(userId), null, 2);
  }

  private evaluateUnlocks(user: UserAchievementData): Achievement[] {
    const unlockedSet = new Set(user.unlockedAchievements.map((item) => item.id));
    const newUnlocks: Achievement[] = [];

    for (const achievement of ACHIEVEMENTS) {
      if (unlockedSet.has(achievement.id)) {
        continue;
      }

      const value = user.stats[achievement.requirement.type] ?? 0;
      if (value < achievement.requirement.target) {
        continue;
      }

      const unlockedAt = new Date().toISOString();
      const state: UserAchievementState = { id: achievement.id, unlockedAt };
      user.unlockedAchievements.push(state);
      user.totalPoints += achievement.points;
      newUnlocks.push(achievement);

      this.notifications.push({
        achievementId: achievement.id,
        title: "Achievement Unlocked!",
        message: `${achievement.icon} ${achievement.name}`,
        points: achievement.points,
        unlockedAt,
      });
    }

    const level = getCurrentLevel(user.totalPoints);
    user.level = level.level;
    user.levelName = level.name;

    return newUnlocks;
  }

  private persist(): void {
    if (!hasWindow()) {
      return;
    }

    const serialized = JSON.stringify(Array.from(this.users.entries()));
    window.localStorage.setItem(STORAGE_KEY, serialized);
  }

  private load(): void {
    if (!hasWindow()) {
      return;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const entries = JSON.parse(raw) as [string, UserAchievementData][];
      this.users = new Map(entries);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
}

export const achievementManager = new AchievementManager();
