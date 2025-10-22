<template>
  <span 
    class="tui-icon"
    :class="[
      size, 
      variant, 
      { spin, pulse },
      materialIconClass
    ]"
    :style="customStyle"
    :aria-label="ariaLabel"
    :role="ariaLabel ? 'img' : undefined"
  >
    {{ icon }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'unicode',
    validator: (value) => ['unicode', 'material'].includes(value)
  },
  materialVariant: {
    type: String,
    default: 'outlined',
    validator: (value) => ['filled', 'outlined', 'round', 'sharp'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'inherit'].includes(value)
  },
  spin: {
    type: Boolean,
    default: false
  },
  pulse: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  customSize: {
    type: String,
    default: ''
  }
})

const materialIconClass = computed(() => {
  if (props.type === 'material') {
    const variantMap = {
      'filled': 'material-icons',
      'outlined': 'material-icons-outlined',
      'round': 'material-icons-round',
      'sharp': 'material-icons-sharp'
    }
    return variantMap[props.materialVariant]
  }
  return ''
})

const customStyle = computed(() => {
  if (props.customSize) {
    return { fontSize: props.customSize }
  }
  return {}
})
</script>

<style scoped>
.tui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--tui-font);
  line-height: 1;
  user-select: none;
  transition: all 0.3s ease;
}

/* Material Icons font family override */
.tui-icon.material-icons,
.tui-icon.material-icons-outlined,
.tui-icon.material-icons-round,
.tui-icon.material-icons-sharp {
  font-family: 'Material Icons', 'Material Icons Outlined', 'Material Icons Round', 'Material Icons Sharp';
  font-weight: normal;
  font-style: normal;
  display: inline-flex;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

/* Sizes */
.tui-icon.small {
  font-size: 1rem;
}

.tui-icon.medium {
  font-size: 1.5rem;
}

.tui-icon.large {
  font-size: 2rem;
}

.tui-icon.xlarge {
  font-size: 3rem;
}

/* Variants */
.tui-icon.primary {
  color: var(--tui-primary);
  text-shadow: var(--tui-glow);
}

.tui-icon.secondary {
  color: var(--tui-secondary);
  text-shadow: var(--tui-glow-secondary);
}

.tui-icon.success {
  color: var(--tui-success);
  text-shadow: var(--tui-glow-success);
}

.tui-icon.error {
  color: var(--tui-error);
  text-shadow: var(--tui-glow-error);
}

.tui-icon.warning {
  color: var(--tui-warning);
  text-shadow: var(--tui-glow-warning);
}

.tui-icon.info {
  color: var(--tui-info);
  text-shadow: var(--tui-glow-info);
}

.tui-icon.inherit {
  color: inherit;
}

/* Animations */
.tui-icon.spin {
  animation: icon-spin 2s linear infinite;
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.tui-icon.pulse {
  animation: icon-pulse 2s ease-in-out infinite;
}

@keyframes icon-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}
</style>
