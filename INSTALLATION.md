# Vue TUI Components - Installation Guide

## Installation

Install the package via npm:

```bash
npm install vue-tui-components
```

Or with yarn:

```bash
yarn add vue-tui-components
```

Or with pnpm:

```bash
pnpm add vue-tui-components
```

## Usage

### Option 1: Global Installation (Recommended)

Register all components globally in your main application file:

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import VueTuiComponents from 'vue-tui-components'
import 'vue-tui-components/dist/style.css'

const app = createApp(App)
app.use(VueTuiComponents)
app.mount('#app')
```

Now you can use any component in your templates without importing:

```vue
<template>
  <div>
    <TuiButton label="Click Me" variant="primary" @click="handleClick" />
    <TuiInput v-model="username" label="Username" />
    <TuiCard title="System Status">
      <TuiProgressBar :value="75" label="Health" />
    </TuiCard>
  </div>
</template>
```

### Option 2: Individual Component Import

Import only the components you need:

```vue
<template>
  <div>
    <TuiButton label="Submit" @click="submit" />
    <TuiInput v-model="text" />
  </div>
</template>

<script setup>
import { TuiButton, TuiInput } from 'vue-tui-components'
import 'vue-tui-components/dist/style.css'

const text = ref('')

const submit = () => {
  console.log('Submitted:', text.value)
}
</script>
```

### Option 3: Use with Nuxt 3

Create a plugin file:

```javascript
// plugins/vue-tui-components.js
import VueTuiComponents from 'vue-tui-components'
import 'vue-tui-components/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTuiComponents)
})
```

## Using Composables

The library includes useful composables:

```vue
<script setup>
import { useToast, useTypewriter } from 'vue-tui-components'

// Toast notifications
const toast = useToast()
toast.success('Operation completed!')
toast.error('Something went wrong')
toast.warning('Please be careful')
toast.info('Did you know?')

// Typewriter effect
const { displayText, start, reset } = useTypewriter('Hello World!', 50)
</script>
```

## Theme Configuration

The components use CSS custom properties for theming. The default theme is Amber, but you can switch to Green or Greyscale:

### Using the Theme Switcher Component

```vue
<template>
  <TuiThemeSwitcher />
</template>
```

This provides a UI to toggle:
- Color scheme (Amber/Green/Greyscale)
- Scanlines effect
- CRT flicker effect
- Glow effects

### Programmatic Theme Control

```javascript
// Set theme
document.documentElement.setAttribute('data-theme', 'green') // 'amber', 'green', or 'greyscale'

// Toggle effects
document.documentElement.setAttribute('data-glow', 'false')
document.body.setAttribute('data-scanlines', 'false')
document.body.setAttribute('data-flicker', 'false')
```

### Custom Theme

Override CSS variables in your app's CSS:

```css
:root {
  --tui-primary: #ff00ff;
  --tui-secondary: #ff00aa;
  --tui-bg: #000000;
  --tui-bg-light: #111111;
  --tui-border: #ff00ff;
  --tui-text: #ff00ff;
  --tui-scale: 1.2; /* Adjust overall size */
}
```

## Available Components

### Form Components
- `TuiButton` - Styled buttons with variants
- `TuiInput` - Text input with animated cursor
- `TuiSelect` - Custom dropdown select
- `TuiCheckbox` - Themed checkboxes
- `TuiRadio` - Radio button groups
- `TuiSlider` - Range slider
- `TuiDatepicker` - Date picker
- `TuiOTP` - OTP input field

### Display Components
- `TuiCard` - Container with animations
- `TuiText` - Text with typewriter effect
- `TuiProgressBar` - Animated progress indicator
- `TuiTable` - Data table
- `TuiTerminal` - Interactive terminal
- `TuiTabs` - Tab navigation
- `TuiHeader` - Page header
- `TuiBadge` - Status badge
- `TuiChip` - Tag/chip component
- `TuiAvatar` - User avatar
- `TuiBanner` - Alert banner
- `TuiTooltip` - Tooltip overlay
- `TuiTimeline` - Event timeline
- `TuiCarousel` - Image carousel
- `TuiImage` - Themed image component
- `TuiIcon` - Icon component

### Interactive Components
- `TuiDialog` - Modal dialog
- `TuiDropdown` - Dropdown menu
- `TuiMenubar` - Menu bar
- `TuiToast` - Toast notifications
- `TuiThemeSwitcher` - Theme control panel

## TypeScript Support

TypeScript definitions are not yet included but will be added in a future version.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required

## Troubleshooting

### Styles not loading

Make sure you import the CSS file:

```javascript
import 'vue-tui-components/dist/style.css'
```

### Components not registered

Ensure you've called `app.use(VueTuiComponents)` or imported components individually.

### Font not rendering correctly

The package uses Google Fonts (VT323, Share Tech Mono) which are loaded via CDN. Ensure your application has internet access or host the fonts locally.

## Next Steps

- Check out the [README.md](README.md) for component examples
- See [THEME_GUIDE.md](THEME_GUIDE.md) for advanced theming
- Read [ANIMATIONS.md](ANIMATIONS.md) for animation details
