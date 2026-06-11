import {
  Achievement,
  AchievementCategory,
  AchievementRarity,
  LevelDefinition,
  RequirementType,
} from "./types";

export const LEVELS: LevelDefinition[] = [
  { level: 1, name: "Novice", minPoints: 0 },
  { level: 2, name: "Apprentice", minPoints: 100 },
  { level: 3, name: "Skilled", minPoints: 250 },
  { level: 4, name: "Expert", minPoints: 450 },
  { level: 5, name: "Master", minPoints: 700 },
  { level: 6, name: "Legend", minPoints: 1000 },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-shape",
    name: "First Stroke",
    description: "Draw your first shape.",
    category: AchievementCategory.DRAWING,
    rarity: AchievementRarity.COMMON,
    points: 20,
    icon: "✏️",
    requirement: { type: RequirementType.SHAPES_DRAWN, target: 1 },
  },
  {
    id: "shape-starter",
    name: "Shape Starter",
    description: "Draw 25 shapes.",
    category: AchievementCategory.DRAWING,
    rarity: AchievementRarity.UNCOMMON,
    points: 35,
    icon: "🧩",
    requirement: { type: RequirementType.SHAPES_DRAWN, target: 25 },
  },
  {
    id: "shape-master",
    name: "Shape Master",
    description: "Draw 200 shapes.",
    category: AchievementCategory.DRAWING,
    rarity: AchievementRarity.RARE,
    points: 75,
    icon: "🎨",
    requirement: { type: RequirementType.SHAPES_DRAWN, target: 200 },
  },
  {
    id: "element-maker",
    name: "Element Maker",
    description: "Create 50 elements.",
    category: AchievementCategory.DRAWING,
    rarity: AchievementRarity.UNCOMMON,
    points: 40,
    icon: "🔧",
    requirement: { type: RequirementType.ELEMENTS_CREATED, target: 50 },
  },
  {
    id: "element-architect",
    name: "Element Architect",
    description: "Create 250 elements.",
    category: AchievementCategory.DRAWING,
    rarity: AchievementRarity.EPIC,
    points: 120,
    icon: "🏗️",
    requirement: { type: RequirementType.ELEMENTS_CREATED, target: 250 },
  },
  {
    id: "first-drawing",
    name: "Canvas Opened",
    description: "Create your first drawing.",
    category: AchievementCategory.MILESTONES,
    rarity: AchievementRarity.COMMON,
    points: 20,
    icon: "🖼️",
    requirement: { type: RequirementType.DRAWINGS_CREATED, target: 1 },
  },
  {
    id: "drawing-regular",
    name: "Drawing Regular",
    description: "Create 20 drawings.",
    category: AchievementCategory.MILESTONES,
    rarity: AchievementRarity.RARE,
    points: 80,
    icon: "📘",
    requirement: { type: RequirementType.DRAWINGS_CREATED, target: 20 },
  },
  {
    id: "export-first",
    name: "Ready to Share",
    description: "Export your first drawing.",
    category: AchievementCategory.MILESTONES,
    rarity: AchievementRarity.COMMON,
    points: 25,
    icon: "📤",
    requirement: { type: RequirementType.EXPORTS_COMPLETED, target: 1 },
  },
  {
    id: "export-pro",
    name: "Export Pro",
    description: "Complete 25 exports.",
    category: AchievementCategory.MILESTONES,
    rarity: AchievementRarity.RARE,
    points: 85,
    icon: "🚀",
    requirement: { type: RequirementType.EXPORTS_COMPLETED, target: 25 },
  },
  {
    id: "invite-first",
    name: "Team Builder",
    description: "Send your first collaboration invite.",
    category: AchievementCategory.COLLABORATION,
    rarity: AchievementRarity.COMMON,
    points: 30,
    icon: "🤝",
    requirement: { type: RequirementType.COLLAB_INVITES_SENT, target: 1 },
  },
  {
    id: "invite-captain",
    name: "Collab Captain",
    description: "Send 20 collaboration invites.",
    category: AchievementCategory.COLLABORATION,
    rarity: AchievementRarity.EPIC,
    points: 130,
    icon: "🧑‍🤝‍🧑",
    requirement: { type: RequirementType.COLLAB_INVITES_SENT, target: 20 },
  },
  {
    id: "undo-learner",
    name: "Undo Learner",
    description: "Use undo 10 times.",
    category: AchievementCategory.LEARNING,
    rarity: AchievementRarity.UNCOMMON,
    points: 30,
    icon: "↩️",
    requirement: { type: RequirementType.UNDO_ACTIONS, target: 10 },
  },
  {
    id: "undo-ninja",
    name: "Undo Ninja",
    description: "Use undo 100 times.",
    category: AchievementCategory.LEARNING,
    rarity: AchievementRarity.RARE,
    points: 90,
    icon: "🥷",
    requirement: { type: RequirementType.UNDO_ACTIONS, target: 100 },
  },
  {
    id: "focused-creator",
    name: "Focused Creator",
    description: "Spend 60 minutes drawing.",
    category: AchievementCategory.LEARNING,
    rarity: AchievementRarity.UNCOMMON,
    points: 45,
    icon: "⏱️",
    requirement: { type: RequirementType.TIME_SPENT_MINUTES, target: 60 },
  },
  {
    id: "deep-work",
    name: "Deep Work",
    description: "Spend 600 minutes drawing.",
    category: AchievementCategory.LEARNING,
    rarity: AchievementRarity.LEGENDARY,
    points: 220,
    icon: "🧠",
    requirement: { type: RequirementType.TIME_SPENT_MINUTES, target: 600 },
  },
  {
    id: "all-rounder",
    name: "All-Rounder",
    description: "Create 500 elements.",
    category: AchievementCategory.MILESTONES,
    rarity: AchievementRarity.EPIC,
    points: 140,
    icon: "🏆",
    requirement: { type: RequirementType.ELEMENTS_CREATED, target: 500 },
  },
];

export const getAchievementById = (id: string) =>
  ACHIEVEMENTS.find((achievement) => achievement.id === id);

export const getAchievementsByCategory = (category: AchievementCategory) =>
  ACHIEVEMENTS.filter((achievement) => achievement.category === category);

export const getCurrentLevel = (points: number): LevelDefinition => {
  const level = [...LEVELS]
    .reverse()
    .find((item) => points >= item.minPoints);

  return level ?? LEVELS[0];
};
