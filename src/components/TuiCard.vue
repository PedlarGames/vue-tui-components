<template>
  <div 
    class="tui-card" 
    :class="{ 
      glowing, 
      'animate-fade-in': fadeIn,
      'animate-slide-in': slideIn,
      'minimized': isMinimized
    }"
    :style="animationStyle"
  >
    <div class="card-header" v-if="title || minimizable">
      <h3 class="card-title" v-if="title">{{ title }}</h3>
      <button 
        v-if="minimizable"
        class="minimize-button"
        type="button"
        @click="toggleMinimize"
        :title="isMinimized ? 'Expand' : 'Minimize'"
        :aria-expanded="(!isMinimized).toString()"
        :aria-label="isMinimized ? 'Expand card' : 'Minimize card'"
      >
        {{ isMinimized ? '▼' : '▲' }}
      </button>
    </div>
    <div 
      class="card-content" 
      :class="{ collapsed: isMinimized }"
      :aria-hidden="isMinimized ? 'true' : 'false'"
    >
      <div class="card-body">
        <slot></slot>
      </div>
      <div 
        v-if="hasFooterSlot"
        class="card-footer"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  glowing: {
    type: Boolean,
    default: false
  },
  fadeIn: {
    type: Boolean,
    default: false
  },
  slideIn: {
    type: Boolean,
    default: false
  },
  animationDelay: {
    type: Number,
    default: 0
  },
  animationDuration: {
    type: Number,
    default: 500
  },
  minimizable: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots()
const hasFooterSlot = computed(() => {
  const footer = slots.footer?.()
  if (Array.isArray(footer)) {
    return footer.length > 0
  }
  return Boolean(footer)
})

const isMinimized = ref(false)

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}

const animationStyle = computed(() => {
  if (!props.fadeIn && !props.slideIn) return {}
  
  return {
    animationDelay: `${props.animationDelay}ms`,
    animationDuration: `${props.animationDuration}ms`
  }
})
</script>

<style scoped>
.tui-card {
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  margin-bottom: 1.5rem;
  position: relative;
  overflow: visible;
  transition: all 0.3s ease;
}

.tui-card.glowing {
  box-shadow: var(--tui-glow);
}

.card-header {
  border-bottom: 2px solid var(--tui-border);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-line {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}

.corner {
  color: var(--tui-primary);
  font-size: 1.2rem;
}

.line {
  flex: 1;
  height: 2px;
  background: var(--tui-border);
  margin: 0 0.5rem;
}

.card-title {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: var(--tui-glow);
  flex: 1;
  background: var(--tui-primary-transparent-5)
}

.minimize-button {
  background: none;
  border: none;
  color: var(--tui-primary);
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-shadow: var(--tui-glow);
  transition: all 0.3s ease;
  font-family: inherit;
  margin-left: auto;
}

.minimize-button:hover {
  color: var(--tui-text);
  transform: scale(1.2);
}

.minimize-button:active {
  transform: scale(0.95);
}

.card-content {
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: 9999px;
}

.card-content:not(.collapsed) {
  overflow: visible;
}

.card-content.collapsed {
  max-height: 0;
}

.card-body {
  padding: 1.5rem;
  transition: opacity 0.3s ease, transform 0.3s ease, padding 0.3s ease;
  transform-origin: top;
}

.card-footer {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-top: 2px solid var(--tui-border);
  transition: opacity 0.3s ease, transform 0.3s ease, padding 0.3s ease;
}

.card-content.collapsed .card-body,
.card-content.collapsed .card-footer {
  opacity: 0;
  transform: translateY(-10px);
  padding: 0;
  pointer-events: none;
}

.card-content.collapsed .card-footer {
  border-top-color: transparent;
}

.tui-card.minimized .card-header {
  border-bottom: none;
}

.tui-card.minimized {
  align-self: flex-start;
}

/* Animation: Fade In */
.animate-fade-in {
  animation: fadeIn forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Animation: Slide In */
.animate-slide-in {
  animation: slideIn forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
