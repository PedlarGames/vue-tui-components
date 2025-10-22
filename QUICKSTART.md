# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:3000/`

---

## 🎨 Using the Theme Switcher

At the top of the showcase page, you'll see the **DISPLAY SETTINGS** panel:

### Color Schemes
Click either button to switch themes:
- **GREEN** - Classic Pip-Boy phosphor display
- **AMBER** - Vintage terminal amber monitor (default)

### Display Effects
Toggle these checkboxes to customize visual effects:
- **✓ SCANLINES** - CRT horizontal scan effect
- **✓ CRT FLICKER** - Subtle screen flicker animation

💾 **Your settings are automatically saved** and will persist when you refresh the page!

---

## 📦 Component Examples

### Import and Use Any Component

```vue
<template>
  <div>
    <TuiButton label="Click Me" @click="handleClick" />
    <TuiInput v-model="text" label="Enter Text" />
    <TuiProgressBar :value="75" label="Progress" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TuiButton from './components/TuiButton.vue'
import TuiInput from './components/TuiInput.vue'
import TuiProgressBar from './components/TuiProgressBar.vue'

const text = ref('')
const handleClick = () => console.log('Clicked!')
</script>
```

---

## 🎮 Try These Components

Explore the showcase page to see all components in action:

✅ Buttons (Primary, Secondary, Danger)  
✅ Text Inputs with animated cursors  
✅ Select Dropdowns  
✅ Checkboxes and Radio Buttons  
✅ Progress Bars with animations  
✅ Interactive Terminal (try commands: `help`, `status`, `scan`)  
✅ Data Tables  
✅ Tab Navigation  

---

## 🛠️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 📚 Documentation

- **README.md** - Full component documentation
- **THEME_GUIDE.md** - Theme customization guide
- Component files in `src/components/` - See source code for props and events

---

## 💡 Tips

1. **Experiment with themes** - Try both Green and Amber to see which you prefer
2. **Toggle effects** - Disable scanlines/flicker on slower devices
3. **Interactive terminal** - Type commands to see dynamic responses
4. **Responsive** - Try resizing your browser window
5. **Keyboard accessible** - Navigate with Tab key

Enjoy your retro-futuristic TUI experience! 🎮✨
