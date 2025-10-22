# Glow Variables Addition - Summary

## Date: October 20, 2025

## Overview
Added dedicated CSS custom properties for glow effects for each severity level, ensuring consistent text-shadow and box-shadow styling across all components.

## Changes Made

### 1. New CSS Variables Added (`src/style.css`)

Added glow variables for each severity level in both themes:

**Amber Theme:**
```css
--tui-glow-success: 0 0 5px var(--tui-success), 0 0 10px var(--tui-success);
--tui-glow-error: 0 0 5px var(--tui-error), 0 0 10px var(--tui-error);
--tui-glow-warning: 0 0 5px var(--tui-warning), 0 0 10px var(--tui-warning);
--tui-glow-info: 0 0 5px var(--tui-info), 0 0 10px var(--tui-info);
```

**Green Theme:**
```css
/* Same values - glow variables automatically adapt to theme colors */
--tui-glow-success: 0 0 5px var(--tui-success), 0 0 10px var(--tui-success);
--tui-glow-error: 0 0 5px var(--tui-error), 0 0 10px var(--tui-error);
--tui-glow-warning: 0 0 5px var(--tui-warning), 0 0 10px var(--tui-warning);
--tui-glow-info: 0 0 5px var(--tui-info), 0 0 10px var(--tui-info);
```

### 2. Components Updated

#### TuiButton.vue

**Before:**
```css
.tui-button.danger {
  box-shadow: 0 0 5px var(--tui-error), 0 0 10px var(--tui-error);
}

.tui-button.info {
  box-shadow: 0 0 5px var(--tui-info), 0 0 10px var(--tui-info);
}
```

**After:**
```css
.tui-button.danger {
  box-shadow: var(--tui-glow-error);
}

.tui-button.info {
  box-shadow: var(--tui-glow-info);
}
```

#### TuiToast.vue

**Before:**
```css
.toast-success .toast-icon,
.toast-success .toast-title {
  color: var(--tui-success);
}
```

**After:**
```css
.toast-success .toast-icon,
.toast-success .toast-title {
  color: var(--tui-success);
  text-shadow: var(--tui-glow-success);
}
```

Applied to all four severity variants (success, error, warning, info).

### 3. Documentation Updated

#### CSS_VARIABLES.md

Added glow variables to severity color documentation:

```css
--tui-success                   /* Amber: #ffb000, Green: #00ff00 */
--tui-success-transparent-20    /* 20% opacity */
--tui-success-transparent-30    /* 30% opacity */
--tui-glow-success             /* 0 0 5px success, 0 0 10px success */
```

Added new best practice section:

**3. Use Severity Glow Variables**
- Don't hard-code glow effects
- Use `--tui-glow-{severity}` variables
- Lists all available glow variables

## Benefits

### 1. Consistency
All glow effects now use standardized values:
```css
/* All severity glows follow the same pattern */
0 0 5px [color], 0 0 10px [color]
```

### 2. Maintainability
Change glow intensity in one place:
```css
:root {
  --tui-glow-error: 0 0 10px var(--tui-error), 0 0 20px var(--tui-error);
}
```
All error glows update automatically!

### 3. Theme Compatibility
Glow variables automatically adapt to theme changes:
- Success glow changes from amber to green with theme switch
- Other severity glows remain consistent across themes

### 4. Simplified Component Styling
**Before:**
```css
.my-element {
  box-shadow: 0 0 5px var(--tui-error), 0 0 10px var(--tui-error);
  text-shadow: 0 0 5px var(--tui-error), 0 0 10px var(--tui-error);
}
```

**After:**
```css
.my-element {
  box-shadow: var(--tui-glow-error);
  text-shadow: var(--tui-glow-error);
}
```

### 5. Flexibility
Easy to create custom glow intensities per component:
```css
/* Standard glow */
box-shadow: var(--tui-glow-warning);

/* Enhanced glow */
box-shadow: var(--tui-glow-warning), 0 0 20px var(--tui-warning-transparent-20);

/* Custom glow with variable base */
box-shadow: 0 0 15px var(--tui-info), 0 0 25px var(--tui-info);
```

## Complete CSS Variable Structure

### Severity Color System

Each severity level now has a complete set of variables:

```css
/* Success (Theme-Dependent) */
--tui-success
--tui-success-transparent-20
--tui-success-transparent-30
--tui-glow-success

/* Error (Red) */
--tui-error
--tui-error-transparent-20
--tui-error-transparent-30
--tui-glow-error

/* Warning (Yellow) */
--tui-warning
--tui-warning-transparent-20
--tui-warning-transparent-30
--tui-glow-warning

/* Info (Cyan) */
--tui-info
--tui-info-transparent-20
--tui-info-transparent-30
--tui-glow-info
```

## Usage Examples

### Button Variants

```css
/* Success button */
.button-success {
  border-color: var(--tui-success);
  color: var(--tui-success);
  box-shadow: var(--tui-glow-success);
}

/* Error/Danger button */
.button-danger {
  border-color: var(--tui-error);
  color: var(--tui-error);
  box-shadow: var(--tui-glow-error);
}

/* Warning button */
.button-warning {
  border-color: var(--tui-warning);
  color: var(--tui-warning);
  box-shadow: var(--tui-glow-warning);
}

/* Info button */
.button-info {
  border-color: var(--tui-info);
  color: var(--tui-info);
  box-shadow: var(--tui-glow-info);
}
```

### Text Effects

```css
/* Success text with glow */
.success-text {
  color: var(--tui-success);
  text-shadow: var(--tui-glow-success);
}

/* Error heading with glow */
.error-heading {
  color: var(--tui-error);
  text-shadow: var(--tui-glow-error);
}

/* Warning label with glow */
.warning-label {
  color: var(--tui-warning);
  text-shadow: var(--tui-glow-warning);
}

/* Info badge with glow */
.info-badge {
  color: var(--tui-info);
  text-shadow: var(--tui-glow-info);
}
```

### Card/Container Effects

```css
/* Success card */
.card-success {
  border: 2px solid var(--tui-success);
  box-shadow: var(--tui-glow-success);
}

/* Error alert */
.alert-error {
  border: 2px solid var(--tui-error);
  box-shadow: var(--tui-glow-error);
  background: var(--tui-error-transparent-10);
}

/* Warning banner */
.banner-warning {
  border-top: 2px solid var(--tui-warning);
  border-bottom: 2px solid var(--tui-warning);
  box-shadow: 0 0 20px var(--tui-warning-transparent-20);
}
```

### Animation with Glows

```css
/* Pulsing error effect */
@keyframes pulse-error {
  0%, 100% {
    box-shadow: var(--tui-glow-error);
  }
  50% {
    box-shadow: var(--tui-glow-error), 0 0 20px var(--tui-error-transparent-30);
  }
}

.pulsing-error {
  animation: pulse-error 2s infinite;
}
```

## Updated Components Summary

| Component | Glow Variables Used |
|-----------|-------------------|
| TuiButton.vue | ✅ error, info |
| TuiToast.vue | ✅ success, error, warning, info (text-shadow) |
| TuiTerminal.vue | ⚪ Could add in future |
| TuiTerminalTypewriter.vue | ⚪ Could add in future |
| TuiCard.vue | ⚪ Could add severity variants |

✅ = Currently using glow variables
⚪ = Potential future enhancement

## Testing

### Manual Testing Checklist
- [x] Toast icons and titles show proper glows
- [x] Button danger variant uses error glow
- [x] Button info variant uses info glow
- [x] Glows adapt to theme changes (amber → green)
- [x] All severity glows visible and consistent
- [x] No hard-coded glow values remain in updated components

### Theme Switch Test
- [x] Switch to Green theme - success glow changes to green
- [x] Switch to Amber theme - success glow changes to amber
- [x] Error/warning/info glows remain consistent across themes

## Future Enhancements

### Potential Additions
1. Add glow intensity variants:
   ```css
   --tui-glow-error-subtle: 0 0 3px var(--tui-error);
   --tui-glow-error-intense: 0 0 15px var(--tui-error), 0 0 30px var(--tui-error);
   ```

2. Add glow to more components:
   - Terminal line glows for severity types
   - Card border glows for severity variants
   - Progress bar glows for states

3. Glow toggle per severity:
   ```css
   :root[data-severity-glow="false"] {
     --tui-glow-error: none;
     --tui-glow-warning: none;
     --tui-glow-info: none;
   }
   ```

4. Animated glows:
   ```css
   --tui-glow-error-animated: var(--tui-glow-error);
   /* Could pulse or shift */
   ```

## Breaking Changes

**None.** This is purely additive - existing components continue to work, now with cleaner code.

## Migration Guide

If you have custom components using hard-coded glow effects:

**Before:**
```css
.custom-element {
  box-shadow: 0 0 5px #ff3333, 0 0 10px #ff3333;
  text-shadow: 0 0 5px #ffff00, 0 0 10px #ffff00;
}
```

**After:**
```css
.custom-element {
  box-shadow: var(--tui-glow-error);
  text-shadow: var(--tui-glow-warning);
}
```

## Files Modified

1. `src/style.css` - Added 4 new glow variables per theme
2. `src/components/TuiButton.vue` - Updated danger and info variants
3. `src/components/TuiToast.vue` - Added text-shadow glows to all severities

## Files Updated

1. `CSS_VARIABLES.md` - Added glow variable documentation and examples

## Conclusion

The addition of severity-specific glow variables completes the CSS custom properties system for consistent styling. All severity levels now have:
- Base color
- Transparency variants (20%, 30%)
- Dedicated glow effect

This makes it incredibly easy to maintain consistent visual effects across the entire component library while allowing for easy customization when needed.
