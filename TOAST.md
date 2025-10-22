# TuiToast Component Documentation

## Overview

The `TuiToast` component provides toast notification functionality with a terminal/TUI aesthetic matching the Fallout Pip-Boy theme. It supports multiple severity levels, customizable positioning, auto-dismiss timers, and various display options.

## Features

- ✅ **Four Severity Levels**: Success, Error, Warning, Info
- ✅ **Six Position Options**: Top/Bottom × Left/Center/Right
- ✅ **Auto-Dismiss Timer**: Configurable duration with progress bar
- ✅ **Manual Dismiss**: Optional close button
- ✅ **Hover Pause**: Timer pauses when hovering over toast
- ✅ **Smooth Animations**: Slide-in/out transitions with position-aware animations
- ✅ **Progress Indicator**: Visual countdown bar
- ✅ **Glow Effects**: Optional border/shadow glow matching theme
- ✅ **Theme Integration**: Uses CSS custom properties for consistent styling
- ✅ **Responsive**: Adapts to mobile screens

## Basic Usage

### Using the Toast Component Directly

```vue
<template>
  <TuiToast
    message="Operation completed successfully!"
    severity="success"
    position="top-right"
    :duration="5000"
    @close="handleClose"
  />
</template>

<script setup>
import TuiToast from './components/TuiToast.vue'

const handleClose = () => {
  console.log('Toast closed')
}
</script>
```

### Using the Toast Composable (Recommended)

The `useToast` composable provides a programmatic API for managing toast notifications:

```vue
<script setup>
import { useToast } from './composables/useToast.js'

const toast = useToast()

// Show different severity toasts
const showSuccess = () => {
  toast.success('Operation completed successfully!')
}

const showError = () => {
  toast.error('An error occurred while processing your request.')
}

const showWarning = () => {
  toast.warning('Warning: System resources are running low.')
}

const showInfo = () => {
  toast.info('New software update available.')
}

// Advanced usage with options
const showCustomToast = () => {
  toast.show({
    message: 'Custom notification message',
    title: 'CUSTOM TITLE',
    severity: 'success',
    position: 'bottom-center',
    duration: 7000,
    dismissable: true,
    showProgress: true,
    glow: true
  })
}

// Clear all toasts
const clearAll = () => {
  toast.clear()
}

// Clear toasts in specific position
const clearTopRight = () => {
  toast.clear('top-right')
}
</script>
```

## Props

### TuiToast Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `String` | **Required** | The main message to display in the toast |
| `title` | `String` | `''` | Optional custom title (defaults to severity-based title) |
| `severity` | `String` | `'info'` | Toast severity: `'success'`, `'error'`, `'warning'`, `'info'` |
| `position` | `String` | `'top-right'` | Position on screen: `'top-left'`, `'top-center'`, `'top-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'` |
| `duration` | `Number` | `5000` | Auto-dismiss duration in milliseconds (0 = no auto-dismiss) |
| `dismissable` | `Boolean` | `true` | Show close button for manual dismissal |
| `showProgress` | `Boolean` | `true` | Display progress bar countdown |
| `glow` | `Boolean` | `true` | Enable border/shadow glow effect |
| `sound` | `Boolean` | `false` | Play sound on appear (not implemented yet) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | None | Emitted when toast starts closing (before transition) |
| `closed` | None | Emitted after toast has fully closed (after transition) |

## Composable API

### useToast()

Returns an object with the following methods:

#### `show(options)`

Display a toast with custom options.

```javascript
const id = toast.show({
  message: 'Your message here',
  title: 'Custom Title',
  severity: 'info',
  position: 'top-right',
  duration: 5000,
  dismissable: true,
  showProgress: true,
  glow: true
})
```

**Returns**: `Number` - Toast ID for later reference

#### `success(message, options)`

Shorthand for showing a success toast.

```javascript
toast.success('Operation completed!', {
  position: 'top-center',
  duration: 3000
})
```

#### `error(message, options)`

Shorthand for showing an error toast.

```javascript
toast.error('Failed to save data!', {
  duration: 0, // Won't auto-close
  position: 'top-right'
})
```

#### `warning(message, options)`

Shorthand for showing a warning toast.

```javascript
toast.warning('Low disk space detected.')
```

#### `info(message, options)`

Shorthand for showing an info toast.

```javascript
toast.info('New features available!')
```

#### `remove(id)`

Remove a specific toast by ID.

```javascript
const id = toast.success('Message')
setTimeout(() => {
  toast.remove(id)
}, 2000)
```

#### `clear(position)`

Clear toasts. If position is provided, only clears toasts in that position. Otherwise clears all toasts.

```javascript
// Clear all toasts
toast.clear()

// Clear only top-right toasts
toast.clear('top-right')
```

## Severity Variants

### Success
- **Color**: Primary theme color (amber/green)
- **Icon**: ✓ (checkmark)
- **Default Title**: "SUCCESS"
- **Use Cases**: Successful operations, confirmations, completed actions

### Error
- **Color**: Red (#ff3333)
- **Icon**: ✗ (cross)
- **Default Title**: "ERROR"
- **Use Cases**: Failed operations, critical errors, validation failures

### Warning
- **Color**: Yellow (#ffff00)
- **Icon**: ! (exclamation)
- **Default Title**: "WARNING"
- **Use Cases**: Cautionary messages, non-critical issues, alerts

### Info
- **Color**: Cyan (#00ccff)
- **Icon**: i (information)
- **Default Title**: "INFORMATION"
- **Use Cases**: General notifications, tips, status updates

## Position Options

Toasts can appear in six positions:

```
┌─────────────────────────────────┐
│ top-left   top-center  top-right│
│                                  │
│                                  │
│                                  │
│bottom-left bottom-center bottom-│
│                          right   │
└─────────────────────────────────┘
```

- **Top positions**: Slide down on enter, slide up on exit
- **Bottom positions**: Slide up on enter, slide down on exit
- **Center positions**: Horizontally centered, stacked vertically

Multiple toasts in the same position will stack with spacing.

## Styling Details

### Theme Integration

The toast component uses CSS custom properties for full theme integration:

```css
--tui-primary       /* Success color, icons */
--tui-border        /* Border color */
--tui-bg            /* Header background */
--tui-bg-light      /* Toast body background */
--tui-text          /* Text color */
--tui-font          /* Font family */
--tui-glow          /* Text shadow effect */
```

### Custom Styling

You can override toast styles globally:

```css
/* Adjust toast width */
.tui-toast {
  min-width: 350px;
  max-width: 600px;
}

/* Customize specific severity */
.toast-success {
  border-width: 3px;
}

/* Adjust animations */
.toast-slide-down-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Advanced Examples

### Form Validation Feedback

```vue
<script setup>
import { useToast } from './composables/useToast.js'

const toast = useToast()

const validateForm = (formData) => {
  if (!formData.email) {
    toast.error('Email address is required!', {
      title: 'VALIDATION ERROR',
      position: 'top-center'
    })
    return false
  }
  
  if (!formData.password || formData.password.length < 8) {
    toast.warning('Password must be at least 8 characters.', {
      title: 'WEAK PASSWORD'
    })
    return false
  }
  
  toast.success('Account created successfully!', {
    title: 'WELCOME',
    duration: 4000
  })
  return true
}
</script>
```

### Loading States with Persistent Toast

```vue
<script setup>
import { ref } from 'vue'
import { useToast } from './composables/useToast.js'

const toast = useToast()
const loadingToastId = ref(null)

const startLoading = () => {
  loadingToastId.value = toast.info('Processing request...', {
    title: 'LOADING',
    duration: 0, // Won't auto-close
    dismissable: false, // Can't be manually closed
    showProgress: false
  })
}

const stopLoading = (success = true) => {
  if (loadingToastId.value) {
    toast.remove(loadingToastId.value)
  }
  
  if (success) {
    toast.success('Request completed successfully!')
  } else {
    toast.error('Request failed. Please try again.')
  }
}

const performAction = async () => {
  startLoading()
  try {
    await someAsyncOperation()
    stopLoading(true)
  } catch (error) {
    stopLoading(false)
  }
}
</script>
```

### Multi-Position Notifications

```vue
<script setup>
import { useToast } from './composables/useToast.js'

const toast = useToast()

// Show system notifications in top-right
const systemNotification = () => {
  toast.info('System update available', {
    position: 'top-right'
  })
}

// Show user actions in bottom-center
const userFeedback = () => {
  toast.success('Settings saved', {
    position: 'bottom-center',
    duration: 2000
  })
}

// Show errors prominently in top-center
const criticalError = () => {
  toast.error('Connection lost. Reconnecting...', {
    position: 'top-center',
    duration: 0
  })
}
</script>
```

### Progress Tracking

```vue
<script setup>
import { useToast } from './composables/useToast.js'

const toast = useToast()

const uploadFile = async (file) => {
  const id = toast.info(`Uploading ${file.name}...`, {
    title: 'UPLOAD IN PROGRESS',
    duration: 10000, // Long duration
    showProgress: true,
    dismissable: false
  })
  
  try {
    await uploadToServer(file)
    toast.remove(id)
    toast.success(`${file.name} uploaded successfully!`)
  } catch (error) {
    toast.remove(id)
    toast.error(`Failed to upload ${file.name}`, {
      duration: 0 // Stays until dismissed
    })
  }
}
</script>
```

## Best Practices

### 1. Choose Appropriate Severity
- Use **success** for confirmations of completed actions
- Use **error** for failures that require user attention
- Use **warning** for important but non-critical information
- Use **info** for general notifications and tips

### 2. Keep Messages Concise
- Short, action-oriented messages work best
- Use title for context, message for details
- Avoid long paragraphs in toasts

### 3. Set Appropriate Durations
- Success: 3-5 seconds
- Info: 5-7 seconds
- Warning: 7-10 seconds
- Error: 0 (manual dismiss) or 10+ seconds

### 4. Use Consistent Positions
- System notifications: top-right
- User feedback: bottom-center
- Errors: top-center
- Be consistent within your app

### 5. Avoid Toast Overload
- Don't show too many toasts at once
- Use `toast.clear()` before showing new toasts if needed
- Consider consolidating related notifications

### 6. Accessibility
- Ensure messages are clear without relying only on color
- Use descriptive titles
- Provide manual dismiss option for important messages

## Browser Compatibility

The toast component uses modern web APIs and CSS features:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari 14+, Chrome Android)

Features used:
- CSS Grid & Flexbox
- CSS Custom Properties
- Vue 3 Composition API
- ES6+ JavaScript
- CSS Transitions & Transforms

## Performance Considerations

- Toasts use Vue's `<Transition>` for efficient animations
- Progress bars update every 50ms (20 FPS)
- DOM elements are cleaned up after toast dismissal
- Multiple toasts are rendered independently for better performance

## Future Enhancements

Planned features for future versions:

- [ ] Sound effects on appearance
- [ ] Action buttons within toasts
- [ ] Queue management for toast order
- [ ] Slide direction customization
- [ ] Toast grouping/stacking options
- [ ] Rich content support (HTML, components)
- [ ] Drag-to-dismiss gesture
- [ ] Accessibility improvements (ARIA labels, focus management)

## Troubleshooting

### Toasts Not Appearing

1. Ensure you're importing the composable correctly
2. Check z-index conflicts with other elements
3. Verify CSS custom properties are defined in your theme

### Toasts Not Auto-Closing

1. Check if `duration` is set to 0
2. Verify timer isn't being paused by hover
3. Ensure component isn't being unmounted prematurely

### Styling Issues

1. Confirm theme CSS variables are loaded
2. Check for CSS conflicts with global styles
3. Verify component has proper isolation (scoped styles)

### Multiple Toasts Overlapping

1. Ensure containers are being created properly
2. Check CSS position and z-index values
3. Verify margin/spacing between toasts

## License

This component is part of the TUI-Theme project and follows the same license.
