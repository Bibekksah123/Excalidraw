# 🏆 Achievements & Badges System

A comprehensive gamification system for tracking user contributions and achievements in the Excalidraw project.

## Overview

The achievements system is designed to:
- **Recognize contributions** - Celebrate milestones and achievements
- **Motivate participation** - Gamification through badges and levels
- **Track progress** - Visual progress indicators and statistics
- **Community engagement** - Leaderboards and shared achievements

## Architecture

### Packages

#### `@repo/achievements`
Core achievement tracking logic with no UI dependencies.

**Key Files:**
- `src/types.ts` - TypeScript interfaces and enums
- `src/definitions.ts` - Predefined achievement list
- `src/manager.ts` - Achievement manager class

**Main Components:**
- `Achievement` - Individual achievement definition
- `UserAchievements` - User's achievement collection
- `AchievementManager` - Core tracking logic

#### `@repo/ui`
React components for displaying achievements.

**Components:**
- `AchievementBadge` - Individual badge display
- `AchievementsGrid` - Grid view of multiple achievements
- `AchievementStats` - Statistics dashboard

## Achievement Categories

### 🎬 Contribution Achievements
- **First Step** - Make your first commit (1 commit)
- **Getting Started** - Make 10 commits
- **Dedicated** - Make 100 commits

### 🔀 Milestone Achievements
- **Pull Request Pioneer** - Submit your first PR
- **Code Accepted** - Get first PR merged
- **Trusted Contributor** - Get 10 PRs merged

### 🎓 Skill Achievements
- **Bug Hunter** - Help fix 5 bugs
- **Code Reviewer** - Review 10 pull requests
- **Doc Master** - Contribute documentation 3 times

### 🤝 Community Achievements
- **Question Asker** - Open your first issue
- **Helping Hand** - Resolve 5 community issues

### ⭐ Special Achievements
- **On Fire 🔥** - 30-day contribution streak (Epic)
- **Master Contributor** - Unlock 10+ achievements (Epic)
- **Legendary** - Unlock all achievements (Legendary)

## Rarity Levels

Each achievement has a rarity that determines its point value:

| Rarity | Points | Color |
|--------|--------|-------|
| Common | 10 | Gray |
| Uncommon | 25 | Blue |
| Rare | 50 | Purple |
| Epic | 100 | Orange |
| Legendary | 200 | Gold |

## Usage

### Basic Setup

```typescript
import { achievementManager } from '@repo/achievements';

// Initialize a user
achievementManager.initializeUser('user-123');

// Unlock an achievement
achievementManager.unlockAchievement('user-123', 'first_commit');

// Get user achievements
const userAchievements = achievementManager.getUserAchievements('user-123');
console.log(userAchievements);
// {
//   userId: 'user-123',
//   achievements: [{ id: 'first_commit', ... }],
//   totalPoints: 10,
//   level: 1,
//   lastUpdated: Date
// }
```

### Progress Tracking

```typescript
// Update progress toward an achievement
achievementManager.updateProgress('user-123', 'hundred_commits', 42, 100);

// Get progress
const progress = achievementManager.getProgress('user-123', 'hundred_commits');
console.log(progress);
// { achievementId: 'hundred_commits', current: 42, target: 100, completed: false }
```

### Displaying Achievements

```typescript
import { AchievementBadge, AchievementsGrid, AchievementStats } from '@repo/ui';

// Single badge
<AchievementBadge 
  achievement={achievement}
  locked={false}
  size="medium"
/>

// Grid of achievements
<AchievementsGrid 
  unlockedAchievements={userAchievements.achievements}
  category={AchievementCategory.CONTRIBUTION}
  title="Contribution Achievements"
/>

// Statistics dashboard
<AchievementStats 
  stats={userAchievements}
  completionPercentage={75}
/>
```

## Integration Points

### With GitHub Actions
Track achievements based on:
- Commits pushed
- Pull requests merged
- Issues closed
- Code review activity

### With User Profiles
- Display user's badges on profile
- Show achievement history
- Display current level and points

### With Leaderboards
- Rank users by total points
- Showcase top contributors
- Monthly achievement leaders

## Extending the System

### Adding New Achievements

1. Add to `ACHIEVEMENTS` in `packages/achievements/src/definitions.ts`:

```typescript
CUSTOM_ACHIEVEMENT: {
  id: "custom_achievement",
  name: "Achievement Name",
  description: "Achievement Description",
  category: AchievementCategory.CONTRIBUTION,
  rarity: AchievementRarity.RARE,
  icon: "🎯",
  color: "#FF5722",
  requirement: "Requirement description",
}
```

2. Use with manager:

```typescript
achievementManager.unlockAchievement('user-123', 'custom_achievement');
```

### Custom Categories

Extend `AchievementCategory` enum in `types.ts`:

```typescript
export enum AchievementCategory {
  // ... existing categories
  CUSTOM = "custom",
}
```

## API Reference

### AchievementManager Methods

- `initializeUser(userId)` - Create user achievement record
- `getUserAchievements(userId)` - Get user's achievements
- `unlockAchievement(userId, achievementId)` - Unlock achievement
- `updateProgress(userId, achievementId, current, target)` - Update progress
- `getProgress(userId, achievementId)` - Get achievement progress
- `getUserAchievementsByCategory(userId, category)` - Filter by category
- `getCategoryCompletion(userId, category)` - Get category completion %
- `getOverallCompletion(userId)` - Get overall completion %
- `exportUserAchievements(userId)` - Export as JSON
- `getLeaderboard(limit)` - Get top users

## Component Props

### AchievementBadge

```typescript
interface AchievementBadgeProps {
  achievement: Achievement;
  showLabel?: boolean;        // Show name and description (default: true)
  size?: 'small' | 'medium' | 'large';  // Badge size (default: medium)
  locked?: boolean;           // Show lock icon (default: false)
  onClick?: () => void;       // Click handler
}
```

### AchievementsGrid

```typescript
interface AchievementsGridProps {
  unlockedAchievements: Achievement[];  // Unlocked achievements
  category?: AchievementCategory;       // Filter by category
  title?: string;                       // Grid title
}
```

### AchievementStats

```typescript
interface AchievementStatsProps {
  stats: UserAchievements;         // User achievement stats
  completionPercentage?: number;   // Overall completion %
}
```

## Files Overview

```
packages/
├── achievements/
│   ├── src/
│   │   ├── types.ts          # TypeScript types and enums
│   │   ├── definitions.ts     # Achievement definitions
│   │   ├── manager.ts         # AchievementManager class
│   │   └── index.ts           # Public exports
│   ├── package.json
│   └── tsconfig.json
│
└── ui/
    └── src/
        └── achievements/
            ├── AchievementBadge.tsx
            ├── AchievementBadge.module.css
            ├── AchievementsGrid.tsx
            ├── AchievementsGrid.module.css
            ├── AchievementStats.tsx
            ├── AchievementStats.module.css
            └── index.ts
```

## Future Enhancements

- [ ] Achievements synced with GitHub API
- [ ] Time-based achievements (daily streaks, monthly challenges)
- [ ] Achievement notifications
- [ ] Social sharing of achievements
- [ ] Achievement unlocking animations
- [ ] Custom achievement templates for organizations
- [ ] Achievement analytics and insights

## Contributing

To add new achievements or components:

1. Update `packages/achievements/src/definitions.ts` with new achievement
2. Add UI components if needed in `packages/ui/src/achievements/`
3. Update this documentation
4. Test with real users

---

**Happy achieving! 🎉**
