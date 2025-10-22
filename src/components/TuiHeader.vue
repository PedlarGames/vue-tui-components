<template>
  <header class="tui-header">
    <div class="header-top">
      <span class="corner">╔</span>
      <div class="header-line"></div>
      <span class="corner">╗</span>
    </div>
    <div class="header-content">
      <h1 class="header-title">{{ title }}</h1>
      <p class="header-subtitle" v-if="subtitle">{{ subtitle }}</p>
      <div class="header-timestamp">{{ timestamp }}</div>
    </div>
    <div class="header-bottom">
      <span class="corner">╚</span>
      <div class="header-line"></div>
      <span class="corner">╝</span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})

const timestamp = ref('')

const updateTimestamp = () => {
  const now = new Date()
  timestamp.value = now.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

let interval

onMounted(() => {
  updateTimestamp()
  interval = setInterval(updateTimestamp, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.tui-header {
  margin-bottom: 2rem;
}

.header-top,
.header-bottom {
  display: flex;
  align-items: center;
}

.corner {
  color: var(--tui-primary);
  font-size: 1.5rem;
  text-shadow: var(--tui-glow);
}

.header-line {
  flex: 1;
  height: 2px;
  background: var(--tui-border);
  box-shadow: var(--tui-glow);
  margin: 0 0.5rem;
}

.header-content {
  border-left: 2px solid var(--tui-border);
  border-right: 2px solid var(--tui-border);
  padding: 1.5rem;
  text-align: center;
  background: var(--tui-bg-light);
  box-shadow: inset 0 0 20px var(--tui-primary-transparent-10);
  margin-left: 9px;
  margin-right: 9px;
}

.header-title {
  font-size: 2.5rem;
  letter-spacing: 5px;
  text-shadow: var(--tui-glow);
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-size: 0.9rem;
  letter-spacing: 2px;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.header-timestamp {
  font-size: 0.85rem;
  color: var(--tui-secondary);
  letter-spacing: 1px;
}
</style>
