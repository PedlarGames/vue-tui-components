<template>
  <div 
    class="tui-slider"
    :class="[orientation, { 'show-tooltip': showTooltip }]"
  >
    <label v-if="label" class="slider-label">{{ label }}</label>
    <div class="slider-container">
      <span v-if="showValue && orientation === 'horizontal'" class="slider-value-label min-label">
        {{ min }}
      </span>
      <div 
        class="slider-track-wrapper"
        :class="orientation"
        @click="handleTrackClick"
        ref="trackRef"
      >
        <div class="slider-track">
          <div 
            class="slider-fill"
            :style="fillStyle"
          ></div>
          <div 
            class="slider-thumb"
            :style="thumbStyle"
            @mousedown="handleMouseDown"
            @touchstart="handleTouchStart"
            tabindex="0"
            role="slider"
            :aria-valuenow="modelValue"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :aria-label="label || 'Slider'"
            @keydown="handleKeyDown"
          >
            <Transition name="tooltip-fade">
              <div v-if="showTooltip && isDragging" class="slider-tooltip">
                {{ modelValue }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <span v-if="showValue && orientation === 'horizontal'" class="slider-value-label max-label">
        {{ max }}
      </span>
    </div>
    <div v-if="showValue && orientation === 'horizontal'" class="slider-current-value">
      {{ prefix }}{{ modelValue }}{{ suffix }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 50
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  showValue: {
    type: Boolean,
    default: true
  },
  showTooltip: {
    type: Boolean,
    default: true
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const trackRef = ref(null)
const isDragging = ref(false)

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const fillStyle = computed(() => {
  if (props.orientation === 'horizontal') {
    return { width: `${percentage.value}%` }
  } else {
    return { height: `${percentage.value}%` }
  }
})

const thumbStyle = computed(() => {
  if (props.orientation === 'horizontal') {
    return { left: `${percentage.value}%` }
  } else {
    return { bottom: `${percentage.value}%` }
  }
})

const updateValue = (clientX, clientY) => {
  if (!trackRef.value) return
  
  const rect = trackRef.value.getBoundingClientRect()
  let percentage
  
  if (props.orientation === 'horizontal') {
    percentage = (clientX - rect.left) / rect.width
  } else {
    percentage = (rect.bottom - clientY) / rect.height
  }
  
  percentage = Math.max(0, Math.min(1, percentage))
  
  const rawValue = props.min + percentage * (props.max - props.min)
  const steppedValue = Math.round(rawValue / props.step) * props.step
  const clampedValue = Math.max(props.min, Math.min(props.max, steppedValue))
  
  emit('update:modelValue', clampedValue)
}

const handleTrackClick = (event) => {
  updateValue(event.clientX, event.clientY)
  emit('change', props.modelValue)
}

const handleMouseDown = (event) => {
  event.preventDefault()
  isDragging.value = true
  
  const handleMouseMove = (e) => {
    updateValue(e.clientX, e.clientY)
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
    emit('change', props.modelValue)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleTouchStart = (event) => {
  event.preventDefault()
  isDragging.value = true
  
  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    updateValue(touch.clientX, touch.clientY)
  }
  
  const handleTouchEnd = () => {
    isDragging.value = false
    emit('change', props.modelValue)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }
  
  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
}

const handleKeyDown = (event) => {
  let newValue = props.modelValue
  
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    event.preventDefault()
    newValue = Math.min(props.max, props.modelValue + props.step)
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    event.preventDefault()
    newValue = Math.max(props.min, props.modelValue - props.step)
  } else if (event.key === 'Home') {
    event.preventDefault()
    newValue = props.min
  } else if (event.key === 'End') {
    event.preventDefault()
    newValue = props.max
  }
  
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<style scoped>
.tui-slider {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--tui-font);
}

.slider-label {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slider-value-label {
  font-size: 0.9rem;
  min-width: 2rem;
  text-align: center;
}

.slider-track-wrapper {
  flex: 1;
  padding: 0.5rem 0;
  cursor: pointer;
}

.slider-track-wrapper.vertical {
  height: 200px;
  width: auto;
  padding: 0 0.5rem;
}

.slider-track {
  position: relative;
  background: var(--tui-bg-light);
  border: 2px solid var(--tui-border);
  height: 8px;
}

.slider-track-wrapper.vertical .slider-track {
  width: 8px;
  height: 100%;
}

.slider-fill {
  position: absolute;
  background: var(--tui-primary);
  height: 100%;
  box-shadow: var(--tui-glow);
  transition: width 0.1s ease, height 0.1s ease;
}

.slider-track-wrapper.vertical .slider-fill {
  bottom: 0;
  width: 100%;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: var(--tui-primary);
  border: 2px solid var(--tui-border);
  cursor: grab;
  transition: box-shadow 0.3s ease, transform 0.1s ease;
  box-shadow: var(--tui-glow);
}

.slider-track-wrapper.vertical .slider-thumb {
  left: 50%;
  top: auto;
  transform: translate(-50%, 50%);
}

.slider-thumb:hover,
.slider-thumb:focus {
  box-shadow: var(--tui-glow-hover);
  outline: none;
}

.slider-thumb:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.1);
}

.slider-track-wrapper.vertical .slider-thumb:active {
  transform: translate(-50%, 50%) scale(1.1);
}

.slider-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--tui-bg-light);
  border: 2px solid var(--tui-border);
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  box-shadow: var(--tui-glow);
  font-size: 0.9rem;
  pointer-events: none;
}

.slider-track-wrapper.vertical .slider-tooltip {
  bottom: auto;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
}

.slider-current-value {
  text-align: center;
  font-size: 1.1rem;
  color: var(--tui-primary);
  text-shadow: var(--tui-glow);
  letter-spacing: 2px;
}

.tui-slider.vertical .slider-container {
  flex-direction: column;
}

.tui-slider.vertical .slider-value-label {
  min-width: auto;
}

/* Tooltip fade animation */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}
</style>
