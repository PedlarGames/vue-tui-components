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
- **TuiButton** - Styled buttons with primary, secondary, and danger variants + pulse animation
- **TuiInput** - Text input with animated cursor
- **TuiSelect** - Custom dropdown with full theme control
- **TuiCheckbox** - Checkboxes with TUI styling
- **TuiRadio** - Radio button groups

### Display Components
- **TuiCard** - Container with optional glow, fade-in, and slide-in animations
- **TuiText** - Text display with typewriter effect
- **TuiProgressBar** - Animated progress indicator with segments
- **TuiTable** - Data table with hover effects
- **TuiTerminal** - Interactive terminal component with typewriter support
- **TuiTabs** - Tab navigation system
- **TuiHeader** - Page header with timestamp
- **TuiThemeSwitcher** - Theme and display effects control panel

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
