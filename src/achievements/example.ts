/**
 * Example: How to integrate the Achievement System into Excalidraw
 * This file demonstrates integration patterns for tracking user actions
 */

import { achievementManager } from "./AchievementManager";
import { RequirementType } from "./types";

/**
 * Initialize achievements for current user
 */
export function initializeAchievementsForUser(userId: string): void {
  achievementManager.initializeUser(userId);
  console.log("Achievements initialized for user:", userId);
}

/**
 * Example: Track when a shape is drawn
 * Call this when a user creates any shape (rectangle, circle, line, etc.)
 */
export function onShapeDrawn(userId: string): void {
  achievementManager.updateStat(userId, RequirementType.SHAPES_DRAWN);
  // Automatically checks:
  // - "Getting Started" (1 shape)
  // - "Artistic" (10 shapes)
  // - "Master Artist" (100 shapes)
}

/**
 * Example: Track when elements are created
 * Call this when any element (text, shape, connector, etc.) is added
 */
export function onElementCreated(userId: string, count: number = 1): void {
  achievementManager.updateStat(userId, RequirementType.ELEMENTS_CREATED, count);
  // Automatically checks:
  // - "Element Master" (500 elements)
}

/**
 * Example: Track when a drawing is created (new file)
 * Call this when user creates a new drawing/canvas
 */
export function onNewDrawing(userId: string): void {
  achievementManager.updateStat(userId, RequirementType.DRAWINGS_CREATED);
  // Automatically checks:
  // - "Creator" (1 drawing)
  // - "Prolific" (10 drawings)
}

/**
 * Example: Track when a drawing is exported
 * Call this when user exports to PNG, SVG, etc.
 */
export function onDrawingExported(userId: string): void {
  achievementManager.updateStat(userId, RequirementType.EXPORTS_COMPLETED);
  // Automatically checks:
  // - "Share Your Work" (1 export)
}

/**
 * Example: Track when someone is invited to collaborate
 * Call this when user invites another user to edit the drawing
 */
export function onCollaboratorInvited(userId: string, invitedCount: number = 1): void {
  achievementManager.updateStat(
    userId,
    RequirementType.COLLABORATORS_INVITED,
    invitedCount
  );
  // Automatically checks:
  // - "Team Player" (1 collaborator)
  // - "Team Leader" (5 collaborators)
}

/**
 * Example: Track undo actions
 * Call this in your undo handler
 */
export function onUndoAction(userId: string): void {
  achievementManager.updateStat(userId, RequirementType.UNDO_ACTIONS);
  // Automatically checks:
  // - "Undo Master" (100 undo actions)
}

/**
 * Example: Track time spent drawing
 * Call this periodically (e.g., every minute) or when user closes the app
 */
export function trackTimeSpent(userId: string, minutes: number): void {
  achievementManager.updateStat(userId, RequirementType.TIME_SPENT, minutes);
  // Automatically checks:
  // - "Dedicated Creator" (60 minutes)
  // - "Passionate Artist" (600 minutes)
}

/**
 * Example: Unlock a hidden achievement/easter egg
 * Call this when user discovers a secret feature
 */
export function unlockEasterEgg(userId: string): void {
  achievementManager.updateStat(userId, RequirementType.CUSTOM_SHAPES, 1);
  // Automatically checks:
  // - "Easter Egg Hunter" (secret)
}

/**
 * Example: Display achievements UI
 * Call this to render the achievements panel/modal
 */
export function displayAchievementsUI(userId: string): void {
  const userAchievements = achievementManager.getUserAchievements(userId);

  console.log("=== User Achievements ===");
  console.log(`Level: ${userAchievements.level}`);
  console.log(`Total Points: ${userAchievements.totalPoints}`);
  console.log(`Badges: ${userAchievements.unlockedBadges.join(" ")}`);

  // Show unlocked achievements
  const unlocked = achievementManager.getUnlockedAchievements(userId);
  console.log("\n✅ Unlocked Achievements:");
  unlocked.forEach((ach) => {
    console.log(`  ${ach.icon} ${ach.name} (${ach.points} pts)`);
  });

  // Show progress on locked achievements
  console.log("\n🔒 In Progress:");
  const locked = achievementManager.getLockedAchievements(userId);
  locked.forEach((ach) => {
    const progress = achievementManager.getAchievementProgress(
      userId,
      ach.id
    );
    if (progress) {
      const percentage = Math.round(
        (progress.progress / progress.maxProgress) * 100
      );
      console.log(
        `  ${ach.icon} ${ach.name}: ${progress.progress}/${progress.maxProgress} (${percentage}%)`
      );
    }
  });

  // Show next level progress
  const levelProgress = achievementManager.getProgressToNextLevel(userId);
  if (levelProgress.current < levelProgress.next) {
    const percentage = Math.round(
      (levelProgress.current / levelProgress.next) * 100
    );
    console.log(`\n📊 Progress to Next Level: ${percentage}%`);
  }
}

/**
 * Example: Show recent notifications
 * Call this to display achievement unlock notifications
 */
export function showNotifications(userId: string): void {
  const notifications = achievementManager.getNotifications();

  if (notifications.length === 0) {
    console.log("No new achievements");
    return;
  }

  console.log("\n🎉 Achievement Notifications:");
  notifications.forEach((notif) => {
    console.log(`  ${notif.message}`);
  });

  achievementManager.clearNotifications();
}

/**
 * Example: Export user data
 * Call this to get all achievement data as JSON
 */
export function exportUserData(userId: string): void {
  const data = achievementManager.exportData(userId);
  console.log("User Achievement Data:");
  console.log(data);

  // Could save to file or send to server
  return data;
}

/**
 * Example: Integration with Excalidraw main functions
 * Add these calls to your Excalidraw event handlers
 */
export const INTEGRATION_POINTS = {
  // In your shape/element handlers:
  onCreateShape: () => {
    // onShapeDrawn(userId);
    // onElementCreated(userId, 1);
  },

  // In your export function:
  onExport: () => {
    // onDrawingExported(userId);
  },

  // In your new file handler:
  onNewFile: () => {
    // onNewDrawing(userId);
  },

  // In your undo handler:
  onUndo: () => {
    // onUndoAction(userId);
  },

  // In your collaboration invite:
  onInviteCollaborator: () => {
    // onCollaboratorInvited(userId, 1);
  },

  // Periodically (e.g., on app close):
  onAppClose: () => {
    // trackTimeSpent(userId, timeDifference);
    // displayAchievementsUI(userId);
    // showNotifications(userId);
  },
};

/**
 * Example: Complete user session tracking
 * This shows how to track a complete drawing session
 */
export function simulateUserSession(userId: string): void {
  console.log("\n=== Simulating User Session ===\n");

  // Initialize
  initializeAchievementsForUser(userId);

  // User creates new drawing
  onNewDrawing(userId);
  console.log("✓ Created new drawing");

  // User draws some shapes
  for (let i = 0; i < 5; i++) {
    onShapeDrawn(userId);
    onElementCreated(userId, 1);
  }
  console.log("✓ Drew 5 shapes");

  // User undoes a few times
  for (let i = 0; i < 3; i++) {
    onUndoAction(userId);
  }
  console.log("✓ Used undo 3 times");

  // User invites a collaborator
  onCollaboratorInvited(userId);
  console.log("✓ Invited 1 collaborator");

  // User exports their drawing
  onDrawingExported(userId);
  console.log("✓ Exported drawing");

  // Session lasted about 15 minutes
  trackTimeSpent(userId, 15);

  console.log("\n=== Session Results ===\n");
  displayAchievementsUI(userId);
  showNotifications(userId);
}

// Run simulation if this file is executed directly
if (require.main === module) {
  simulateUserSession("example_user_123");
}
