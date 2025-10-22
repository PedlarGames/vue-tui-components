# CSS Variables Reference

## Overview

This document provides a complete reference for all CSS custom properties (CSS variables) used throughout the TUI-Theme component library. These variables ensure consistent styling across all components and make theme customization simple.

## Theme Variables

### Primary Theme Colors

These variables define the main colors for the current theme and adapt based on the selected theme (Amber or Green).

```css
--tui-primary         /* Main theme color (Amber: #ffb000, Green: #00ff00) */
--tui-secondary       /* Secondary theme color (Amber: #ff8800, Green: #00cc00) */
--tui-text            /* Primary text color (matches primary) */
--tui-border          /* Border color (matches primary) */
```

### Background Colors

```css
--tui-bg              /* Main background (#0a0a0a) */
--tui-bg-light        /* Lighter background for headers/sections (#1a1a1a) */
```

### Effects & Shadows

```css
--tui-shadow          /* Drop shadow color with opacity */
--tui-glow            /* Text-shadow glow effect (theme-dependent) */
--tui-glow-none       /* Disabled glow (none) */
```

### Typography

```css
--tui-font            /* Font family stack ('VT323', 'Share Tech Mono', monospace) */
```

### Transparency Variations

Primary theme colors with transparency for subtle effects:

```css
--tui-primary-transparent-5    /* 5% opacity */
--tui-primary-transparent-10   /* 10% opacity */
--tui-primary-transparent-20   /* 20% opacity */
--tui-primary-transparent-30   /* 30% opacity */
```

## Severity Colors

These colors are used consistently across components for different message types and states. They remain mostly consistent across themes, except for success which uses the primary theme color.

### Success (Theme-Dependent)

```css
--tui-success                   /* Amber: #ffb000, Green: #00ff00 */
--tui-success-transparent-20    /* 20% opacity */
--tui-success-transparent-30    /* 30% opacity */
--tui-glow-success             /* 0 0 5px success, 0 0 10px success */
```

**Used in:**
- Toast notifications (success severity)
- Terminal output (success type lines)
- Success buttons (if implemented)
- Progress indicators (positive states)

### Error

```css
--tui-error                     /* #ff3333 (red) */
--tui-error-transparent-20      /* rgba(255, 51, 51, 0.2) */
--tui-error-transparent-30      /* rgba(255, 51, 51, 0.3) */
--tui-glow-error               /* 0 0 5px error, 0 0 10px error */
```

**Used in:**
- Toast notifications (error severity)
- Terminal output (error type lines)
- Danger buttons
- Button pulse animation (danger variant)
- Form validation errors

### Warning

```css
--tui-warning                   /* #ffff00 (yellow) */
--tui-warning-transparent-20    /* rgba(255, 255, 0, 0.2) */
--tui-warning-transparent-30    /* rgba(255, 255, 0, 0.3) */
--tui-glow-warning             /* 0 0 5px warning, 0 0 10px warning */
```

**Used in:**
- Toast notifications (warning severity)
- Terminal output (warning type lines)
- Warning indicators
- Caution messages

### Info

```css
--tui-info                      /* #00ccff (cyan) */
--tui-info-transparent-20       /* rgba(0, 204, 255, 0.2) */
--tui-info-transparent-30       /* rgba(0, 204, 255, 0.3) */
--tui-glow-info                /* 0 0 5px info, 0 0 10px info */
```

**Used in:**
- Toast notifications (info severity)
- Terminal output (info type lines)
- Informational messages
- Help text

## Layout & Effects

### Global Scale

```css
--tui-scale                     /* Default: 1.5 (150% zoom) */
```

This variable scales ALL sizes throughout the application. Modify at `:root` level to change the overall scale:

```css
:root {
  --tui-scale: 1.0;  /* 100% - Normal size */
  --tui-scale: 1.5;  /* 150% - Default */
  --tui-scale: 2.0;  /* 200% - Large size */
}
```

Font sizes, spacing, and other measurements use `calc()` with this variable:
```css
font-size: calc(16px * var(--tui-scale));
padding: calc(1rem * var(--tui-scale));
```

### CRT Effects

```css
--scanline-color                /* Scanline overlay color (theme-dependent) */
```

## Theme Variations

### Amber Theme (Default)

Applied to `:root`:

```css
:root {
  --tui-primary: #ffb000;
  --tui-secondary: #ff8800;
  --tui-success: #ffb000;
  --scanline-color: rgba(255, 176, 0, 0.05);
  /* ... other amber values */
}
```

### Green Theme

Applied to `:root[data-theme="green"]`:

```css
:root[data-theme="green"] {
  --tui-primary: #00ff00;
  --tui-secondary: #00cc00;
  --tui-success: #00ff00;
  --scanline-color: rgba(0, 255, 0, 0.05);
  /* ... other green values */
}
```

**Note:** Error, Warning, and Info colors remain the same across themes for consistency and accessibility.

## Component-Specific Usage

### Buttons

```css
/* Primary variant */
border-color: var(--tui-primary);
color: var(--tui-primary);

/* Secondary variant */
border-color: var(--tui-border);
color: var(--tui-text);

/* Danger variant */
border-color: var(--tui-error);
color: var(--tui-error);
```

### Toast Notifications

```css
/* Success toast */
.toast-success {
  border-color: var(--tui-success);
  color: var(--tui-success);
}

/* Error toast */
.toast-error {
  border-color: var(--tui-error);
  color: var(--tui-error);
}

/* Warning toast */
.toast-warning {
  border-color: var(--tui-warning);
  color: var(--tui-warning);
}

/* Info toast */
.toast-info {
  border-color: var(--tui-info);
  color: var(--tui-info);
}
```

### Terminal Lines

```css
.line-text.success {
  color: var(--tui-success);
}

.line-text.error {
  color: var(--tui-error);
}

.line-text.warning {
  color: var(--tui-warning);
}

.line-text.info {
  color: var(--tui-info);
}
```

## Custom Theme Creation

To create a custom theme, override the variables:

```css
/* Custom Blue Theme */
:root[data-theme="blue"] {
  --tui-primary: #0088ff;
  --tui-secondary: #0066cc;
  --tui-border: #0088ff;
  --tui-text: #0088ff;
  --tui-shadow: rgba(0, 136, 255, 0.5);
  --tui-glow: 0 0 5px #0088ff, 0 0 10px #0088ff;
  --scanline-color: rgba(0, 136, 255, 0.05);
  
  --tui-primary-transparent-5: rgba(0, 136, 255, 0.05);
  --tui-primary-transparent-10: rgba(0, 136, 255, 0.1);
  --tui-primary-transparent-20: rgba(0, 136, 255, 0.2);
  --tui-primary-transparent-30: rgba(0, 136, 255, 0.3);
  
  /* Success inherits primary in custom theme */
  --tui-success: #0088ff;
  --tui-success-transparent-20: rgba(0, 136, 255, 0.2);
  --tui-success-transparent-30: rgba(0, 136, 255, 0.3);
  
  /* Keep standard error/warning/info or customize */
  /* --tui-error: #ff3333; */
  /* --tui-warning: #ffff00; */
  /* --tui-info: #00ccff; */
}
```

Then apply via JavaScript:
```javascript
document.documentElement.setAttribute('data-theme', 'blue')
```

## Best Practices

### 1. Always Use CSS Variables

❌ **Don't** hard-code colors:
```css
.my-component {
  color: #ff3333;
  border-color: #ffb000;
}
```

✅ **Do** use CSS variables:
```css
.my-component {
  color: var(--tui-error);
  border-color: var(--tui-primary);
}
```

### 2. Choose Appropriate Severity Colors

- **Success**: Completed actions, confirmations, positive states
- **Error**: Failures, critical issues, destructive actions
- **Warning**: Cautions, non-critical issues, important notices
- **Info**: General information, tips, status updates

### 3. Use Severity Glow Variables

❌ **Don't** hard-code glow effects:
```css
.my-button {
  box-shadow: 0 0 5px #ff3333, 0 0 10px #ff3333;
  text-shadow: 0 0 5px #ffff00, 0 0 10px #ffff00;
}
```

✅ **Do** use glow variables:
```css
.my-button {
  box-shadow: var(--tui-glow-error);
  text-shadow: var(--tui-glow-warning);
}
```

**Available glow variables:**
- `--tui-glow-success` - Success/primary theme glow
- `--tui-glow-error` - Error/danger glow (red)
- `--tui-glow-warning` - Warning glow (yellow)
- `--tui-glow-info` - Info glow (cyan)

### 4. Use Transparency Variants for Subtle Effects

```css
/* Subtle background tint */
background: var(--tui-primary-transparent-10);

/* Custom glow effects with transparency */
box-shadow: 0 0 10px var(--tui-success-transparent-30);

/* Hover states */
background: var(--tui-error-transparent-20);
```

### 5. Maintain Consistency

When creating new components:
1. Use existing severity colors for similar states
2. Follow the same naming patterns for classes
3. Test in both Amber and Green themes
4. Ensure glow effects work when toggled

### 5. Scale-Aware Sizing

Always use `calc()` with `--tui-scale` for sizes:

```css
/* Font sizes */
font-size: calc(1rem * var(--tui-scale));

/* Spacing */
padding: calc(1rem * var(--tui-scale));
margin: calc(0.5rem * var(--tui-scale));

/* Borders (usually don't scale, but can if desired) */
border-width: 2px; /* Fixed */
/* OR */
border-width: calc(2px * var(--tui-scale)); /* Scaled */
```

## Variable Naming Convention

The project follows a consistent naming pattern:

```
--tui-{concept}[-{variant}][-{modifier}]
```

**Examples:**
- `--tui-primary` - Main theme color
- `--tui-bg-light` - Light background variant
- `--tui-success-transparent-20` - Success color at 20% opacity
- `--tui-primary-transparent-30` - Primary color at 30% opacity

**Concepts:**
- `primary`, `secondary` - Theme colors
- `success`, `error`, `warning`, `info` - Severity states
- `bg`, `text`, `border` - Element types
- `glow`, `shadow` - Effects

**Modifiers:**
- `transparent-{number}` - Opacity percentage (5, 10, 20, 30)
- `light`, `dark` - Color variations
- `none` - Disabled state

## Accessibility Considerations

### Color Contrast

All severity colors have been chosen for readability:
- Success: Uses bright theme color
- Error: Red (#ff3333) - high contrast on dark background
- Warning: Yellow (#ffff00) - maximum visibility
- Info: Cyan (#00ccff) - distinct from other states

### Test Your Colors

When creating custom themes:
1. Check contrast ratios (aim for WCAG AA minimum: 4.5:1)
2. Test with color blindness simulators
3. Ensure severity colors are distinguishable without relying only on color
4. Use icons and text labels in addition to color coding

## Performance Notes

CSS custom properties are:
- ✅ Efficiently inherited through the DOM
- ✅ Updated in real-time (no page reload needed)
- ✅ Scoped (can override at component level)
- ✅ Computed once and cached by browsers

Changing a theme variable updates all components instantly:
```javascript
// Fast and efficient
document.documentElement.style.setProperty('--tui-primary', '#ff0000')
```

## Browser Support

CSS Custom Properties are supported in:
- ✅ Chrome 49+
- ✅ Firefox 31+
- ✅ Safari 9.1+
- ✅ Edge 15+
- ✅ All modern mobile browsers

For older browsers, consider a fallback system or polyfill.

## Quick Reference Table

| Variable | Default (Amber) | Green Theme | Usage |
|----------|----------------|-------------|-------|
| `--tui-primary` | #ffb000 | #00ff00 | Primary theme color |
| `--tui-success` | #ffb000 | #00ff00 | Success states |
| `--tui-error` | #ff3333 | #ff3333 | Error states |
| `--tui-warning` | #ffff00 | #ffff00 | Warning states |
| `--tui-info` | #00ccff | #00ccff | Info states |
| `--tui-bg` | #0a0a0a | #0a0a0a | Background |
| `--tui-border` | #ffb000 | #00ff00 | Border color |
| `--tui-scale` | 1.5 | 1.5 | Global scale factor |

## Summary

The CSS variable system provides:
- **Consistency** - Same colors across all components
- **Maintainability** - Change once, update everywhere
- **Flexibility** - Easy theme switching and customization
- **Performance** - Efficient runtime updates
- **Scalability** - Simple to add new themes or components

By following this system, all components maintain visual consistency while remaining flexible and easy to customize.
