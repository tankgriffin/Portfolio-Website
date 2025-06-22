# Angular Background Transitions - Product Requirements Document

## Project Overview
Implement angular, manga-style background transitions for the existing Persona 5-themed React portfolio website. The transitions should mimic the sharp, dynamic visual effects seen in the provided GIF reference, creating smooth angular wipes between different page backgrounds.

## Current State Analysis
- **Existing React portfolio** with React Router navigation
- **Multiple page backgrounds**: `/persona-background.png`, `/about-background.png`, etc.
- **Persona 5 aesthetic** with red/black/white color scheme
- **Current navigation**: Header nav, sidebar menu, and command menu
- **Existing components**: Header.js, Sidebar.js, CommandMenu.js

## Technical Requirements

### 1. Core Background Transition System
- **Create `BackgroundTransitionManager` React component**
  - Manage multiple background layers simultaneously
  - Handle transition states and timing
  - Provide API for triggering transitions from any navigation component

### 2. Angular Transition Effects
- **Simple Angular Wipe** (default)
  - Single diagonal/polygonal clip-path animation
  - Duration: 1.2 seconds
  - Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

- **Complex Shard Transition** (for key pages like PERSONA, SKILL)
  - Multiple angular overlays with staggered timing
  - Red angular shards that appear and dissolve
  - Total duration: 1.2 seconds with 0.1s delays between shards

### 3. Integration Points
- **React Router integration**
  - Trigger transitions on route changes
  - Prevent navigation during active transitions
  - Sync with existing navigation components

- **Existing Navigation Enhancement**
  - Update Header.js nav links to trigger transitions
  - Update Sidebar.js menu items to trigger transitions  
  - Update CommandMenu.js icons to trigger transitions
  - Maintain existing functionality while adding transition layer

### 4. Background Management
- **Multi-layer background system**
  - Each page gets dedicated background layer
  - Only active background visible at any time
  - Smooth opacity transitions between layers
  - Maintain existing background images without modification

## Implementation Specification

### File Structure
```
src/
├── components/
│   ├── BackgroundTransitionManager.js (NEW)
│   ├── BackgroundTransitionManager.css (NEW)
│   ├── Header.js (MODIFY - add transition triggers)
│   ├── Sidebar.js (MODIFY - add transition triggers)
│   └── CommandMenu.js (MODIFY - add transition triggers)
├── context/
│   └── TransitionContext.js (NEW)
├── hooks/
│   └── usePageTransition.js (NEW)
└── App.js (MODIFY - wrap with transition system)
```

### Key Components

#### 1. BackgroundTransitionManager Component
```jsx
// Required props and state management
- currentPage: string
- isTransitioning: boolean
- transitionType: 'simple' | 'complex'
- backgroundMappings: object

// Required methods
- transitionTo(targetPage, transitionType)
- switchBackground(targetPage)
- handleTransitionComplete()
```

#### 2. TransitionContext
```jsx
// Context to provide throughout app
- currentPage
- isTransitioning
- triggerTransition(page, type)
- transition state management
```

#### 3. usePageTransition Hook
```jsx
// Custom hook for navigation components
- provides triggerTransition function
- handles transition state
- prevents navigation during transitions
```

### CSS Requirements

#### Angular Transition Keyframes
```css
@keyframes angularWipe {
  0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
  25% { clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%); }
  50% { clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%); }
  75% { clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%); }
  100% { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
}
```

#### Multi-shard Complex Transitions
```css
.angular-shard-[1-4] {
  /* Different clip-path polygons for each shard */
  /* Staggered animation delays */
  /* Red color scheme matching existing theme */
}
```

## Page-Specific Configurations

### Background Mappings
```javascript
const backgroundMappings = {
  '/': { image: '/persona-background.png', transition: 'complex' },
  '/about': { image: '/about-background.png', transition: 'complex' },
  '/resume': { image: '/resume-background.png', transition: 'simple' },
  '/portfolio': { image: '/portfolio-background.png', transition: 'complex' },
  '/contact': { image: '/contact-background.png', transition: 'simple' }
}
```

### Transition Type Rules
- **Complex transitions**: Main menu, About (PERSONA), Portfolio (SKILL)
- **Simple transitions**: Resume (EQUIP), Contact (MISSION)
- **Default**: Simple transition if not specified

## Navigation Integration Requirements

### Header Navigation (Header.js)
- Replace direct React Router navigation with transition-aware navigation
- Add transition triggers to existing `.persona-nav a` elements
- Maintain existing hover effects and styling
- Prevent clicks during active transitions

### Sidebar Navigation (Sidebar.js)
- Update Link components to use transition system
- Add transition triggers to sidebar menu items
- Ensure sidebar closes after transition completes
- Maintain existing slide-in/out animations

### Command Menu (CommandMenu.js)
- Update onClick handlers for command icons
- Add transition triggers for SKILL, EQUIP, PERSONA, MISSION
- Maintain existing icon hover effects and positioning
- Ensure command menu interactions work with transition system

## Performance Requirements
- **Transition duration**: Maximum 1.2 seconds
- **No layout shifts**: Backgrounds should not affect page layout
- **Smooth 60fps**: Transitions should not drop below 60fps
- **Memory efficient**: Only load visible backgrounds
- **Mobile responsive**: Transitions work on all screen sizes

## Browser Support
- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **CSS features required**: CSS clip-path, CSS custom properties, CSS animations
- **Fallback behavior**: Instant background change if clip-path not supported

## Testing Requirements

### Functional Testing
- All navigation methods trigger appropriate transitions
- Transitions complete successfully on all routes
- No navigation possible during active transitions
- Background switches occur at correct timing
- Existing functionality remains intact

### Performance Testing
- Transition animations maintain 60fps
- Memory usage stays within reasonable bounds
- Mobile device performance acceptable
- Large background images load efficiently

### User Experience Testing
- Transitions feel responsive and snappy
- Visual feedback clear during transitions
- No jarring or broken animation states
- Consistent timing across all transition types

## Success Criteria
1. **Visual fidelity**: Transitions closely match the reference GIF aesthetic
2. **Performance**: Smooth 60fps animations on target devices
3. **Integration**: Seamless integration with existing navigation
4. **Maintainability**: Clean, modular code that's easy to extend
5. **User experience**: Enhanced navigation feel without breaking existing workflows

## Implementation Notes
- Prioritize existing functionality - transitions should enhance, not replace
- Maintain Persona 5 aesthetic consistency throughout
- Use existing color scheme (red/black/white) for all transition elements
- Ensure accessibility - provide reduced motion options if needed
- Keep background images unchanged - work with existing assets

## Future Enhancements (Out of Scope)
- Sound effects during transitions
- More complex 3D transition effects
- Dynamic background generation
- Particle effects during transitions
- Custom transition timing per page