<template>
  <div class="tui-menubar" :class="{ 'is-compact': compact }">
    <div class="menubar-inner">
      <div class="menubar-left">
        <TuiDropdown
          v-for="menu in menus"
          :key="menu.id"
          :items="menu.items"
          @item-click="handleMenuItemClick"
          class="menubar-item"
        >
          <template #trigger="{ isOpen }">
            <div class="menu-trigger" :class="{ 'is-open': isOpen }">
              <span class="menu-prompt">►</span>
              <span class="menu-label">{{ menu.label }}</span>
            </div>
          </template>
        </TuiDropdown>
      </div>
      
      <div class="menubar-right" v-if="$slots.right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import TuiDropdown from './TuiDropdown.vue'

const props = defineProps({
  menus: {
    type: Array,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['menu-item-click'])

const handleMenuItemClick = (item) => {
  emit('menu-item-click', item)
}
</script>

<style scoped>
.tui-menubar {
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  font-family: var(--tui-font);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.menubar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem;
}

.menubar-left {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.menubar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  padding-right: 0.5rem;
}

.menubar-item {
  position: relative;
}

.menu-trigger {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  user-select: none;
}

.menu-trigger:hover {
  background: var(--tui-bg);
  border-color: var(--tui-border);
}

.menu-trigger.is-open {
  background: var(--tui-bg);
  border-color: var(--tui-primary);
  box-shadow: 0 0 10px var(--tui-primary-transparent-20);
}

.menu-prompt {
  color: var(--tui-primary);
  margin-right: 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  text-shadow: var(--tui-glow);
  transition: transform 0.2s ease;
}

.menu-trigger.is-open .menu-prompt {
  transform: rotate(90deg);
}

.menu-label {
  color: var(--tui-text);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  font-weight: 500;
}

.tui-menubar.is-compact .menubar-inner {
  padding: 0.125rem;
}

.tui-menubar.is-compact .menu-trigger {
  padding: 0.375rem 0.75rem;
}

.tui-menubar.is-compact .menu-label {
  font-size: 0.85rem;
}

/* Responsive */
@media (max-width: 768px) {
  .menubar-inner {
    flex-wrap: wrap;
  }
  
  .menubar-left {
    flex-wrap: wrap;
  }
  
  .menubar-right {
    width: 100%;
    margin-top: 0.25rem;
    padding-top: 0.25rem;
    border-top: 1px solid var(--tui-border);
    justify-content: flex-end;
  }
}
</style>
