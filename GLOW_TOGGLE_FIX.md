# Glow Toggle Respect Fix

## Date: October 20, 2025

## Issue
Components using severity glow variables (especially buttons) continued to display glow effects on hover even when the global glow effect toggle was disabled (`data-glow="false"`).

## Root Cause
The glow toggle in `style.css` only disabled `--tui-glow`, but not the severity-specific glow variables:
- `--tui-glow-success`
- `--tui-glow-error`
- `--tui-glow-warning`
- `--tui-glow-info`

Additionally, button hover states used hard-coded `box-shadow` values instead of CSS variables, preventing them from respecting the glow toggle.

## Solution

### 1. Added Hover Glow Variables (`src/style.css`)

Created dedicated hover glow variables for all color types that automatically scale up the glow effect:

**Amber Theme:**
```css
/* Primary & Secondary */
--tui-glow-hover: 0 0 10px var(--tui-primary), 0 0 20px var(--tui-primary);
--tui-glow-secondary-hover: 0 0 10px var(--tui-secondary), 0 0 20px var(--tui-secondary);

/* Severity Levels */
--tui-glow-success-hover: 0 0 10px var(--tui-success), 0 0 20px var(--tui-success);
--tui-glow-error-hover: 0 0 10px var(--tui-error), 0 0 20px var(--tui-error);
--tui-glow-warning-hover: 0 0 10px var(--tui-warning), 0 0 20px var(--tui-warning);
--tui-glow-info-hover: 0 0 10px var(--tui-info), 0 0 20px var(--tui-info);
```

**Green Theme:** Same structure with theme-adapted colors.

### 2. Updated Glow Toggle (`src/style.css`)

Extended the glow toggle to disable ALL glow variables:

**Before:**
```css
:root[data-glow="false"] {
  --tui-glow: none;
}
```

**After:**
```css
:root[data-glow="false"] {
  --tui-glow: none;
  --tui-glow-hover: none;
  --tui-glow-secondary: none;
  --tui-glow-secondary-hover: none;
  --tui-glow-success: none;
  --tui-glow-success-hover: none;
  --tui-glow-error: none;
  --tui-glow-error-hover: none;
  --tui-glow-warning: none;
  --tui-glow-warning-hover: none;
  --tui-glow-info: none;
  --tui-glow-info-hover: none;
}
```

### 3. Updated Button Component (`src/components/TuiButton.vue`)

Replaced all hard-coded hover box-shadows with CSS variables:

**Before:**
```css
.tui-button:hover:not(.disabled) {
  box-shadow: 0 0 10px var(--tui-primary), 0 0 20px var(--tui-primary);
}

.tui-button.danger:hover:not(.disabled) {
  box-shadow: 0 0 10px var(--tui-error), 0 0 20px var(--tui-error);
}
```

**After:**
```css
.tui-button:hover:not(.disabled) {
  box-shadow: var(--tui-glow-hover);
}

.tui-button.danger:hover:not(.disabled) {
  box-shadow: var(--tui-glow-error-hover);
}
```

Applied to all button variants:
- Primary → `--tui-glow-hover`
- Secondary → `--tui-glow-secondary-hover`
- Danger → `--tui-glow-error-hover`
- Success → `--tui-glow-success-hover`
- Warning → `--tui-glow-warning-hover`
- Info → `--tui-glow-info-hover`

## Complete Glow Variable System

### Normal State Glows
```css
--tui-glow                /* Primary: 0 0 5px, 0 0 10px */
--tui-glow-secondary      /* Secondary: 0 0 5px, 0 0 10px */
--tui-glow-success        /* Success: 0 0 5px, 0 0 10px */
--tui-glow-error          /* Error: 0 0 5px, 0 0 10px */
--tui-glow-warning        /* Warning: 0 0 5px, 0 0 10px */
--tui-glow-info           /* Info: 0 0 5px, 0 0 10px */
```

### Hover State Glows (Enhanced)
```css
--tui-glow-hover                /* Primary: 0 0 10px, 0 0 20px */
--tui-glow-secondary-hover      /* Secondary: 0 0 10px, 0 0 20px */
--tui-glow-success-hover        /* Success: 0 0 10px, 0 0 20px */
--tui-glow-error-hover          /* Error: 0 0 10px, 0 0 20px */
--tui-glow-warning-hover        /* Warning: 0 0 10px, 0 0 20px */
--tui-glow-info-hover           /* Info: 0 0 10px, 0 0 20px */
```

### Toggle Behavior
All glow variables automatically become `none` when `data-glow="false"`.

## Benefits

### 1. Proper Glow Respect
All components now properly respect the global glow toggle setting.

**Glow Enabled:**
- Buttons have subtle glow at rest
- Buttons have enhanced glow on hover
- Text elements show severity glows

**Glow Disabled:**
- All glows turn off completely
- Clean, flat appearance
- No visual effects remain

### 2. Consistent Hover Enhancement
All button variants follow the same pattern:
- Normal state: 5px and 10px glow
- Hover state: 10px and 20px glow
- 2x intensity increase on hover

### 3. Maintainability
Single source of truth for hover glow intensity:
```css
/* Want stronger hover glow? Change once: */
--tui-glow-hover: 0 0 15px var(--tui-primary), 0 0 30px var(--tui-primary);
/* All buttons update automatically! */
```

### 4. Complete Variable Coverage
Every possible glow state is now controlled by CSS variables:
- ✅ Primary normal & hover
- ✅ Secondary normal & hover
- ✅ Success normal & hover
- ✅ Error normal & hover
- ✅ Warning normal & hover
- ✅ Info normal & hover
- ✅ All respect glow toggle

## Testing Checklist

- [x] Primary button respects glow toggle
- [x] Secondary button respects glow toggle
- [x] Danger button respects glow toggle
- [x] Success button respects glow toggle
- [x] Warning button respects glow toggle
- [x] Info button respects glow toggle
- [x] Hover states respect glow toggle
- [x] Normal states respect glow toggle
- [x] Toast notifications respect glow toggle
- [x] Theme switching maintains glow toggle state
- [x] No hard-coded glows remain in buttons

## Usage Examples

### Button with Glow Toggle Respect
```vue
<!-- Button automatically respects glow settings -->
<TuiButton label="Click Me" variant="danger" />

<!-- When data-glow="false", no glow appears -->
<!-- When data-glow="true", proper glows appear -->
```

### Custom Component with Hover Glow
```css
.my-card {
  border: 2px solid var(--tui-error);
  box-shadow: var(--tui-glow-error);
  transition: all 0.3s ease;
}

.my-card:hover {
  box-shadow: var(--tui-glow-error-hover);
}

/* Automatically respects glow toggle! */
```

### Programmatic Glow Toggle
```javascript
// Enable glow
document.documentElement.setAttribute('data-glow', 'true')

// Disable glow
document.documentElement.setAttribute('data-glow', 'false')
```

## Files Modified

1. **src/style.css**
   - Added 6 new hover glow variables (12 total including both themes)
   - Extended glow toggle to include all 12 glow variables
   - Added secondary glow and secondary-hover glow variables

2. **src/components/TuiButton.vue**
   - Replaced 6 hard-coded hover box-shadows with CSS variables
   - All button variants now use `--tui-glow-{variant}-hover`

## Breaking Changes

**None.** This is a bug fix that makes existing components work as intended.

## Migration Guide

If you have custom components using hard-coded hover glows:

**Before:**
```css
.my-button:hover {
  box-shadow: 0 0 10px var(--tui-error), 0 0 20px var(--tui-error);
}
```

**After:**
```css
.my-button:hover {
  box-shadow: var(--tui-glow-error-hover);
}
```

This ensures your components respect the global glow toggle.

## Pattern for Future Components

When creating new components with glows:

```css
/* Normal state */
.component {
  box-shadow: var(--tui-glow-{severity});
}

/* Hover/Active state */
.component:hover {
  box-shadow: var(--tui-glow-{severity}-hover);
}

/* Text glow */
.component-text {
  text-shadow: var(--tui-glow-{severity});
}
```

Replace `{severity}` with: `success`, `error`, `warning`, `info`, or omit for primary.

## Future Enhancements

Potential additions for even more control:

1. **Glow Intensity Levels:**
   ```css
   --tui-glow-{severity}-subtle: 0 0 3px color;
   --tui-glow-{severity}-normal: 0 0 5px, 0 0 10px;
   --tui-glow-{severity}-intense: 0 0 15px, 0 0 30px;
   ```

2. **Per-Severity Glow Toggle:**
   ```css
   :root[data-glow-error="false"] {
     --tui-glow-error: none;
     --tui-glow-error-hover: none;
   }
   ```

3. **Animated Glows:**
   ```css
   @keyframes glow-pulse {
     0%, 100% { box-shadow: var(--tui-glow-error); }
     50% { box-shadow: var(--tui-glow-error-hover); }
   }
   ```

## Summary

This fix ensures that ALL glow effects throughout the component library properly respect the global glow toggle setting. By:
1. Creating hover glow variables for all color types
2. Extending the glow toggle to cover all glow variables
3. Replacing hard-coded glows with CSS variables in components

The result is a consistent, maintainable, and user-configurable glow system that works exactly as users expect when they toggle the glow effect on or off.
