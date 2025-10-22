# NPM Package Quick Start

Install vue-tui-components in your Vue 3 project:

```bash
npm install vue-tui-components
```

## Setup

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

## Use Components

```vue
<template>
  <TuiButton label="Click Me" />
  <TuiInput v-model="text" label="Username" />
  <TuiCard title="Status">
    <TuiProgressBar :value="75" />
  </TuiCard>
</template>
```

See [INSTALLATION.md](INSTALLATION.md) and [EXAMPLES.md](EXAMPLES.md) for more details.
