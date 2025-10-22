# Theme Switcher Usage Guide

## TuiThemeSwitcher Component

The `TuiThemeSwitcher` component provides a user interface for customizing the TUI display appearance.

## Features

### 1. Color Schemes
- **Amber Theme** (Default): Vintage terminal amber monitor aesthetic
- **Green Theme**: Classic Pip-Boy green phosphor display

### 2. Display Effects
- **Scanlines**: Toggle CRT horizontal scanline effect
- **CRT Flicker**: Toggle subtle screen flicker animation
- **Glow Effect**: Toggle text and border glow illumination

## Basic Usage

```vue
<template>
  <div>
    <TuiThemeSwitcher />
    <!-- Your other components -->
  </div>
</template>

<script setup>
import TuiThemeSwitcher from './components/TuiThemeSwitcher.vue'
</script>
```

## How It Works

### Theme Switching
Themes are applied by setting the `data-theme` attribute on the root `<html>` element:

```javascript
// Switch to green theme
document.documentElement.setAttribute('data-theme', 'green')

// Switch to amber theme (default)
document.documentElement.setAttribute('data-theme', 'amber')
// Or remove the attribute to use default:
document.documentElement.removeAttribute('data-theme')
```

### Effect Toggles
Display effects are controlled by `data-*` attributes:

```javascript
// Toggle scanlines (on <body> element)
document.body.setAttribute('data-scanlines', 'false') // Off
document.body.setAttribute('data-scanlines', 'true')  // On

// Toggle flicker (on <body> element)
document.body.setAttribute('data-flicker', 'false') // Off
document.body.setAttribute('data-flicker', 'true')  // On

// Toggle glow (on <html> element)
document.documentElement.setAttribute('data-glow', 'false') // Off
document.documentElement.setAttribute('data-glow', 'true')  // On
```

## Persistence

All user preferences are automatically saved to `localStorage`:

- `tui-theme`: Current color scheme ('green' or 'amber', default: 'amber')
- `tui-scanlines`: Scanlines enabled ('true' or 'false', default: 'true')
- `tui-flicker`: Flicker enabled ('true' or 'false', default: 'true')
- `tui-glow`: Glow effect enabled ('true' or 'false', default: 'true')

Preferences are automatically restored when the page loads.

## Programmatic Control

You can also control themes programmatically:

```vue
<script setup>
import { ref } from 'vue'

const setCustomTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('tui-theme', theme)
}

const disableEffects = () => {
  document.body.setAttribute('data-scanlines', 'false')
  document.body.setAttribute('data-flicker', 'false')
}

// Use in your logic
const switchToAmber = () => setCustomTheme('amber')
const switchToGreen = () => setCustomTheme('green')
</script>
```

## Custom Themes

To add your own custom theme colors, extend the CSS:

```css
/* In your style.css or component styles */
:root[data-theme="custom"] {
  --tui-primary: #00ffff;      /* Your primary color */
  --tui-secondary: #00cccc;     /* Your secondary color */
  --tui-border: #00ffff;
  --tui-text: #00ffff;
  --tui-shadow: rgba(0, 255, 255, 0.5);
  --tui-glow: 0 0 5px var(--tui-primary), 0 0 10px var(--tui-primary);
  --scanline-color: rgba(0, 255, 255, 0.05);
}
```

Then update the theme switcher to include your custom theme option.

## Accessibility

The theme switcher maintains full keyboard accessibility:
- All buttons and toggles are focusable
- Checkbox states are properly communicated
- Visual feedback for hover and active states

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- LocalStorage support required for persistence
- CSS custom properties (CSS variables) support required
