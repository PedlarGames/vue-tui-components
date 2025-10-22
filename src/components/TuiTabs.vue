<template>
  <div class="tui-tabs">
    <div class="tabs-header">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
        @click="setActiveTab(tab.id)"
      >
        <span class="tab-bracket">[</span>
        {{ tab.label }}
        <span class="tab-bracket">]</span>
      </button>
    </div>
    <div class="tabs-content">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  defaultTab: {
    type: String,
    default: ''
  }
})

const activeTab = ref(props.defaultTab || props.tabs[0]?.id)

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}
</script>

<style scoped>
.tui-tabs {
  border: 2px solid var(--tui-border);
  margin-bottom: 1.5rem;
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid var(--tui-border);
  background: var(--tui-bg);
}

.tab-button {
  flex: 1;
  background: transparent;
  border: none;
  border-right: 2px solid var(--tui-border);
  color: var(--tui-text);
  font-family: var(--tui-font);
  font-size: 1rem;
  padding: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.tab-button:last-child {
  border-right: none;
}

.tab-button:hover {
  opacity: 0.8;
  background: var(--tui-primary-transparent-5);
}

.tab-button.active {
  opacity: 1;
  background: var(--tui-bg-light);
  box-shadow: inset 0 0 10px var(--tui-primary-transparent-20);
}

.tab-bracket {
  color: var(--tui-primary);
  font-weight: bold;
}

.tabs-content {
  padding: 1.5rem;
  background: var(--tui-bg-light);
}
</style>
