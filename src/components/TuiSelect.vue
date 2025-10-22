<template>
  <div class="tui-select-wrapper" ref="selectWrapper">
    <label v-if="label" class="tui-label">
      <span class="label-bracket">&gt;</span> {{ label }}
    </label>
    <div 
      class="select-container" 
      :class="{ 'is-open': isOpen }"
      @click="toggleDropdown"
      tabindex="0"
      @blur="closeDropdown"
      @keydown.escape="closeDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.up.prevent="navigateOptions(-1)"
      @keydown.down.prevent="navigateOptions(1)"
    >
      <span class="select-prompt">&gt;&gt;</span>
      <div class="select-display">
        {{ displayText }}
      </div>
      <span class="select-arrow" :class="{ 'is-open': isOpen }">▼</span>
    </div>
    
    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <div class="dropdown-inner">
          <div 
            v-for="(option, index) in options" 
            :key="option.value"
            class="dropdown-option"
            :class="{ 
              'is-selected': option.value === modelValue,
              'is-highlighted': index === highlightedIndex
            }"
            @click.stop="selectOption(option.value)"
            @mouseenter="highlightedIndex = index"
          >
            <span class="option-bracket">{{ option.value === modelValue ? '►' : ' ' }}</span>
            {{ option.label }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'SELECT OPTION'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const highlightedIndex = ref(-1)
const selectWrapper = ref(null)

const displayText = computed(() => {
  if (!props.modelValue) return props.placeholder
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    // Highlight the currently selected option
    const currentIndex = props.options.findIndex(opt => opt.value === props.modelValue)
    highlightedIndex.value = currentIndex >= 0 ? currentIndex : 0
  }
}

const closeDropdown = () => {
  isOpen.value = false
  highlightedIndex.value = -1
}

const selectOption = (value) => {
  emit('update:modelValue', value)
  closeDropdown()
}

const navigateOptions = (direction) => {
  if (!isOpen.value) {
    isOpen.value = true
    highlightedIndex.value = 0
    return
  }
  
  highlightedIndex.value += direction
  
  if (highlightedIndex.value < 0) {
    highlightedIndex.value = props.options.length - 1
  } else if (highlightedIndex.value >= props.options.length) {
    highlightedIndex.value = 0
  }
  
  // Select on keyboard navigation
  if (highlightedIndex.value >= 0 && highlightedIndex.value < props.options.length) {
    emit('update:modelValue', props.options[highlightedIndex.value].value)
  }
}

// Watch for value changes to update highlighted index
watch(() => props.modelValue, () => {
  if (isOpen.value) {
    const currentIndex = props.options.findIndex(opt => opt.value === props.modelValue)
    if (currentIndex >= 0) {
      highlightedIndex.value = currentIndex
    }
  }
})
</script>

<style scoped>
.tui-select-wrapper {
  margin-bottom: 1rem;
  position: relative;
}

.tui-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.label-bracket {
  color: var(--tui-primary);
  margin-right: 0.5rem;
  text-shadow: var(--tui-glow);
}

.select-container {
  display: flex;
  align-items: center;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  padding: 0.75rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.select-container:hover {
  border-color: var(--tui-primary);
  box-shadow: 0 0 10px var(--tui-primary-transparent-20);
}

.select-container.is-open {
  border-color: var(--tui-primary);
  box-shadow: 0 0 15px var(--tui-primary-transparent-30);
}

.select-container:focus {
  border-color: var(--tui-primary);
  box-shadow: 0 0 10px var(--tui-primary-transparent-20);
}

.select-prompt {
  color: var(--tui-primary);
  margin-right: 0.5rem;
  font-weight: bold;
  text-shadow: var(--tui-glow);
}

.select-display {
  flex: 1;
  color: var(--tui-text);
  font-family: var(--tui-font);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  user-select: none;
}

.select-arrow {
  color: var(--tui-primary);
  font-size: 0.8rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  text-shadow: var(--tui-glow);
}

.select-arrow.is-open {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  z-index: 1000;
  border: 2px solid var(--tui-primary);
  background: var(--tui-bg);
  box-shadow: 0 0 20px var(--tui-primary-transparent-30);
  max-height: 300px;
  overflow: hidden;
}

.dropdown-inner {
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--tui-primary) var(--tui-bg-light);
}

.dropdown-inner::-webkit-scrollbar {
  width: 8px;
}

.dropdown-inner::-webkit-scrollbar-track {
  background: var(--tui-bg-light);
}

.dropdown-inner::-webkit-scrollbar-thumb {
  background: var(--tui-primary);
  border: 1px solid var(--tui-bg);
}

.dropdown-inner::-webkit-scrollbar-thumb:hover {
  background: var(--tui-text);
}

.dropdown-option {
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: var(--tui-text);
  border-bottom: 1px solid var(--tui-border);
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  user-select: none;
}

.dropdown-option:last-child {
  border-bottom: none;
}

.dropdown-option:hover,
.dropdown-option.is-highlighted {
  background: var(--tui-secondary);
  color: var(--tui-bg);
  text-shadow: var(--tui-glow);
}

.dropdown-option.is-selected {
  background: var(--tui-primary-transparent-10);
  color: var(--tui-primary);
}

.dropdown-option.is-selected:hover,
.dropdown-option.is-selected.is-highlighted {
  background: var(--tui-primary-transparent-20);
}

.option-bracket {
  color: var(--tui-primary);
  margin-right: 0.5rem;
  font-weight: bold;
  width: 1rem;
  text-align: center;
  text-shadow: var(--tui-glow);
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
