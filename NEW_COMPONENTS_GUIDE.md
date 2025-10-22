# New Components Documentation

This document provides detailed information about the newly created components in the TUI library.

## Table of Contents

1. [TuiTooltip](#tuitooltip)
2. [TuiDialog](#tuidialog)
3. [TuiChip](#tuichip)
4. [TuiOTP](#tuiotp)
5. [TuiSlider](#tuislider)
6. [TuiCarousel](#tuicarousel)
7. [TuiBadge](#tuibadge)
8. [TuiBanner](#tuibanner)
9. [TuiAvatar](#tuiavatar)
10. [TuiIcon](#tuiicon)
11. [TuiTimeline](#tuitimeline)
12. [TuiImage](#tuiimage)
13. [TuiDatepicker](#tuidatepicker)

---

## TuiTooltip

A small pop-up box that provides additional information when a user hovers over or focuses on an element.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | String | required | The tooltip content |
| `position` | String | `'top'` | Position of tooltip: `'top'`, `'bottom'`, `'left'`, `'right'` |
| `rich` | Boolean | `false` | Enable HTML content in tooltip |
| `delay` | Number | `200` | Delay before showing tooltip (ms) |

### Usage

```vue
<TuiTooltip text="This is a helpful tooltip" position="top">
  <TuiButton label="Hover me" />
</TuiTooltip>

<!-- Rich HTML content -->
<TuiTooltip text="<strong>Bold</strong> and <em>italic</em> text" :rich="true">
  <TuiButton label="Rich tooltip" />
</TuiTooltip>
```

---

## TuiDialog

A modal window that captures user attention for critical tasks or information.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | Boolean | `false` | Controls dialog visibility (v-model) |
| `title` | String | `''` | Dialog title |
| `closable` | Boolean | `true` | Show close button |
| `closeOnOverlay` | Boolean | `true` | Close when clicking overlay |
| `overlayOpacity` | Number | `0.8` | Overlay opacity (0-1) |
| `showActions` | Boolean | `true` | Show default action buttons |
| `showConfirm` | Boolean | `true` | Show confirm button |
| `showCancel` | Boolean | `true` | Show cancel button |
| `confirmText` | String | `'Confirm'` | Confirm button text |
| `cancelText` | String | `'Cancel'` | Cancel button text |
| `confirmVariant` | String | `'primary'` | Confirm button variant |

### Events

- `update:modelValue` - Emitted when dialog is opened/closed
- `confirm` - Emitted when confirm button is clicked
- `cancel` - Emitted when cancel button is clicked
- `close` - Emitted when dialog is closed

### Usage

```vue
<TuiDialog 
  v-model="showDialog" 
  title="Confirmation"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <p>Are you sure you want to proceed?</p>
</TuiDialog>

<!-- Custom footer -->
<TuiDialog v-model="showDialog" title="Custom">
  <p>Dialog content</p>
  <template #footer>
    <TuiButton label="Custom Action" />
  </template>
</TuiDialog>
```

---

## TuiChip

A compact element representing an input, attribute, or action.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | String | required | Chip text |
| `variant` | String | `'primary'` | Color variant |
| `size` | String | `'medium'` | Size: `'small'`, `'medium'`, `'large'` |
| `closable` | Boolean | `false` | Show close button |
| `icon` | String | `''` | Icon/emoji to display |
| `avatar` | Boolean | `false` | Enable avatar mode |
| `avatarSrc` | String | `''` | Avatar image URL |
| `avatarText` | String | `''` | Avatar text/initials |

### Events

- `close` - Emitted when close button is clicked

### Usage

```vue
<TuiChip label="Tag" />
<TuiChip label="Remove me" closable @close="handleClose" />
<TuiChip label="User" icon="👤" variant="info" />
<TuiChip label="Admin" size="small" variant="error" />
```

---

## TuiOTP

A component for entering one-time passwords with auto-focus and navigation.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | String | `''` | OTP value (v-model) |
| `length` | Number | `6` | Number of input fields (1-10) |
| `masked` | Boolean | `false` | Hide input characters |
| `disabled` | Boolean | `false` | Disable input |
| `error` | String | `''` | Error message to display |
| `autoFocus` | Boolean | `true` | Auto-focus first input |

### Events

- `update:modelValue` - Emitted when value changes
- `complete` - Emitted when all fields are filled

### Usage

```vue
<TuiOTP v-model="otpCode" :length="6" @complete="verifyOTP" />
<TuiOTP v-model="pin" :length="4" :error="errorMsg" />
```

---

## TuiSlider

A control for selecting a value or range within a defined range.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | Number | `50` | Current value (v-model) |
| `min` | Number | `0` | Minimum value |
| `max` | Number | `100` | Maximum value |
| `step` | Number | `1` | Step increment |
| `orientation` | String | `'horizontal'` | `'horizontal'` or `'vertical'` |
| `label` | String | `''` | Slider label |
| `showValue` | Boolean | `true` | Show min/max/current values |
| `showTooltip` | Boolean | `true` | Show value tooltip when dragging |
| `prefix` | String | `''` | Value prefix |
| `suffix` | String | `''` | Value suffix |

### Events

- `update:modelValue` - Emitted when value changes
- `change` - Emitted when dragging ends

### Usage

```vue
<TuiSlider v-model="volume" label="Volume" :min="0" :max="100" suffix="%" />
<TuiSlider v-model="temp" label="Temperature" :min="-10" :max="40" suffix="°C" />
<TuiSlider v-model="value" orientation="vertical" />
```

---

## TuiCarousel

A rotating slider for showcasing images or content.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | Array | required | Array of carousel items |
| `autoplay` | Boolean | `false` | Enable auto-play |
| `interval` | Number | `3000` | Auto-play interval (ms) |
| `loop` | Boolean | `true` | Loop back to start |
| `showControls` | Boolean | `true` | Show prev/next buttons |
| `showIndicators` | Boolean | `true` | Show dot indicators |
| `transition` | String | `'slide'` | Transition type: `'slide'` or `'fade'` |

### Events

- `change` - Emitted when slide changes

### Usage

```vue
<TuiCarousel 
  :items="carouselItems" 
  :autoplay="true" 
  :interval="4000"
/>

<script setup>
const carouselItems = [
  { image: '/img1.jpg', caption: 'Slide 1' },
  { image: '/img2.jpg', caption: 'Slide 2' },
]
</script>
```

---

## TuiBadge

A small indicator for notifications or status.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | String/Number | `''` | Badge content |
| `variant` | String | `'primary'` | Color variant |
| `size` | String | `'medium'` | Size: `'small'`, `'medium'`, `'large'` |
| `placement` | String | `'top-right'` | Position on parent element |
| `max` | Number | `99` | Max number to display (shows `99+`) |
| `dot` | Boolean | `false` | Show as a dot indicator |
| `icon` | String | `''` | Icon/emoji to display |
| `visible` | Boolean | `true` | Badge visibility |

### Usage

```vue
<!-- Number badge -->
<TuiBadge content="5" variant="error">
  <TuiButton label="Messages" />
</TuiBadge>

<!-- Dot indicator -->
<TuiBadge dot variant="success">
  <TuiAvatar initials="JD" />
</TuiBadge>

<!-- Standalone -->
<TuiBadge content="NEW" variant="warning" />
```

---

## TuiBanner

A prominent message bar for displaying important information.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | String | required | Banner message |
| `title` | String | `''` | Banner title |
| `variant` | String | `'info'` | Color variant |
| `icon` | String | `''` | Icon/emoji to display |
| `dismissible` | Boolean | `true` | Show dismiss button |
| `linkText` | String | `''` | Action link text |
| `linkUrl` | String | `''` | Action link URL |
| `modelValue` | Boolean | `true` | Banner visibility (v-model) |

### Events

- `update:modelValue` - Emitted when visibility changes
- `dismiss` - Emitted when dismissed
- `link-click` - Emitted when link is clicked

### Usage

```vue
<TuiBanner 
  v-model="showBanner"
  message="System update available"
  variant="info"
  icon="ℹ"
  link-text="Learn More"
  link-url="#"
/>
```

---

## TuiAvatar

A visual representation of a user or entity.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | String | `''` | Image URL |
| `alt` | String | `'Avatar'` | Image alt text |
| `initials` | String | `''` | Text initials (max 2 chars) |
| `icon` | String | `''` | Icon/emoji to display |
| `size` | String | `'medium'` | Size: `'small'`, `'medium'`, `'large'`, `'xlarge'` |
| `shape` | String | `'circle'` | Shape: `'circle'` or `'square'` |
| `status` | String | `''` | Status indicator: `'online'`, `'offline'`, `'away'`, `'busy'` |

### Usage

```vue
<TuiAvatar initials="JD" />
<TuiAvatar src="/user.jpg" alt="John Doe" status="online" />
<TuiAvatar icon="👤" size="large" shape="square" />
<TuiAvatar initials="AB" status="busy" />
```

---

## TuiIcon

A graphical representation of an action or concept. Supports both unicode/emoji icons and Google Material Icons.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | String | required | Icon character/emoji or Material icon name |
| `type` | String | `'unicode'` | Icon type: `'unicode'` or `'material'` |
| `materialVariant` | String | `'outlined'` | Material icon style: `'filled'`, `'outlined'`, `'round'`, `'sharp'` |
| `size` | String | `'medium'` | Size: `'small'`, `'medium'`, `'large'`, `'xlarge'` |
| `variant` | String | `'primary'` | Color variant or `'inherit'` |
| `spin` | Boolean | `false` | Enable spin animation |
| `pulse` | Boolean | `false` | Enable pulse animation |
| `ariaLabel` | String | `''` | Accessibility label |
| `customSize` | String | `''` | Custom font size (e.g., `'3rem'`) |

### Icon Types

**Unicode Icons**: Use any unicode character or emoji
- Simple and lightweight
- Works without external dependencies
- Examples: `★`, `♥`, `⚙`, `◐`, `👤`, `🔔`

**Material Icons**: Use Google's Material Icons library
- Over 2,500+ professional icons
- Four style variants for different aesthetics
- Browse icons at: https://fonts.google.com/icons
- Examples: `home`, `favorite`, `settings`, `search`, `check_circle`, `delete`

### Material Icon Variants

- **filled**: Solid, bold appearance (default Material style)
- **outlined**: Stroke-based, clean look (recommended for TUI theme)
- **round**: Rounded edges, friendly appearance
- **sharp**: Angular edges, modern look

### Usage

**Unicode Icons:**
```vue
<TuiIcon icon="★" size="large" />
<TuiIcon icon="◐" spin variant="info" aria-label="Loading" />
<TuiIcon icon="♥" pulse variant="error" />
<TuiIcon icon="⚙" custom-size="5rem" />
```

**Material Icons:**
```vue
<!-- Basic usage (outlined variant by default) -->
<TuiIcon icon="home" type="material" />
<TuiIcon icon="settings" type="material" size="large" variant="primary" />

<!-- Different variants -->
<TuiIcon icon="favorite" type="material" materialVariant="filled" variant="error" />
<TuiIcon icon="search" type="material" materialVariant="outlined" size="xlarge" />
<TuiIcon icon="home" type="material" materialVariant="round" />
<TuiIcon icon="delete" type="material" materialVariant="sharp" />

<!-- With animations -->
<TuiIcon icon="refresh" type="material" spin variant="primary" />
<TuiIcon icon="favorite" type="material" pulse variant="error" />

<!-- Common examples -->
<TuiIcon icon="check_circle" type="material" variant="success" />
<TuiIcon icon="error" type="material" variant="error" />
<TuiIcon icon="warning" type="material" variant="warning" />
<TuiIcon icon="info" type="material" variant="info" />
```

---

## TuiTimeline

A vertical or horizontal list of events in chronological order.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | Array | required | Array of timeline items |
| `orientation` | String | `'vertical'` | Layout: `'vertical'` or `'horizontal'` |

### Item Structure

```javascript
{
  title: 'Event Title',        // Required
  description: 'Details...',   // Optional
  timestamp: '2025-01-15',     // Optional
  icon: '●',                   // Optional
  active: false                // Optional - highlights the item
}
```

### Usage

```vue
<TuiTimeline :items="timelineItems" orientation="vertical" />

<script setup>
const timelineItems = [
  {
    title: 'Project Started',
    description: 'Initial setup completed',
    timestamp: '2025-01-15',
    icon: '●'
  },
  {
    title: 'Current Phase',
    description: 'Development in progress',
    timestamp: '2025-10-22',
    icon: '★',
    active: true
  }
]
</script>
```

---

## TuiImage

A component for displaying images with additional features.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | String | required | Image URL |
| `alt` | String | `''` | Alt text |
| `lazy` | Boolean | `false` | Enable lazy loading |
| `aspectRatio` | String | `''` | Aspect ratio: `'1:1'`, `'4:3'`, `'16:9'`, `'21:9'`, `'3:2'` |
| `overlay` | Boolean | `false` | Enable overlay on hover |
| `overlayOpacity` | Number | `0.7` | Overlay opacity (0-1) |
| `caption` | String | `''` | Image caption |
| `loadingText` | String | `'Loading...'` | Loading placeholder text |
| `errorText` | String | `'Failed to load image'` | Error message |

### Events

- `load` - Emitted when image loads successfully
- `error` - Emitted when image fails to load

### Usage

```vue
<TuiImage 
  src="/image.jpg" 
  alt="Description"
  caption="Image caption"
  overlay
/>

<TuiImage 
  src="/banner.jpg" 
  aspect-ratio="16:9"
  lazy
/>
```

---

## TuiDatepicker

A component for selecting dates from a calendar view.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | Date/Array/null | `null` | Selected date(s) (v-model) |
| `label` | String | `''` | Input label |
| `placeholder` | String | `'Select date'` | Input placeholder |
| `format` | String | `'YYYY-MM-DD'` | Date format string |
| `range` | Boolean | `false` | Enable range selection |

### Events

- `update:modelValue` - Emitted when date changes
- `change` - Emitted when selection is complete

### Usage

```vue
<!-- Single date -->
<TuiDatepicker 
  v-model="selectedDate"
  label="Select Date"
  placeholder="Choose a date"
/>

<!-- Date range -->
<TuiDatepicker 
  v-model="dateRange"
  label="Select Range"
  :range="true"
/>
```

---

## Integration Example

Here's a complete example showing how to use multiple components together:

```vue
<template>
  <TuiCard title="User Profile" glowing>
    <!-- Avatar with status badge -->
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
      <TuiBadge dot variant="success">
        <TuiAvatar initials="JD" size="large" status="online" />
      </TuiBadge>
      <div>
        <h3>John Doe</h3>
        <p>Administrator</p>
      </div>
    </div>

    <!-- User tags -->
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <TuiChip label="Admin" variant="error" icon="⚙" />
      <TuiChip label="Developer" variant="info" icon="💻" />
      <TuiChip label="Active" variant="success" />
    </div>

    <!-- Actions with tooltips -->
    <div style="display: flex; gap: 0.5rem;">
      <TuiTooltip text="Edit profile">
        <TuiButton label="Edit" variant="info" />
      </TuiTooltip>
      <TuiTooltip text="Delete account">
        <TuiButton label="Delete" variant="danger" @click="showDialog = true" />
      </TuiTooltip>
    </div>

    <!-- Confirmation dialog -->
    <TuiDialog 
      v-model="showDialog"
      title="Confirm Delete"
      confirm-variant="danger"
      @confirm="deleteAccount"
    >
      <p>Are you sure you want to delete this account?</p>
    </TuiDialog>
  </TuiCard>
</template>
```

---

## Styling Notes

All components follow the TUI theme system and support:

- **Theme colors**: Primary (amber/green), success, error, warning, info
- **Glow effects**: Controlled by global glow settings
- **Responsive design**: Mobile-friendly layouts
- **Accessibility**: ARIA labels and keyboard navigation
- **Animations**: Smooth transitions and effects

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features required
- CSS Grid and Flexbox support needed
- IntersectionObserver API for lazy loading (with fallback)
