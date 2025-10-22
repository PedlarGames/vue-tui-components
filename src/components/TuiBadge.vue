<template>
  <span 
    class="tui-badge-wrapper"
    :class="{ standalone: !hasDefaultSlot }"
  >
    <slot></slot>
    <span 
      v-if="visible"
      class="tui-badge"
      :class="[variant, size, placement, { dot }]"
      :aria-label="ariaLabel"
    >
      <span v-if="!dot" class="badge-content">
        <span v-if="icon">{{ icon }}</span>
        <span v-else-if="content">{{ displayContent }}</span>
      </span>
    </span>
  </span>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  content: {
    type: [String, Number],
    default: ''
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
  placement: {
    type: String,
    default: 'top-right',
    validator: (value) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value)
  },
  max: {
    type: Number,
    default: 99
  },
  dot: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: true
  }
})

const slots = useSlots()

const hasDefaultSlot = computed(() => {
  return Boolean(slots.default)
})

const displayContent = computed(() => {
  if (typeof props.content === 'number' && props.content > props.max) {
    return `${props.max}+`
  }
  return props.content
})

const ariaLabel = computed(() => {
  if (props.dot) return 'Notification indicator'
  if (props.icon) return `Badge with icon: ${props.icon}`
  return `Badge: ${displayContent.value}`
})
</script>

<style scoped>
.tui-badge-wrapper {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

.tui-badge-wrapper.standalone {
  display: inline-block;
}

.tui-badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tui-primary);
  color: var(--tui-bg);
  font-family: var(--tui-font);
  font-weight: bold;
  border: 2px solid var(--tui-bg);
  box-shadow: var(--tui-glow);
  white-space: nowrap;
  line-height: 1;
  z-index: 1;
}

.tui-badge-wrapper.standalone .tui-badge {
  position: static;
}

/* Sizes */
.tui-badge.small {
  font-size: 0.7rem;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
}

.tui-badge.medium {
  font-size: 0.8rem;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
}

.tui-badge.large {
  font-size: 0.9rem;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
}

/* Dot variant */
.tui-badge.dot {
  min-width: 8px;
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 50%;
}

.tui-badge.dot.medium {
  width: 10px;
  height: 10px;
}

.tui-badge.dot.large {
  width: 12px;
  height: 12px;
}

/* Placements */
.tui-badge.top-right {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

.tui-badge.top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.tui-badge.bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.tui-badge.bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

/* Variants */
.tui-badge.secondary {
  background: var(--tui-secondary);
  box-shadow: var(--tui-glow-secondary);
}

.tui-badge.success {
  background: var(--tui-success);
  box-shadow: var(--tui-glow-success);
}

.tui-badge.error {
  background: var(--tui-error);
  box-shadow: var(--tui-glow-error);
}

.tui-badge.warning {
  background: var(--tui-warning);
  box-shadow: var(--tui-glow-warning);
}

.tui-badge.info {
  background: var(--tui-info);
  box-shadow: var(--tui-glow-info);
}

.badge-content {
  display: flex;
  align-items: center;
  gap: 2px;
}
</style>
