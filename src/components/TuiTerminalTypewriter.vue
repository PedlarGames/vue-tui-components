<template>
  <div class="tui-terminal-typewriter">
    <div class="terminal-header">
      <span class="terminal-title">{{ title }}</span>
      <span class="terminal-status">{{ displayStatus }}</span>
    </div>
    <div class="terminal-body" ref="terminalBody">
      <div v-for="(line, index) in lines" :key="`line-${index}-${line.text}`" class="terminal-line">
        <span class="line-prompt" v-if="line.type === 'input'">&gt;</span>
        <span 
          class="line-text" 
          :class="line.type"
        >
          <TuiText 
            v-if="line.type !== 'input'"
            :text="line.text"
            :typewriter="shouldAnimateLine(index)"
            :typewriter-speed="typewriterSpeed"
            :typewriter-delay="getDelay(index)"
            :show-cursor="shouldShowCursor(index)"
            inherit-color
            @typewriter-complete="() => handleLineComplete(index)"
          />
          <span v-else>{{ line.text }}</span>
        </span>
      </div>
      <div class="terminal-input-line" v-if="interactive">
        <span class="line-prompt">&gt;</span>
        <input 
          v-model="currentInput"
          class="terminal-input"
          @keyup.enter="handleEnter"
          ref="terminalInput"
          :disabled="lockInputDuringTyping && isTyping"
        />
        <span class="cursor">_</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed, watch } from 'vue'
import TuiText from './TuiText.vue'

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
  },
  typewriterSpeed: {
    type: Number,
    default: 30
  },
  typewriterStagger: {
    type: Number,
    default: 500
  },
  autoType: {
    type: Boolean,
    default: true
  },
  typingStatus: {
    type: String,
    default: 'TYPING'
  },
  idleStatus: {
    type: String,
    default: null
  },
  lockInputDuringTyping: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['command', 'typing-complete'])

const currentInput = ref('')
const terminalBody = ref(null)
const terminalInput = ref(null)
const initialRenderCount = ref(props.lines.length)
const completedAnimatedLines = ref(0)
const hasUserInteracted = ref(!props.autoType)

const lines = computed(() => props.lines)

const totalAnimatedLines = computed(() => {
  if (!props.autoType) return 0
  const limit = Math.min(initialRenderCount.value, props.lines.length)
  return props.lines.slice(0, limit).filter(line => line?.type !== 'input').length
})

const isTyping = ref(props.autoType && totalAnimatedLines.value > 0)

const focusInput = (force = false) => {
  if (!props.interactive) return
  if (!force && props.autoType && !hasUserInteracted.value) return
  nextTick(() => {
    terminalInput.value?.focus()
  })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

const handleEnter = () => {
  if (currentInput.value.trim()) {
    hasUserInteracted.value = true
    emit('command', currentInput.value)
    currentInput.value = ''
    scrollToBottom()
    focusInput()
  }
}

const lastAnimatedIndex = computed(() => {
  if (!props.autoType || totalAnimatedLines.value === 0) return -1
  const limit = Math.min(initialRenderCount.value, props.lines.length)
  // Find last non-input line within initial render range
  for (let i = limit - 1; i >= 0; i -= 1) {
    if (props.lines[i]?.type !== 'input') {
      return i
    }
  }
  return -1
})

const displayStatus = computed(() => {
  if (isTyping.value) {
    return props.typingStatus ?? props.status ?? 'TYPING'
  }
  if (props.idleStatus) {
    return props.idleStatus
  }
  if (props.status && props.typingStatus && props.status === props.typingStatus) {
    return 'READY'
  }
  if (props.status === 'TYPING') {
    return 'READY'
  }
  return props.status ?? 'READY'
})

const getDelay = (index) => {
  if (!shouldAnimateLine(index)) return 0

  const nonInputBefore = props.lines
    .slice(0, index)
    .reduce((count, line) => (line?.type !== 'input' ? count + 1 : count), 0)

  const completedBefore = Math.min(completedAnimatedLines.value, nonInputBefore)
  const queuePosition = nonInputBefore - completedBefore

  return queuePosition * props.typewriterStagger
}

const finishTyping = () => {
  if (!isTyping.value) return
  isTyping.value = false
  completedAnimatedLines.value = totalAnimatedLines.value
  emit('typing-complete')
  focusInput()
}

const handleLineComplete = (index) => {
  if (!shouldAnimateLine(index)) return
  completedAnimatedLines.value = Math.min(
    completedAnimatedLines.value + 1,
    totalAnimatedLines.value
  )
  if (completedAnimatedLines.value >= totalAnimatedLines.value) {
    finishTyping()
  }
}

const shouldAnimateLine = (index) => {
  if (!props.autoType) return false
  if (index >= initialRenderCount.value) return false
  return props.lines[index]?.type !== 'input'
}

const shouldShowCursor = (index) => shouldAnimateLine(index) && index === lastAnimatedIndex.value && isTyping.value

const startTyping = () => {
  initialRenderCount.value = props.lines.length
  completedAnimatedLines.value = 0
  isTyping.value = props.autoType && totalAnimatedLines.value > 0
  if (!isTyping.value) {
    focusInput()
    if (props.autoType) {
      emit('typing-complete')
    }
  }
  scrollToBottom()
}

// Initialize on mount
onMounted(() => {
  startTyping()
  if (!props.autoType) {
    finishTyping()
  }
})

watch(
  () => props.lines.length,
  (newLength) => {
    if (newLength > initialRenderCount.value) {
      initialRenderCount.value = newLength
    } else if (newLength < initialRenderCount.value) {
      initialRenderCount.value = newLength
      completedAnimatedLines.value = Math.min(
        completedAnimatedLines.value,
        totalAnimatedLines.value
      )
    }

    nextTick(() => {
      if (props.autoType && totalAnimatedLines.value > completedAnimatedLines.value) {
        isTyping.value = true
      } else if (!isTyping.value) {
        focusInput()
      }
      scrollToBottom()
    })
  }
)

watch(
  () => props.interactive,
  (value) => {
    if (value && !isTyping.value) {
      focusInput()
    }
  }
)

watch(
  () => isTyping.value,
  (typing) => {
    if (!typing) {
      focusInput()
    }
  }
)

defineExpose({ scrollToBottom, startTyping, focusInput, finishTyping })
</script>

<style scoped>
.tui-terminal-typewriter {
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
