<template>
  <Transition :name="transitionName">
    <div
      v-if="visible"
      class="tui-toast"
      :class="toastClasses"
      :style="toastStyle"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
    >
      <div class="toast-header">
        <span class="toast-icon">{{ iconMap[severity] }}</span>
        <span class="toast-title">{{ title || severityTitles[severity] }}</span>
        <button
          v-if="dismissable"
          class="toast-close"
          @click="close"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div v-if="message" class="toast-message">
        {{ message }}
      </div>
      <div v-if="showProgress && duration > 0" class="toast-progress">
        <div class="toast-progress-bar" :style="progressStyle"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ].includes(value)
  },
  duration: {
    type: Number,
    default: 5000 // milliseconds, 0 = no auto-close
  },
  dismissable: {
    type: Boolean,
    default: true
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  glow: {
    type: Boolean,
    default: true
  },
  sound: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'closed'])

const visible = ref(false)
const progress = ref(100)
const isPaused = ref(false)
let timerId = null
let progressTimerId = null
let startTime = null
let remainingTime = props.duration

const iconMap = {
  success: '✓',
  error: '✗',
  warning: '!',
  info: 'i'
}

const severityTitles = {
  success: 'SUCCESS',
  error: 'ERROR',
  warning: 'WARNING',
  info: 'INFORMATION'
}

const toastClasses = computed(() => ({
  [`toast-${props.severity}`]: true,
  [`toast-${props.position}`]: true,
  'toast-glow': props.glow,
  'toast-dismissable': props.dismissable
}))

const toastStyle = computed(() => {
  // Positioning is now handled by the container in useToast.js
  // Individual toasts don't need position styling
  return {}
})

const progressStyle = computed(() => ({
  width: `${progress.value}%`
}))

const transitionName = computed(() => {
  const [vertical] = props.position.split('-')
  return vertical === 'top' ? 'toast-slide-down' : 'toast-slide-up'
})

const startProgressTimer = () => {
  if (props.duration <= 0 || !props.showProgress) return
  
  const interval = 50 // Update every 50ms
  const totalSteps = props.duration / interval
  let step = 0
  
  progressTimerId = setInterval(() => {
    if (!isPaused.value) {
      step++
      progress.value = 100 - (step / totalSteps) * 100
      
      if (progress.value <= 0) {
        clearInterval(progressTimerId)
      }
    }
  }, interval)
}

const startTimer = () => {
  if (props.duration <= 0) return
  
  startTime = Date.now()
  timerId = setTimeout(() => {
    close()
  }, remainingTime)
}

const pauseTimer = () => {
  if (props.duration <= 0) return
  
  isPaused.value = true
  if (timerId) {
    clearTimeout(timerId)
    const elapsed = Date.now() - startTime
    remainingTime -= elapsed
  }
}

const resumeTimer = () => {
  if (props.duration <= 0) return
  
  isPaused.value = false
  startTimer()
}

const close = () => {
  visible.value = false
  emit('close')
  
  // Wait for transition to complete before emitting closed
  setTimeout(() => {
    emit('closed')
  }, 300)
}

const show = () => {
  visible.value = true
  if (props.duration > 0) {
    startTimer()
    startProgressTimer()
  }
}

// Auto-show on mount
onMounted(() => {
  // Small delay for transition
  setTimeout(() => {
    show()
  }, 10)
})

onUnmounted(() => {
  if (timerId) clearTimeout(timerId)
  if (progressTimerId) clearInterval(progressTimerId)
})

// Watch for duration changes (if toast is reused)
watch(() => props.duration, (newDuration) => {
  if (timerId) clearTimeout(timerId)
  if (progressTimerId) clearInterval(progressTimerId)
  remainingTime = newDuration
  if (visible.value && newDuration > 0) {
    startTimer()
    startProgressTimer()
  }
})

defineExpose({ show, close })
</script>

<style scoped>
.tui-toast {
  position: relative;
  z-index: 10000;
  min-width: 300px;
  max-width: 500px;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  font-family: var(--tui-font);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  animation: toast-pulse 0.3s ease-out;
}

.toast-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--tui-border);
  background: var(--tui-bg);
}

.toast-icon {
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid currentColor;
  text-shadow: var(--tui-glow);
}

.toast-title {
  flex: 1;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.toast-close {
  background: transparent;
  border: 2px solid var(--tui-border);
  color: var(--tui-text);
  font-size: 1.5rem;
  line-height: 1;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  font-family: var(--tui-font);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.toast-close:hover {
  background: var(--tui-primary);
  color: var(--tui-bg);
  border-color: var(--tui-primary);
  box-shadow: 0 0 10px var(--tui-primary-transparent-30);
}

.toast-message {
  padding: 1rem;
  line-height: 1.5;
  color: var(--tui-text);
}

.toast-progress {
  height: 4px;
  background: var(--tui-bg);
  overflow: hidden;
}

.toast-progress-bar {
  height: 100%;
  transition: width 0.05s linear;
}

/* Severity Variants */
.toast-success {
  border-color: var(--tui-success);
}

.toast-success .toast-header {
  border-color: var(--tui-success);
}

.toast-success .toast-icon,
.toast-success .toast-title {
  color: var(--tui-success);
  text-shadow: var(--tui-glow-success);
}

.toast-success .toast-progress-bar {
  background: var(--tui-success);
  box-shadow: 0 0 10px var(--tui-success-transparent-30);
}

.toast-success.toast-glow {
  box-shadow: 0 0 15px var(--tui-success-transparent-20), 0 4px 12px rgba(0, 0, 0, 0.5);
}

.toast-error {
  border-color: var(--tui-error);
}

.toast-error .toast-header {
  border-color: var(--tui-error);
}

.toast-error .toast-icon,
.toast-error .toast-title {
  color: var(--tui-error);
  text-shadow: var(--tui-glow-error);
}

.toast-error .toast-progress-bar {
  background: var(--tui-error);
  box-shadow: 0 0 10px var(--tui-error-transparent-30);
}

.toast-error.toast-glow {
  box-shadow: 0 0 15px var(--tui-error-transparent-20), 0 4px 12px rgba(0, 0, 0, 0.5);
}

.toast-warning {
  border-color: var(--tui-warning);
}

.toast-warning .toast-header {
  border-color: var(--tui-warning);
}

.toast-warning .toast-icon,
.toast-warning .toast-title {
  color: var(--tui-warning);
  text-shadow: var(--tui-glow-warning);
}

.toast-warning .toast-progress-bar {
  background: var(--tui-warning);
  box-shadow: 0 0 10px var(--tui-warning-transparent-30);
}

.toast-warning.toast-glow {
  box-shadow: 0 0 15px var(--tui-warning-transparent-20), 0 4px 12px rgba(0, 0, 0, 0.5);
}

.toast-info {
  border-color: var(--tui-info);
}

.toast-info .toast-header {
  border-color: var(--tui-info);
}

.toast-info .toast-icon,
.toast-info .toast-title {
  color: var(--tui-info);
  text-shadow: var(--tui-glow-info);
}

.toast-info .toast-progress-bar {
  background: var(--tui-info);
  box-shadow: 0 0 10px var(--tui-info-transparent-30);
}

.toast-info.toast-glow {
  box-shadow: 0 0 15px var(--tui-info-transparent-20), 0 4px 12px rgba(0, 0, 0, 0.5);
}

/* Transitions */
.toast-slide-down-enter-active,
.toast-slide-down-leave-active,
.toast-slide-up-enter-active,
.toast-slide-up-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.toast-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.toast-slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Center position adjustment */
.toast-top-center.toast-slide-down-enter-from {
  transform: translateY(-100%);
}

.toast-bottom-center.toast-slide-up-enter-from {
  transform: translateY(100%);
}

.toast-top-center.toast-slide-down-leave-to {
  transform: translateY(-20px);
}

.toast-bottom-center.toast-slide-up-leave-to {
  transform: translateY(20px);
}

/* Pulse animation on appear */
@keyframes toast-pulse {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .tui-toast {
    min-width: 280px;
    max-width: calc(100vw - 2rem);
  }
}
</style>
