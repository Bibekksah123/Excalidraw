import { achievementManager } from "./AchievementManager";
import { RequirementType } from "./types";

const userId = "demo-user";

export const initializeAchievements = () => {
  achievementManager.initializeUser(userId);
};

export const onShapeDrawn = () => {
  achievementManager.updateStat(userId, RequirementType.SHAPES_DRAWN);
};

export const onElementCreated = () => {
  achievementManager.updateStat(userId, RequirementType.ELEMENTS_CREATED);
};

export const onDrawingCreated = () => {
  achievementManager.updateStat(userId, RequirementType.DRAWINGS_CREATED);
};

export const onExportCompleted = () => {
  achievementManager.updateStat(userId, RequirementType.EXPORTS_COMPLETED);
};

export const onCollaborationInviteSent = () => {
  achievementManager.updateStat(userId, RequirementType.COLLAB_INVITES_SENT);
};

export const onUndoUsed = () => {
  achievementManager.updateStat(userId, RequirementType.UNDO_ACTIONS);
};

export const onEditorTimeSpent = (minutes: number) => {
  achievementManager.updateStat(userId, RequirementType.TIME_SPENT_MINUTES, minutes);
};

export const getAchievementSnapshot = () => ({
  user: achievementManager.getUserData(userId),
  unlocked: achievementManager.getUnlockedAchievements(userId),
  progress: achievementManager.getProgress(userId),
  notifications: achievementManager.getNotifications(),
});
