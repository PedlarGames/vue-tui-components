# Vue3 TUI Component Library

A comprehensive set of Vue3 components styled to look like a TUI (Text-based GUI) with retro terminal aesthetics. Features retro monospace fonts, multiple color themes (Amber/Green/Greyscale), scanline effects, vintage CRT display effects, and smooth animations including typewriter effects.

## 📦 Installation

```bash
npm install vue-tui-components
```

### Quick Setup

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

Now use components in your templates:

```vue
<template>
  <TuiButton label="Click Me" variant="primary" />
  <TuiInput v-model="text" label="Username" />
</template>
```

See [INSTALLATION.md](INSTALLATION.md) for detailed setup instructions.

## 🎮 Components

### Form Components

**TuiButton** - Versatile button component with multiple variants (primary, secondary, warning, danger, info), disabled state, and optional pulse animation for attention-grabbing CTAs.

**TuiInput** - Text input field with animated cursor effect, label support, placeholder text, and various input types (text, password, email, etc.).

**TuiSelect** - Custom-styled dropdown select with full theme integration, keyboard navigation, and support for option groups.

**TuiCheckbox** - Checkbox input with TUI styling, label support, and v-model binding for easy form integration.

**TuiRadio** - Radio button groups with consistent styling, keyboard navigation, and support for option arrays.

**TuiSlider** - Range slider component with customizable min/max values, step increments, and real-time value display.

**TuiDatepicker** - Interactive date picker with calendar view, keyboard navigation, and date range selection support.

**TuiOTP** - One-time password input component with auto-focus between fields, paste support, and validation states.

### Display Components

**TuiCard** - Versatile container component with optional title, glowing borders, and animation support (fade-in, slide-in).

**TuiText** - Text display component with optional typewriter effect for character-by-character text animation.

**TuiProgressBar** - Animated progress indicator with segment visualization, labels, and percentage display.

**TuiTable** - Data table component with hover effects, sortable columns, and responsive design.

**TuiTabs** - Tab navigation system with keyboard support, active tab highlighting, and content switching.

**TuiHeader** - Page header component with title, subtitle, and optional timestamp display.

**TuiBadge** - Small status indicator with severity variants (success, error, warning, info) for labels and notifications.

**TuiChip** - Tag/chip component with optional remove functionality, perfect for filters and selected items.

**TuiAvatar** - User avatar component supporting images, initials, or icons with size variants (small, medium, large).

**TuiBanner** - Alert banner component with dismissible option and severity variants for important messages.

**TuiTimeline** - Vertical timeline component for displaying chronological events with icons and descriptions.

**TuiImage** - Themed image component with loading states, fallback support, and responsive sizing.

**TuiIcon** - Icon display component with support for multiple icon sets and size variants.

### Interactive Components

**TuiDialog** - Modal dialog component with confirm/cancel actions, backdrop click handling, and customizable content.

**TuiDropdown** - Dropdown menu component with nested menus, keyboard navigation, and positioning options.

**TuiMenubar** - Desktop-style application menu bar with dropdown menus, keyboard shortcuts, and customizable items.

**TuiToast** - Toast notification system with position control (top/bottom, left/right/center) and severity variants.

**TuiTerminal** - Interactive terminal emulator with command history, typewriter effect, and customizable command handlers.

**TuiTerminalTypewriter** - Specialized terminal with built-in typewriter animation for displaying sequential messages.

**TuiTooltip** - Hover tooltip component with positioning options and custom content support.

**TuiCarousel** - Image carousel/slider with navigation controls, auto-play, and responsive behavior.

### Utility Components

**TuiThemeSwitcher** - Complete theme control panel for switching color schemes (Amber/Green/Greyscale) and toggling visual effects (scanlines, flicker, glow).

## 🧰 Composables

**useToast** - Composable function for programmatically triggering toast notifications with methods for success, error, warning, and info messages.

**useTypewriter** - Composable for implementing typewriter text effects with configurable speed and control methods (start, stop, reset).

## ✨ Features

- 🎨 **Dual Themes** - Amber (default) and Green color schemes
- 📺 **CRT Effects** - Scanlines, flicker, and glow effects
- 🔤 **Retro Fonts** - VT323 and Share Tech Mono for authentic terminal look
- ⚡ **Animations** - Typewriter effects, pulse, fade-in, slide-in
- 🎚️ **Global Scaling** - Easily adjust the size of all components
- 💾 **Persistent Preferences** - Settings saved to localStorage
- ♿ **Keyboard Navigation** - Full keyboard support for all components

## 🚀 Development

If you want to contribute or modify the library:

### Clone and Install

```bash
git clone <your-repo-url>
cd tuitheme
npm install
```

### Development Server

```bash
npm run dev
```

### Build Library

```bash
npm run build:lib
```

This will generate the distributable files in the `dist/` directory.

## 📦 Component Usage

### Button Example

```vue
<TuiButton 
  label="Click Me" 
  variant="primary" 
  @click="handleClick" 
/>
```

### Input Example

```vue
<TuiInput 
  v-model="username"
  label="Username"
  placeholder="Enter username..."
/>
```

### Progress Bar Example

```vue
<TuiProgressBar 
  :value="75" 
  label="Health Points" 
/>
```

### Terminal Example

```vue
<TuiTerminal
  title="System Terminal"
  status="Online"
  :lines="terminalLines"
  :interactive="true"
  @command="handleCommand"
/>
```

## 🎨 Theming

The components use CSS custom properties for easy theming:

### Amber Theme (Default)

```css
:root {
  --tui-primary: #ffb000;
  --tui-secondary: #ff8800;
  --tui-bg: #0a0a0a;
  --tui-bg-light: #1a1a1a;
  --tui-border: #ffb000;
  --tui-text: #ffb000;
}
```

### Green Theme

```css
:root[data-theme="green"] {
  --tui-primary: #00ff00;
  --tui-secondary: #00cc00;
  --tui-border: #00ff00;
  --tui-text: #00ff00;
}
```

### Theme Switcher Component

The `TuiThemeSwitcher` component provides controls for:
- **Color Schemes**: Switch between Amber (default) and Green (Pip-Boy) themes
- **Scanlines**: Toggle CRT scanline effect on/off
- **CRT Flicker**: Toggle screen flicker animation on/off
- **Glow Effect**: Toggle text and border glow illumination on/off

All preferences are saved to localStorage and persist between sessions.

```vue
<TuiThemeSwitcher />
```

## ✨ Features

- 🎯 Fully reactive Vue3 components
- 🎨 Dual color themes: Amber (default) and Green
- 🔧 Theme switcher with persistent preferences
- ✨ CRT scanline, flicker, and glow effects (all toggleable)
- 🔋 Progress bars with animations
- 💻 Interactive terminal component
- 📊 Data tables with hover effects
- 🎮 Modern interactivity with retro aesthetics
- � Responsive design
- � LocalStorage persistence for user preferences
- 🔤 Retro monospace fonts (VT323, Share Tech Mono) via Google Fonts

## 🔤 Font Configuration

The project uses retro monospace fonts loaded via Google Fonts:

```css
font-family: 'VT323', 'Share Tech Mono', monospace;
```

**VT323** provides the classic terminal look, while **Share Tech Mono** offers a cleaner alternative. Both fonts are automatically loaded from Google Fonts CDN.

## 📋 Component Quick Reference

| Component | Category | Purpose |
|-----------|----------|---------|
| TuiButton | Form | Buttons with variants and pulse animation |
| TuiInput | Form | Text input with animated cursor |
| TuiSelect | Form | Dropdown select with theme styling |
| TuiCheckbox | Form | Checkbox with TUI styling |
| TuiRadio | Form | Radio button groups |
| TuiSlider | Form | Range slider with value display |
| TuiDatepicker | Form | Calendar date picker |
| TuiOTP | Form | One-time password input |
| TuiCard | Display | Container with animations |
| TuiText | Display | Text with typewriter effect |
| TuiProgressBar | Display | Animated progress indicator |
| TuiTable | Display | Data table with sorting |
| TuiTabs | Display | Tab navigation |
| TuiHeader | Display | Page header with timestamp |
| TuiBadge | Display | Status indicator labels |
| TuiChip | Display | Removable tag/filter chips |
| TuiAvatar | Display | User avatar component |
| TuiBanner | Display | Alert banner messages |
| TuiTimeline | Display | Event timeline |
| TuiImage | Display | Themed image display |
| TuiIcon | Display | Icon component |
| TuiDialog | Interactive | Modal dialogs |
| TuiDropdown | Interactive | Dropdown menus |
| TuiMenubar | Interactive | Application menu bar |
| TuiToast | Interactive | Toast notifications |
| TuiTerminal | Interactive | Terminal emulator |
| TuiTerminalTypewriter | Interactive | Terminal with typewriter |
| TuiTooltip | Interactive | Hover tooltips |
| TuiCarousel | Interactive | Image carousel |
| TuiThemeSwitcher | Utility | Theme control panel |

## � Documentation

- **[ANIMATIONS.md](ANIMATIONS.md)** - Complete guide to typewriter effects, button pulse, card animations, and more
- **[THEME_GUIDE.md](THEME_GUIDE.md)** - Theming system and customization

## �🛠️ Tech Stack

- Vue 3.4
- Vite 5.0
- CSS3 with custom properties
- Google Fonts (VT323, Share Tech Mono)

## 📄 License

MIT
