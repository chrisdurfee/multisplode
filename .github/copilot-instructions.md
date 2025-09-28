# Multisplode - AI Coding Assistant Instructions

## Project Overview
Multisplode is a Canvas-based particle explosion game built with JavaScript, using the **Base Framework** (custom component system) and Vite for build tooling. The game features 40 levels where players destroy particles using limited devices/explosions.

## Key Architecture Patterns

### Base Framework Component System
- Uses `@base-framework/base` and `@base-framework/atoms` for component architecture
- Components follow functional patterns: `export const MyComponent = (props) => ({...})`
- Class-based components extend `Component` from Base Framework (see `src/components/pages/page.js`)
- Use `Atom()` wrapper for reusable components (see `AppContainer` in `app-shell.js`)

### Component Organization
```
src/components/
├── atoms/          # Small, reusable UI elements
├── organisms/      # Complex components (game-audio, timer, navigation)
├── pages/          # Route-based page components
├── prompts/        # Game instruction overlays
└── shell/          # App layout and routing
```

### Game Engine Structure
- **Stage** (`src/game/stage.js`): Main canvas renderer and game loop
- **Particles** (`src/game/particles/`): Physics-based moving objects with collision detection
- **Devices** (`src/game/devices/`): Explosion sources (shockwave, gravity-field)
- **LevelController** (`src/game/level/level-controller.js`): Game state management
- **Cache** (`src/game/cache.js`): Canvas drawing optimization

## Essential Development Workflows

### Build Commands
```bash
npm run dev          # Vite development server
npm run build        # Production build + TypeScript compilation
npm run type-check   # JSDoc type checking without emit
```

### TypeScript Integration
- Uses JSDoc comments for type checking in JavaScript files
- `tsconfig.json` configured with `allowJs: true, checkJs: true`
- Type declarations generated to `./dist/types/`

## Project-Specific Conventions

### Configuration Management
- Central config in `src/configs.js` - modify game dimensions, routing here
- Vite config imports from `src/configs.js` for baseUrl consistency

### Routing System
- Uses Base Framework router with overlay patterns
- Main content in `ActivePanelContainer`, overlays in separate route containers
- Navigation via `app.navigate('/route')` - always use AppController instance

### Game State Patterns
- Singletons for game systems: `Levels`, `Particles`, `Devices`, `Sounds`
- Use `Data.set()/get()` for persistence (see `src/components/data.js`)
- Level progression managed through `Levels.selectNextLevel()` pattern

### Canvas Rendering Optimization
- Pre-cache particle rendering with `Cache.add()` (see `particle.js` `cachePath()`)
- Use `MathUtil` functions for consistent math operations
- Animation system in `src/components/organisms/animate.js` handles CSS transitions

## Critical Integration Points

### Game Loop Flow
1. `AppController` → `Game` → `Stage` → `LevelController`
2. Stage handles canvas events, delegates to LevelController
3. LevelController manages Particles/Devices interaction
4. Use `stage.startDraw()` / `stage.stopDraw()` for game state

### Component Communication
- Pass game instance through props: `{game: gameInstance}`
- Use `game.app.navigate()` for route changes from components
- Access current level via `game.getCurrentLevel()`

### Audio System
- `GameAudio` component handles background music
- `Settings.song = 'filename.mp3'` to change tracks
- Sound effects via `Sounds.play()` system

## File Modification Guidelines

### Adding New Components
- Follow atomic design: atoms → organisms → pages
- Use Base Framework patterns: functional components or extend `Component`
- Import from `@base-framework/atoms` for HTML elements

### Extending Game Features
- New particle types: extend `Particle` class, register in `particles.js`
- New devices: extend base device pattern in `src/game/devices/`
- New levels: use `RandomLevelPack` pattern or create custom level pack

### CSS Organization
- Component styles in `css/components/` matching `src/components/` structure
- Use CSS custom properties for theme consistency
- Animation classes work with `animate.js` system

## Common Pitfalls
- Don't manipulate DOM directly - use Base Framework components
- Canvas rendering must go through `Cache` system for performance
- Route navigation requires AppController instance, not direct router calls
- Game state changes should update relevant singletons (Levels, Particles, etc.)