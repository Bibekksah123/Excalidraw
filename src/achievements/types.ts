export enum AchievementCategory {
  DRAWING = "drawing",
  COLLABORATION = "collaboration",
  LEARNING = "learning",
  MILESTONES = "milestones",
}

export enum AchievementRarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

export enum RequirementType {
  SHAPES_DRAWN = "shapes_drawn",
  ELEMENTS_CREATED = "elements_created",
  DRAWINGS_CREATED = "drawings_created",
  EXPORTS_COMPLETED = "exports_completed",
  COLLAB_INVITES_SENT = "collab_invites_sent",
  UNDO_ACTIONS = "undo_actions",
  TIME_SPENT_MINUTES = "time_spent_minutes",
}

export interface AchievementRequirement {
  type: RequirementType;
  target: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  points: number;
  icon: string;
  requirement: AchievementRequirement;
}

export interface AchievementProgress {
  achievementId: string;
  current: number;
  target: number;
  completed: boolean;
  percentage: number;
}

export interface AchievementNotification {
  achievementId: string;
  title: string;
  message: string;
  points: number;
  unlockedAt: string;
}

export interface UserStats {
  [RequirementType.SHAPES_DRAWN]: number;
  [RequirementType.ELEMENTS_CREATED]: number;
  [RequirementType.DRAWINGS_CREATED]: number;
  [RequirementType.EXPORTS_COMPLETED]: number;
  [RequirementType.COLLAB_INVITES_SENT]: number;
  [RequirementType.UNDO_ACTIONS]: number;
  [RequirementType.TIME_SPENT_MINUTES]: number;
}

export interface UserAchievementState {
  id: string;
  unlockedAt: string;
}

export interface UserAchievementData {
  userId: string;
  unlockedAchievements: UserAchievementState[];
  totalPoints: number;
  level: number;
  levelName: string;
  stats: UserStats;
}

export interface LevelDefinition {
  level: number;
  name: string;
  minPoints: number;
}
