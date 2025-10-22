<template>
  <div 
    class="tui-chip"
    :class="[variant, size, { closable }]"
  >
    <span v-if="icon" class="chip-icon">{{ icon }}</span>
    <span v-if="avatar" class="chip-avatar">
      <img v-if="avatarSrc" :src="avatarSrc" :alt="label" />
      <span v-else>{{ avatarText }}</span>
    </span>
    <span class="chip-label">{{ label }}</span>
    <button 
      v-if="closable"
      class="chip-close"
      type="button"
      @click="handleClose"
      aria-label="Remove chip"
    >
      ✕
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'error', 'warning', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  closable: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  avatar: {
    type: Boolean,
    default: false
  },
  avatarSrc: {
    type: String,
    default: ''
  },
  avatarText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const handleClose = (event) => {
  event.stopPropagation()
  emit('close')
}
</script>

<style scoped>
.tui-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--tui-primary-transparent-10);
  border: 2px solid var(--tui-primary);
  color: var(--tui-primary);
  padding: 0.25rem 0.75rem;
  font-family: var(--tui-font);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: var(--tui-glow);
  cursor: default;
}

.tui-chip:hover {
  background: var(--tui-primary-transparent-20);
  box-shadow: var(--tui-glow-hover);
}

/* Sizes */
.tui-chip.small {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  gap: 0.3rem;
}

.tui-chip.medium {
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  gap: 0.5rem;
}

.tui-chip.large {
  font-size: 1rem;
  padding: 0.4rem 1rem;
  gap: 0.6rem;
}

/* Variants */
.tui-chip.secondary {
  border-color: var(--tui-secondary);
  color: var(--tui-secondary);
  background: var(--tui-primary-transparent-10);
  box-shadow: var(--tui-glow-secondary);
}

.tui-chip.secondary:hover {
  background: var(--tui-primary-transparent-20);
  box-shadow: var(--tui-glow-secondary-hover);
}

.tui-chip.success {
  border-color: var(--tui-success);
  color: var(--tui-success);
  background: var(--tui-success-transparent-20);
  box-shadow: var(--tui-glow-success);
}

.tui-chip.success:hover {
  background: var(--tui-success-transparent-30);
  box-shadow: var(--tui-glow-success-hover);
}

.tui-chip.error {
  border-color: var(--tui-error);
  color: var(--tui-error);
  background: var(--tui-error-transparent-20);
  box-shadow: var(--tui-glow-error);
}

.tui-chip.error:hover {
  background: var(--tui-error-transparent-30);
  box-shadow: var(--tui-glow-error-hover);
}

.tui-chip.warning {
  border-color: var(--tui-warning);
  color: var(--tui-warning);
  background: var(--tui-warning-transparent-20);
  box-shadow: var(--tui-glow-warning);
}

.tui-chip.warning:hover {
  background: var(--tui-warning-transparent-30);
  box-shadow: var(--tui-glow-warning-hover);
}

.tui-chip.info {
  border-color: var(--tui-info);
  color: var(--tui-info);
  background: var(--tui-info-transparent-20);
  box-shadow: var(--tui-glow-info);
}

.tui-chip.info:hover {
  background: var(--tui-info-transparent-30);
  box-shadow: var(--tui-glow-info-hover);
}

/* Icon */
.chip-icon {
  font-size: 1em;
  line-height: 1;
}

/* Avatar */
.chip-avatar {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tui-bg-light);
  border: 1px solid currentColor;
  font-size: 0.8em;
}

.chip-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Close Button */
.chip-close {
  background: none;
  border: none;
  color: currentColor;
  font-size: 1em;
  cursor: pointer;
  padding: 0;
  width: 1.2em;
  height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-family: inherit;
  margin-left: 0.2rem;
  margin-right: -0.2rem;
}

.chip-close:hover {
  transform: scale(1.3) rotate(90deg);
  opacity: 0.7;
}

.chip-close:active {
  transform: scale(1.1) rotate(90deg);
}

.tui-chip.closable {
  padding-right: 0.5rem;
}
</style>
