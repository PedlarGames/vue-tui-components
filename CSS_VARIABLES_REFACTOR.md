# CSS Variables Refactor - Summary

## Date: October 20, 2025

## Overview
Refactored hard-coded severity colors throughout the component library to use centralized CSS custom properties. This ensures consistency, maintainability, and makes it easier to customize colors globally.

## Changes Made

### 1. CSS Variables Added (`src/style.css`)

Added severity color variables to both themes:

**Amber Theme (Default):**
```css
--tui-success: #ffb000                           /* Uses primary theme color */
--tui-success-transparent-20: rgba(255, 176, 0, 0.2)
--tui-success-transparent-30: rgba(255, 176, 0, 0.3)

--tui-error: #ff3333
--tui-error-transparent-20: rgba(255, 51, 51, 0.2)
--tui-error-transparent-30: rgba(255, 51, 51, 0.3)

--tui-warning: #ffff00
--tui-warning-transparent-20: rgba(255, 255, 0, 0.2)
--tui-warning-transparent-30: rgba(255, 255, 0, 0.3)

--tui-info: #00ccff
--tui-info-transparent-20: rgba(0, 204, 255, 0.2)
--tui-info-transparent-30: rgba(0, 204, 255, 0.3)
```

**Green Theme:**
```css
--tui-success: #00ff00                          /* Uses primary theme color */
--tui-success-transparent-20: rgba(0, 255, 0, 0.2)
--tui-success-transparent-30: rgba(0, 255, 0, 0.3)

/* Error, Warning, Info remain consistent across themes */
```

### 2. Components Updated

#### TuiToast.vue
**Before:**
```css
.toast-error {
  border-color: #ff3333;
}
.toast-warning {
  border-color: #ffff00;
}
.toast-info {
  border-color: #00ccff;
}
```

**After:**
```css
.toast-error {
  border-color: var(--tui-error);
}
.toast-warning {
  border-color: var(--tui-warning);
}
.toast-info {
  border-color: var(--tui-info);
}
```

#### TuiButton.vue
**Before:**
```css
.tui-button.danger {
  border-color: #ff3333;
  color: #ff3333;
}
```

**After:**
```css
.tui-button.danger {
  border-color: var(--tui-error);
  color: var(--tui-error);
}
```

Also updated pulse animation for danger variant.

#### TuiTerminal.vue
**Before:**
```css
.line-text.error {
  color: #ff3333;
}
.line-text.warning {
  color: #ffff00;
}
.line-text.info {
  color: #00ccff;
}
```

**After:**
```css
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

#### TuiTerminalTypewriter.vue
Same changes as TuiTerminal.vue for consistency.

### 3. Documentation Created

#### CSS_VARIABLES.md
Comprehensive documentation including:
- Complete variable reference
- Theme variations
- Component-specific usage examples
- Custom theme creation guide
- Best practices
- Accessibility considerations
- Quick reference table

## Benefits

### 1. Consistency
All components now use the same color definitions for severity states:
- Success states always use `--tui-success`
- Error states always use `--tui-error`
- Warning states always use `--tui-warning`
- Info states always use `--tui-info`

### 2. Maintainability
Change colors in one place (`style.css`) and all components update automatically:
```css
:root {
  --tui-error: #ff0000;  /* Changes ALL error colors */
}
```

### 3. Theme Support
Success color automatically adapts to theme:
- Amber theme: Success is amber (#ffb000)
- Green theme: Success is green (#00ff00)
- Custom themes: Success inherits the primary color

### 4. Flexibility
Easy to create new themes without modifying component files:
```css
:root[data-theme="custom"] {
  --tui-success: #00ff00;
  --tui-error: #ff6666;
  --tui-warning: #ffaa00;
  --tui-info: #00aaff;
}
```

### 5. Transparency Support
Transparency variants enable consistent glow effects:
```css
box-shadow: 0 0 10px var(--tui-error-transparent-30);
background: var(--tui-success-transparent-20);
```

## Component Color Matrix

| Component | Success | Error | Warning | Info |
|-----------|---------|-------|---------|------|
| TuiToast | ✅ | ✅ | ✅ | ✅ |
| TuiButton | ⚪ | ✅ (danger) | ⚪ | ⚪ |
| TuiTerminal | ✅ | ✅ | ✅ | ✅ |
| TuiTerminalTypewriter | ✅ | ✅ | ✅ | ✅ |
| TuiProgressBar | ⚪ (uses primary) | ⚪ | ⚪ | ⚪ |

✅ = Uses severity color variable
⚪ = Could be extended to use severity colors in future

## Usage Examples

### In Components

```vue
<style scoped>
.my-component.success {
  color: var(--tui-success);
  border-color: var(--tui-success);
  box-shadow: 0 0 10px var(--tui-success-transparent-30);
}

.my-component.error {
  color: var(--tui-error);
  border-color: var(--tui-error);
}
</style>
```

### In JavaScript (Dynamic Styling)

```javascript
// Get current error color
const errorColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--tui-error')

// Set custom error color
document.documentElement.style.setProperty('--tui-error', '#cc0000')
```

## Testing

### Manual Testing Checklist
- [x] Toast notifications display correct colors in both themes
- [x] Terminal lines show correct severity colors
- [x] Danger buttons use error color variable
- [x] Button pulse animations work with variables
- [x] Success color changes with theme switch (amber → green)
- [x] Error/Warning/Info colors remain consistent across themes
- [x] Transparency variants create proper glow effects
- [x] No hard-coded colors remain in updated components

### Browser Testing
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## Future Enhancements

### Potential Additions
1. Add more severity variants:
   - `--tui-neutral` for neutral states
   - `--tui-danger` (alias for error)
   - `--tui-primary` (alias for success)

2. Extend to more components:
   - TuiProgressBar severity variants
   - TuiInput validation states
   - TuiCard severity borders

3. Add opacity variations:
   - `5%`, `10%` in addition to `20%`, `30%`
   - `50%` for stronger effects

4. Theme presets:
   - Matrix green
   - Retro orange
   - Cyberpunk purple
   - Hacker black/red

## Breaking Changes

**None.** This is a refactor that maintains all existing functionality while improving maintainability.

## Migration Guide

If you have custom components using hard-coded severity colors:

**Before:**
```css
.custom-element {
  color: #ff3333;
  border-color: #ffff00;
}
```

**After:**
```css
.custom-element {
  color: var(--tui-error);
  border-color: var(--tui-warning);
}
```

## Files Modified

1. `src/style.css` - Added severity color variables
2. `src/components/TuiToast.vue` - Replaced hard-coded colors
3. `src/components/TuiButton.vue` - Updated danger variant and pulse
4. `src/components/TuiTerminal.vue` - Updated line type colors
5. `src/components/TuiTerminalTypewriter.vue` - Updated line type colors

## Files Created

1. `CSS_VARIABLES.md` - Comprehensive CSS variables documentation

## Conclusion

This refactor establishes a solid foundation for consistent color usage across the entire component library. All severity colors are now centralized, making the codebase more maintainable and easier to theme.
