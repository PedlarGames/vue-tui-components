# Vue TUI Components - Usage Examples

Complete examples for all components in the library.

## Basic Setup

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

## Component Examples

### TuiButton

```vue
<template>
  <div>
    <TuiButton label="Primary" variant="primary" @click="handleClick" />
    <TuiButton label="Secondary" variant="secondary" />
    <TuiButton label="Warning" variant="warning" />
    <TuiButton label="Danger" variant="danger" />
    <TuiButton label="Info" variant="info" />
    <TuiButton label="Disabled" :disabled="true" />
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

### TuiInput

```vue
<template>
  <TuiInput 
    v-model="username"
    label="Username"
    placeholder="Enter username..."
  />
  
  <TuiInput 
    v-model="password"
    label="Password"
    type="password"
  />
</template>

<script setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
</script>
```

### TuiCard

```vue
<template>
  <TuiCard 
    title="System Status" 
    glowing
    fade-in
  >
    <p>Content goes here</p>
  </TuiCard>
  
  <TuiCard 
    title="Alert"
    slide-in
  >
    <p>Animated card content</p>
  </TuiCard>
</template>
```

### TuiProgressBar

```vue
<template>
  <TuiProgressBar 
    :value="75" 
    label="Health Points"
  />
  
  <TuiProgressBar 
    :value="progress" 
    label="Loading..."
    :animated="true"
  />
</template>

<script setup>
import { ref } from 'vue'
const progress = ref(50)
</script>
```

### TuiSelect

```vue
<template>
  <TuiSelect 
    v-model="selected"
    label="Choose Option"
    :options="options"
  />
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('option1')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]
</script>
```

### TuiTerminal

```vue
<template>
  <TuiTerminal
    title="System Terminal"
    status="Online"
    :lines="terminalLines"
    :interactive="true"
    @command="handleCommand"
  />
</template>

<script setup>
import { ref } from 'vue'

const terminalLines = ref([
  { type: 'info', text: 'System initialized' },
  { type: 'success', text: 'Connection established' },
  { type: 'error', text: 'Warning: Low power' }
])

const handleCommand = (cmd) => {
  terminalLines.value.push({ 
    type: 'info', 
    text: `> ${cmd}` 
  })
}
</script>
```

### TuiTable

```vue
<template>
  <TuiTable 
    :headers="headers"
    :data="tableData"
  />
</template>

<script setup>
const headers = ['ID', 'Name', 'Status', 'Level']
const tableData = [
  ['001', 'Player One', 'Active', '42'],
  ['002', 'Player Two', 'Inactive', '38'],
  ['003', 'Player Three', 'Active', '50']
]
</script>
```

### TuiTabs

```vue
<template>
  <TuiTabs 
    :tabs="tabs" 
    v-model="activeTab"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)
const tabs = [
  { label: 'Status', content: 'Status information...' },
  { label: 'Inventory', content: 'Inventory list...' },
  { label: 'Map', content: 'Map data...' }
]
</script>
```

### TuiDialog

```vue
<template>
  <TuiButton label="Open Dialog" @click="showDialog = true" />
  
  <TuiDialog 
    v-model="showDialog"
    title="Confirmation"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <p>Are you sure you want to proceed?</p>
  </TuiDialog>
</template>

<script setup>
import { ref } from 'vue'

const showDialog = ref(false)

const handleConfirm = () => {
  console.log('Confirmed!')
  showDialog.value = false
}

const handleCancel = () => {
  console.log('Cancelled!')
  showDialog.value = false
}
</script>
```

### TuiToast (with Composable)

```vue
<template>
  <div>
    <TuiButton label="Success Toast" @click="showSuccess" />
    <TuiButton label="Error Toast" @click="showError" />
    <TuiButton label="Warning Toast" @click="showWarning" />
    <TuiButton label="Info Toast" @click="showInfo" />
  </div>
</template>

<script setup>
import { useToast } from 'vue-tui-components'

const toast = useToast()

const showSuccess = () => toast.success('Operation completed!')
const showError = () => toast.error('Something went wrong!')
const showWarning = () => toast.warning('Please be careful!')
const showInfo = () => toast.info('Did you know?')
</script>
```

### TuiCheckbox

```vue
<template>
  <TuiCheckbox 
    v-model="agree"
    label="I agree to the terms"
  />
  
  <TuiCheckbox 
    v-model="subscribe"
    label="Subscribe to newsletter"
  />
</template>

<script setup>
import { ref } from 'vue'
const agree = ref(false)
const subscribe = ref(true)
</script>
```

### TuiRadio

```vue
<template>
  <TuiRadio 
    v-model="difficulty"
    name="difficulty"
    :options="difficultyOptions"
  />
</template>

<script setup>
import { ref } from 'vue'

const difficulty = ref('normal')
const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'normal', label: 'Normal' },
  { value: 'hard', label: 'Hard' }
]
</script>
```

### TuiSlider

```vue
<template>
  <TuiSlider 
    v-model="volume"
    label="Volume"
    :min="0"
    :max="100"
    :step="1"
  />
</template>

<script setup>
import { ref } from 'vue'
const volume = ref(75)
</script>
```

### TuiBadge

```vue
<template>
  <TuiBadge label="New" variant="success" />
  <TuiBadge label="Error" variant="error" />
  <TuiBadge label="Warning" variant="warning" />
  <TuiBadge label="Info" variant="info" />
</template>
```

### TuiChip

```vue
<template>
  <TuiChip 
    label="Vue"
    removable
    @remove="handleRemove"
  />
  
  <TuiChip label="JavaScript" />
  <TuiChip label="TypeScript" removable />
</template>

<script setup>
const handleRemove = () => {
  console.log('Chip removed!')
}
</script>
```

### TuiAvatar

```vue
<template>
  <TuiAvatar 
    src="/path/to/image.jpg"
    alt="User Name"
    size="large"
  />
  
  <TuiAvatar 
    initials="JD"
    size="medium"
  />
</template>
```

### TuiBanner

```vue
<template>
  <TuiBanner 
    message="System update available!"
    variant="info"
    dismissible
    @dismiss="handleDismiss"
  />
  
  <TuiBanner 
    message="Critical error detected!"
    variant="error"
  />
</template>

<script setup>
const handleDismiss = () => {
  console.log('Banner dismissed!')
}
</script>
```

### TuiThemeSwitcher

```vue
<template>
  <!-- Provides theme controls for users -->
  <TuiThemeSwitcher />
</template>
```

### useTypewriter Composable

```vue
<template>
  <div>
    <p>{{ displayText }}</p>
    <TuiButton label="Start" @click="start" />
    <TuiButton label="Reset" @click="reset" />
  </div>
</template>

<script setup>
import { useTypewriter } from 'vue-tui-components'

const { displayText, start, reset } = useTypewriter(
  'Welcome to the Vault-Tec Terminal System!',
  50 // speed in ms
)
</script>
```

## Complete Application Example

```vue
<!-- App.vue -->
<template>
  <div class="tui-app">
    <TuiHeader 
      title="MY TUI APPLICATION" 
      subtitle="TERMINAL INTERFACE v1.0" 
    />
    
    <TuiThemeSwitcher />
    
    <TuiCard title="User Login" glowing>
      <TuiInput 
        v-model="username"
        label="Username"
        placeholder="Enter username"
      />
      
      <TuiInput 
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter password"
      />
      
      <TuiCheckbox 
        v-model="remember"
        label="Remember me"
      />
      
      <TuiButton 
        label="Login"
        variant="primary"
        @click="handleLogin"
      />
    </TuiCard>
    
    <TuiCard title="System Status">
      <TuiProgressBar 
        :value="health"
        label="System Health"
      />
      
      <TuiProgressBar 
        :value="power"
        label="Power Level"
      />
    </TuiCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-tui-components'

const username = ref('')
const password = ref('')
const remember = ref(false)
const health = ref(85)
const power = ref(92)

const toast = useToast()

const handleLogin = () => {
  if (username.value && password.value) {
    toast.success('Login successful!')
  } else {
    toast.error('Please enter credentials!')
  }
}
</script>

<style>
.tui-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
```

## Theming

### Setting Theme Programmatically

```javascript
// Set theme
document.documentElement.setAttribute('data-theme', 'green')

// Available themes: 'amber' (default), 'green', 'greyscale'
```

### Toggle Effects

```javascript
// Toggle glow
document.documentElement.setAttribute('data-glow', 'false')

// Toggle scanlines
document.body.setAttribute('data-scanlines', 'false')

// Toggle CRT flicker
document.body.setAttribute('data-flicker', 'false')
```

### Custom Scale

```css
:root {
  --tui-scale: 1.2; /* Adjust global scale */
}
```

## TypeScript Support

TypeScript definitions will be added in a future release. For now, you can use components without type checking or create your own type declarations.

## More Information

For more examples and documentation, visit the [GitHub repository](https://github.com/yourusername/vue-tui-components).
