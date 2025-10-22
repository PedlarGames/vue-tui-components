<template>
  <div class="tui-dropdown" ref="dropdownRef">
    <div
      class="dropdown-trigger"
      @click="toggleDropdown"
      @keydown.escape="closeDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.up.prevent="navigateItems(-1)"
      @keydown.down.prevent="navigateItems(1)"
      :tabindex="disabled ? -1 : 0"
      :class="{ 'is-open': isOpen, 'is-disabled': disabled }"
    >
      <slot name="trigger" :is-open="isOpen">
        <span class="default-trigger">{{ label }}</span>
      </slot>
    </div>

    <Teleport to="body">
      <Transition name="dropdown">
        <div
          v-if="isOpen"
          class="dropdown-menu"
          :style="dropdownStyle"
          ref="menuRef"
        >
          <div class="dropdown-inner">
            <div
              v-for="(item, index) in items"
              :key="item.id || index"
              class="dropdown-item"
              :class="{
                'is-highlighted': index === highlightedIndex,
                'is-disabled': item.disabled,
                'is-separator': item.separator,
                'has-submenu': item.submenu
              }"
              @click="!item.disabled && !item.separator && handleItemClick(item)"
              @mouseenter="highlightedIndex = index"
            >
              <template v-if="item.separator">
                <div class="dropdown-separator"></div>
              </template>
              <template v-else>
                <span class="item-icon" v-if="item.icon">{{ item.icon }}</span>
                <span class="item-label">{{ item.label }}</span>
                <span class="item-shortcut" v-if="item.shortcut">{{ item.shortcut }}</span>
                <span class="item-arrow" v-if="item.submenu">►</span>
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: 'left', // 'left' or 'right'
    validator: (value) => ['left', 'right'].includes(value)
  }
})

const emit = defineEmits(['item-click', 'open', 'close'])

const dropdownRef = ref(null)
const menuRef = ref(null)
const isOpen = ref(false)
const highlightedIndex = ref(-1)
const dropdownStyle = ref({})

const toggleDropdown = () => {
  if (props.disabled) return
  
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = async () => {
  if (props.disabled) return
  
  // Calculate initial position before opening to prevent jump
  if (dropdownRef.value) {
    const triggerRect = dropdownRef.value.querySelector('.dropdown-trigger').getBoundingClientRect()
    dropdownStyle.value = {
      position: 'fixed',
      top: `${triggerRect.bottom + 2}px`,
      left: `${triggerRect.left}px`,
      minWidth: `${triggerRect.width}px`,
      zIndex: 9999
    }
  }
  
  isOpen.value = true
  highlightedIndex.value = -1
  emit('open')
  
  await nextTick()
  // Refine position after render
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      calculatePosition()
    })
  })
  document.addEventListener('click', handleClickOutside)
}

const closeDropdown = () => {
  isOpen.value = false
  highlightedIndex.value = -1
  emit('close')
  document.removeEventListener('click', handleClickOutside)
}

const handleClickOutside = (event) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target) &&
    menuRef.value &&
    !menuRef.value.contains(event.target)
  ) {
    closeDropdown()
  }
}

const calculatePosition = () => {
  if (!dropdownRef.value || !menuRef.value) return
  
  const triggerRect = dropdownRef.value.querySelector('.dropdown-trigger').getBoundingClientRect()
  const menuRect = menuRef.value.getBoundingClientRect()
  
  // If menu hasn't rendered yet (width/height are 0), retry after a short delay
  if (menuRect.width === 0 || menuRect.height === 0) {
    requestAnimationFrame(() => calculatePosition())
    return
  }
  
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  let top = triggerRect.bottom + 2
  let left = triggerRect.left
  
  // Adjust horizontal position
  if (props.align === 'right') {
    left = triggerRect.right - menuRect.width
  }
  
  // Keep within viewport horizontally
  if (left + menuRect.width > viewportWidth) {
    left = viewportWidth - menuRect.width - 10
  }
  if (left < 10) {
    left = 10
  }
  
  // Keep within viewport vertically
  if (top + menuRect.height > viewportHeight) {
    // Open upwards if not enough space below
    top = triggerRect.top - menuRect.height - 2
    // If still not enough space, adjust to fit
    if (top < 10) {
      top = 10
    }
  }
  
  dropdownStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    minWidth: `${triggerRect.width}px`,
    zIndex: 9999
  }
}

const handleItemClick = (item) => {
  if (item.disabled || item.separator) return
  
  emit('item-click', item)
  
  if (item.action) {
    item.action()
  }
  
  // Close dropdown unless it's a submenu
  if (!item.submenu) {
    closeDropdown()
  }
}

const navigateItems = (direction) => {
  if (!isOpen.value) {
    openDropdown()
    return
  }
  
  let newIndex = highlightedIndex.value + direction
  
  // Skip separators and disabled items
  while (newIndex >= 0 && newIndex < props.items.length) {
    const item = props.items[newIndex]
    if (!item.separator && !item.disabled) {
      highlightedIndex.value = newIndex
      return
    }
    newIndex += direction
  }
  
  // Wrap around
  if (newIndex < 0) {
    highlightedIndex.value = props.items.length - 1
  } else if (newIndex >= props.items.length) {
    highlightedIndex.value = 0
  }
}

onMounted(() => {
  window.addEventListener('resize', calculatePosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', calculatePosition)
})

defineExpose({ open: openDropdown, close: closeDropdown, toggle: toggleDropdown })
</script>

<style scoped>
.tui-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
  outline: none;
  user-select: none;
}

.dropdown-trigger.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.default-trigger {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: var(--tui-text);
  font-family: var(--tui-font);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
}

/* Dropdown Menu */
.dropdown-menu {
  border: 2px solid var(--tui-primary);
  background: var(--tui-bg);
  box-shadow: 0 0 20px var(--tui-primary-transparent-30);
  max-height: 400px;
  overflow: hidden;
  min-width: 200px;
}

.dropdown-inner {
  max-height: 400px;
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

.dropdown-item {
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
  gap: 0.75rem;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover:not(.is-disabled):not(.is-separator),
.dropdown-item.is-highlighted:not(.is-disabled):not(.is-separator) {
  background: var(--tui-secondary);
  color: var(--tui-bg);
  text-shadow: var(--tui-glow);
}

.dropdown-item.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dropdown-item.is-separator {
  padding: 0;
  cursor: default;
}

.dropdown-separator {
  height: 1px;
  background: var(--tui-border);
  margin: 0.25rem 0;
}

.item-icon {
  color: var(--tui-primary);
  font-weight: bold;
  text-shadow: var(--tui-glow);
}

.item-label {
  flex: 1;
  white-space: nowrap;
}

.item-shortcut {
  font-size: 0.85rem;
  color: var(--tui-text-dim);
  margin-left: auto;
  padding-left: 1rem;
}

.item-arrow {
  color: var(--tui-primary);
  font-size: 0.8rem;
  margin-left: auto;
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
