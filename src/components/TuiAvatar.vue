<template>
  <div 
    class="tui-avatar"
    :class="[size, shape, { 'has-status': status }]"
    :aria-label="ariaLabel"
  >
    <img 
      v-if="src"
      :src="src"
      :alt="alt"
      class="avatar-image"
      @error="handleImageError"
    />
    <span v-else-if="initials" class="avatar-initials">
      {{ computedInitials }}
    </span>
    <span v-else-if="icon" class="avatar-icon">
      {{ icon }}
    </span>
    <span v-else class="avatar-placeholder">?</span>
    
    <span 
      v-if="status"
      class="avatar-status"
      :class="status"
      :aria-label="`Status: ${status}`"
    ></span>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Avatar'
  },
  initials: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'square'].includes(value)
  },
  status: {
    type: String,
    default: '',
    validator: (value) => !value || ['online', 'offline', 'away', 'busy'].includes(value)
  }
})

const imageError = ref(false)

const computedInitials = computed(() => {
  if (!props.initials) return ''
  return props.initials.slice(0, 2).toUpperCase()
})

const ariaLabel = computed(() => {
  if (props.alt !== 'Avatar') return props.alt
  if (props.initials) return `Avatar: ${props.initials}`
  if (props.icon) return `Avatar with icon: ${props.icon}`
  return 'Avatar'
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.tui-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--tui-bg-light);
  border: 2px solid var(--tui-border);
  color: var(--tui-primary);
  font-family: var(--tui-font);
  font-weight: bold;
  overflow: hidden;
  box-shadow: var(--tui-glow);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.tui-avatar:hover {
  box-shadow: var(--tui-glow-hover);
  transform: scale(1.05);
}

/* Sizes */
.tui-avatar.small {
  width: 32px;
  height: 32px;
  font-size: 0.8rem;
}

.tui-avatar.medium {
  width: 48px;
  height: 48px;
  font-size: 1rem;
}

.tui-avatar.large {
  width: 64px;
  height: 64px;
  font-size: 1.2rem;
}

.tui-avatar.xlarge {
  width: 96px;
  height: 96px;
  font-size: 1.5rem;
}

/* Shapes */
.tui-avatar.circle {
  border-radius: 50%;
}

.tui-avatar.square {
  border-radius: 0;
}

/* Content */
.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-initials,
.avatar-icon,
.avatar-placeholder {
  text-shadow: var(--tui-glow);
  user-select: none;
}

/* Status Indicator */
.avatar-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  min-width: 8px;
  min-height: 8px;
  border: 2px solid var(--tui-bg);
  border-radius: 50%;
  box-shadow: var(--tui-glow);
}

.avatar-status.online {
  background: var(--tui-success);
}

.avatar-status.offline {
  background: #666;
}

.avatar-status.away {
  background: var(--tui-warning);
}

.avatar-status.busy {
  background: var(--tui-error);
}

.tui-avatar.circle .avatar-status {
  transform: translate(25%, 25%);
}

.tui-avatar.square .avatar-status {
  transform: none;
}
</style>
