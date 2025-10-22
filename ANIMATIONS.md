# TUI Theme Animations Guide

This guide covers all the animation features available in the TUI Theme component library.

## 📝 Table of Contents

- [Typewriter Effect](#typewriter-effect)
- [Button Animations](#button-animations)
- [Card Animations](#card-animations)
- [Terminal Animations](#terminal-animations)
- [Custom Animations](#custom-animations)

---

## 🖊️ Typewriter Effect

### TuiText Component

The `TuiText` component provides a typewriter effect for displaying text character by character.

#### Basic Usage

```vue
<TuiText 
  text="Welcome to Vault 111"
  typewriter
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | String | **required** | The text to display |
| `typewriter` | Boolean | `false` | Enable typewriter effect |
| `typewriterSpeed` | Number | `50` | Speed in ms per character |
| `typewriterDelay` | Number | `0` | Initial delay before typing starts (ms) |
| `showCursor` | Boolean | `true` | Show blinking cursor during typing |
| `prefix` | String | `''` | Optional prefix (e.g., `"►"` or `">"`) |
| `glow` | Boolean | `false` | Add glow effect to text |

#### Events

- `@typewriter-complete` - Emitted when typing animation finishes

#### Advanced Example

```vue
<TuiText 
  text="VAULT-TEC: SECURING YOUR FUTURE"
  typewriter
  :typewriter-speed="30"
  :typewriter-delay="1000"
  prefix="►"
  show-cursor
  @typewriter-complete="onComplete"
/>
```

---

## 🔘 Button Animations

### Pulse Effect

Add a pulsing glow animation to buttons to draw attention.

#### Usage

```vue
<TuiButton label="Click Me" pulse />
<TuiButton label="Important" variant="danger" pulse />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pulse` | Boolean | `false` | Enable pulsing glow animation |

The pulse animation automatically adapts to the button variant (primary, secondary, danger).

---

## 📦 Card Animations

### Fade In

Cards can fade in smoothly when rendered.

```vue
<TuiCard title="My Card" fade-in>
  <p>This card fades in</p>
</TuiCard>
```

### Slide In

Cards can slide up while fading in.

```vue
<TuiCard title="My Card" slide-in>
  <p>This card slides and fades in</p>
</TuiCard>
```

### Staggered Animations

Create a staggered effect by using different delays:

```vue
<TuiCard title="Card 1" fade-in :animation-delay="0">
  <p>First card</p>
</TuiCard>

<TuiCard title="Card 2" fade-in :animation-delay="200">
  <p>Second card</p>
</TuiCard>

<TuiCard title="Card 3" fade-in :animation-delay="400">
  <p>Third card</p>
</TuiCard>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fadeIn` | Boolean | `false` | Enable fade-in animation |
| `slideIn` | Boolean | `false` | Enable slide-in animation |
| `animationDelay` | Number | `0` | Delay before animation starts (ms) |
| `animationDuration` | Number | `500` | Animation duration (ms) |

---

## 💻 Terminal Animations

### Typewriter Terminal Output

The `TuiTerminalTypewriter` component provides typewriter effect for terminal output lines.

**Note:** For a standard terminal without typewriter effects, use the regular `TuiTerminal` component.

#### Usage

```vue
<TuiTerminalTypewriter
  title="ROBCO INDUSTRIES"
  status="READY"
  typing-status="TYPING"
  :lines="terminalLines"
  :typewriter-speed="30"
  :typewriter-stagger="500"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | String | `'TERMINAL'` | Terminal header title |
| `status` | String | `'ONLINE'` | Status text when idle |
| `typingStatus` | String | `'TYPING'` | Status text while animation is running |
| `idleStatus` | String | `null` | Optional override for idle status (defaults to `status` or `READY` if `status` equals typing status) |
| `lines` | Array | `[]` | Array of line objects |
| `interactive` | Boolean | `false` | Enable input mode |
| `typewriterSpeed` | Number | `30` | Speed in ms per character |
| `typewriterStagger` | Number | `500` | Delay between starting each line (ms) |
| `autoType` | Boolean | `true` | Auto-start typewriter on mount |
| `lockInputDuringTyping` | Boolean | `true` | Disable terminal input until animation completes |

#### Example Data

```javascript
const terminalLines = ref([
  { type: 'success', text: 'System initialized...' },
  { type: 'info', text: 'Loading protocols...' },
  { type: 'output', text: 'Ready for input.' }
])
```

**Note:** Input lines (`type: 'input'`) are not animated - only output lines.

---

## 🎨 Custom Animations

### Using the Typewriter Composable

For custom components, you can use the `useTypewriter` composable directly:

```vue
<script setup>
import { ref, computed } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'

const myText = ref('Hello, Vault Dweller!')

const { displayText, isTyping, resetTypewriter } = useTypewriter(
  computed(() => myText.value),
  {
    speed: 50,
    enabled: true,
    delay: 0,
    cursor: true,
    onComplete: () => console.log('Done!')
  }
)
</script>

<template>
  <div>
    {{ displayText }}
    <span v-if="isTyping">█</span>
  </div>
</template>
```

#### Composable Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `speed` | Number | `50` | Typing speed (ms per character) |
| `enabled` | Boolean | `true` | Enable/disable typewriter |
| `delay` | Number | `0` | Initial delay before typing |
| `cursor` | Boolean | `true` | Show cursor indicator |
| `onComplete` | Function | `null` | Callback when typing finishes |

#### Return Values

- `displayText` - Reactive text being displayed
- `isTyping` - Boolean indicating if currently typing
- `resetTypewriter()` - Function to restart the animation

---

## 🎯 Animation Best Practices

### Performance

1. **Limit simultaneous animations** - Too many typewriter effects at once can be distracting
2. **Use staggering** - Offset animation start times for better UX
3. **Consider accessibility** - Provide options to disable animations if needed

### User Experience

1. **Don't overuse pulse** - Reserve for truly important actions
2. **Match animation speed to content** - Longer text should type faster
3. **Test on slower devices** - Ensure animations remain smooth

### Theming

All animations respect the current theme (amber/green) and include:
- Glow effects using theme colors
- Cursor colors matching primary theme color
- Shadows and effects that adapt to theme

---

## 🔧 Examples

### Welcome Screen

```vue
<TuiCard title="Welcome" fade-in glowing>
  <TuiText 
    text="Welcome to Vault-Tec Corporation"
    typewriter
    :typewriter-speed="40"
    prefix="►"
  />
  <TuiText 
    text="Preparing your personalized experience..."
    typewriter
    :typewriter-speed="30"
    :typewriter-delay="2000"
    prefix="►"
  />
  <TuiButton 
    label="Continue" 
    pulse 
    style="margin-top: 2rem;"
  />
</TuiCard>
```

### Boot Sequence

```vue
<TuiTerminalTypewriter
  title="SYSTEM BOOT"
  status="INITIALIZING"
  :lines="bootSequence"
  :typewriter-speed="20"
  :typewriter-stagger="300"
/>

<script setup>
const bootSequence = [
  { type: 'info', text: 'BIOS v2.4.1 initialized' },
  { type: 'info', text: 'Loading Vault-Tec OS...' },
  { type: 'success', text: 'Memory check: 4096KB OK' },
  { type: 'success', text: 'Peripheral devices: OK' },
  { type: 'success', text: 'System ready.' }
]
</script>
```

### Action Confirmation

```vue
<TuiCard title="Confirm Action" slide-in>
  <TuiText 
    text="Are you sure you want to open the vault door?"
    typewriter
    :typewriter-speed="40"
  />
  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <TuiButton label="Cancel" variant="secondary" />
    <TuiButton label="Confirm" variant="danger" pulse />
  </div>
</TuiCard>
```

---

## 📚 See Also

- [Component Documentation](./README.md)
- [Theme Customization](./THEME_GUIDE.md)
