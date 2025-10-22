<template>
  <button 
    class="tui-button" 
    :class="[variant, { disabled, pulse }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span class="button-brackets">[</span>
    <span class="button-text">{{ label }}</span>
    <span class="button-brackets">]</span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'warning', 'info', 'success', 'secondary', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  pulse: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.tui-button {
  font-family: var(--tui-font);
  font-size: 1rem;
  color: var(--tui-text);
  background: transparent;
  border: 2px solid var(--tui-border);
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: var(--tui-glow);
}

.tui-button:hover:not(.disabled) {
  background: var(--tui-primary);
  color: var(--tui-bg);
  box-shadow: var(--tui-glow-hover);
  transform: scale(1.05);
}

.tui-button:active:not(.disabled) {
  transform: scale(0.98);
}

.tui-button.secondary {
  border-color: var(--tui-secondary);
  color: var(--tui-secondary);
}

.tui-button.secondary:hover:not(.disabled) {
  background: var(--tui-secondary);
  color: var(--tui-bg);
  box-shadow: var(--tui-glow-secondary-hover);
}

.tui-button.danger {
  border-color: var(--tui-error);
  color: var(--tui-error);
  box-shadow: var(--tui-glow-error);
}

.tui-button.danger:hover:not(.disabled) {
  background: var(--tui-error);
  color: var(--tui-bg);
  box-shadow: var(--tui-glow-error-hover);
}

.tui-button.info {
  border-color: var(--tui-info);
  color: var(--tui-info);
  box-shadow: var(--tui-glow-info);
}

.tui-button.info:hover:not(.disabled) {
  background: var(--tui-info);
  color: var(--tui-bg);
  box-shadow: var(--tui-glow-info-hover);
}

.tui-button.success {
  border-color: var(--tui-success);
  color: var(--tui-success);
  box-shadow: var(--tui-glow-success);
}

.tui-button.success:hover:not(.disabled) {
  background: var(--tui-success);
  color: var(--tui-bg);
  box-shadow: var(--tui-glow-success-hover);
}

.tui-button.warning {
  border-color: var(--tui-warning);
  color: var(--tui-warning);
  box-shadow: var(--tui-glow-warning);
}

.tui-button.warning:hover:not(.disabled) {
  background: var(--tui-warning);
  color: var(--tui-bg);
  box-shadow: var(--tui-glow-warning-hover);
}

.tui-button.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  box-shadow: none;
}

.button-brackets {
  font-weight: bold;
  margin: 0 0.25rem;
}

/* Pulse Animation */
.tui-button.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 5px var(--tui-primary-transparent-30), 0 0 10px var(--tui-primary-transparent-20);
  }
  50% {
    box-shadow: 0 0 15px var(--tui-primary-transparent-30), 0 0 25px var(--tui-primary-transparent-20), 0 0 35px var(--tui-primary-transparent-10);
  }
}

.tui-button.secondary.pulse {
  animation: pulse-secondary 2s infinite;
}

@keyframes pulse-secondary {
  0%, 100% {
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.3), 0 0 10px rgba(128, 128, 128, 0.2);
  }
  50% {
    box-shadow: 0 0 15px rgba(128, 128, 128, 0.3), 0 0 25px rgba(128, 128, 128, 0.2), 0 0 35px rgba(128, 128, 128, 0.1);
  }
}

.tui-button.danger.pulse {
  animation: pulse-danger 2s infinite;
}

@keyframes pulse-danger {
  0%, 100% {
    box-shadow: 0 0 5px var(--tui-error-transparent-30), 0 0 10px var(--tui-error-transparent-20);
  }
  50% {
    box-shadow: 0 0 15px var(--tui-error-transparent-30), 0 0 25px var(--tui-error-transparent-20), 0 0 35px rgba(255, 51, 51, 0.1);
  }
}
</style>
