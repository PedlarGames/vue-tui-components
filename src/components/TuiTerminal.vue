<template>
  <div class="tui-terminal">
    <div class="terminal-header">
      <span class="terminal-title">{{ title }}</span>
      <span class="terminal-status">{{ status }}</span>
    </div>
    <div class="terminal-body" ref="terminalBody">
      <div v-for="(line, index) in lines" :key="index" class="terminal-line">
        <span class="line-prompt" v-if="line.type === 'input'">&gt;</span>
        <span 
          class="line-text" 
          :class="line.type"
        >{{ line.text }}</span>
      </div>
      <div class="terminal-input-line" v-if="interactive">
        <span class="line-prompt">&gt;</span>
        <input 
          v-model="currentInput"
          class="terminal-input"
          @keyup.enter="handleEnter"
          ref="terminalInput"
        />
        <span class="cursor">_</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'TERMINAL'
  },
  status: {
    type: String,
    default: 'ONLINE'
  },
  lines: {
    type: Array,
    default: () => []
  },
  interactive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['command'])

const currentInput = ref('')
const terminalBody = ref(null)
const terminalInput = ref(null)

const handleEnter = () => {
  if (currentInput.value.trim()) {
    emit('command', currentInput.value)
    currentInput.value = ''
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

defineExpose({ scrollToBottom })
</script>

<style scoped>
.tui-terminal {
  border: 2px solid var(--tui-border);
  background: var(--tui-bg);
  box-shadow: var(--tui-glow);
  margin-bottom: 1.5rem;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
}

.terminal-title {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
}

.terminal-status {
  color: var(--tui-primary);
  text-shadow: var(--tui-glow);
}

.terminal-body {
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
  font-family: var(--tui-font);
}

.terminal-line {
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.line-prompt {
  color: var(--tui-primary);
  font-weight: bold;
}

.line-text {
  flex: 1;
  word-wrap: break-word;
}

.line-text.error {
  color: var(--tui-error);
}

.line-text.success {
  color: var(--tui-success);
}

.line-text.warning {
  color: var(--tui-warning);
}

.line-text.info {
  color: var(--tui-info);
}

.terminal-input-line {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--tui-text);
  font-family: var(--tui-font);
  font-size: 1rem;
  outline: none;
}

.cursor {
  color: var(--tui-primary);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
