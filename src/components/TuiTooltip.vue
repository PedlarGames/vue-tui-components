<template>
  <div 
    class="tui-tooltip-wrapper"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
    <slot></slot>
    <Transition name="tooltip-fade">
      <div 
        v-if="visible"
        class="tui-tooltip"
        :class="[position, { rich }]"
        role="tooltip"
        :aria-label="text"
      >
        <div class="tooltip-content">
          <span v-if="!rich">{{ text }}</span>
          <div v-else v-html="text"></div>
        </div>
        <div class="tooltip-arrow"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  rich: {
    type: Boolean,
    default: false
  },
  delay: {
    type: Number,
    default: 200
  }
})

const visible = ref(false)
let timeoutId = null

const showTooltip = () => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    visible.value = true
  }, props.delay)
}

const hideTooltip = () => {
  clearTimeout(timeoutId)
  visible.value = false
}
</script>

<style scoped>
.tui-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tui-tooltip {
  position: absolute;
  z-index: 10000;
  background: var(--tui-bg-light);
  border: 2px solid var(--tui-border);
  padding: 0.5rem 0.75rem;
  white-space: nowrap;
  box-shadow: var(--tui-glow);
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.tui-tooltip.rich {
  white-space: normal;
  max-width: 250px;
}

.tooltip-content {
  position: relative;
  z-index: 1;
}

.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--tui-bg-light);
  border: 2px solid var(--tui-border);
  transform: rotate(45deg);
  z-index: 0;
}

/* Position: Top */
.tui-tooltip.top {
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
}

.tui-tooltip.top .tooltip-arrow {
  bottom: -5px;
  left: 50%;
  margin-left: -5px;
  border-top: none;
  border-left: none;
}

/* Position: Bottom */
.tui-tooltip.bottom {
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
}

.tui-tooltip.bottom .tooltip-arrow {
  top: -5px;
  left: 50%;
  margin-left: -5px;
  border-bottom: none;
  border-right: none;
}

/* Position: Left */
.tui-tooltip.left {
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
}

.tui-tooltip.left .tooltip-arrow {
  right: -5px;
  top: 50%;
  margin-top: -5px;
  border-left: none;
  border-bottom: none;
}

/* Position: Right */
.tui-tooltip.right {
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
}

.tui-tooltip.right .tooltip-arrow {
  left: -5px;
  top: 50%;
  margin-top: -5px;
  border-right: none;
  border-top: none;
}

/* Fade Animation */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

.tooltip-fade-enter-from.top,
.tooltip-fade-leave-to.top {
  transform: translateX(-50%) translateY(5px);
}

.tooltip-fade-enter-from.bottom,
.tooltip-fade-leave-to.bottom {
  transform: translateX(-50%) translateY(-5px);
}

.tooltip-fade-enter-from.left,
.tooltip-fade-leave-to.left {
  transform: translateY(-50%) translateX(5px);
}

.tooltip-fade-enter-from.right,
.tooltip-fade-leave-to.right {
  transform: translateY(-50%) translateX(-5px);
}
</style>
