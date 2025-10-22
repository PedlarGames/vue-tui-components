<template>
  <div 
    class="tui-timeline"
    :class="orientation"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="timeline-item"
      :class="{ active: item.active }"
    >
      <div class="timeline-marker">
        <div class="timeline-dot">
          <span v-if="item.icon">{{ item.icon }}</span>
        </div>
        <div v-if="index < items.length - 1" class="timeline-line"></div>
      </div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h4 v-if="item.title" class="timeline-title">{{ item.title }}</h4>
          <span v-if="item.timestamp" class="timeline-timestamp">{{ item.timestamp }}</span>
        </div>
        <div v-if="item.description" class="timeline-description">
          {{ item.description }}
        </div>
        <div v-if="$slots[`item-${index}`]" class="timeline-slot">
          <slot :name="`item-${index}`" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(item => 
        typeof item === 'object' && 
        (item.title || item.description)
      )
    }
  },
  orientation: {
    type: String,
    default: 'vertical',
    validator: (value) => ['vertical', 'horizontal'].includes(value)
  }
})
</script>

<style scoped>
.tui-timeline {
  display: flex;
  font-family: var(--tui-font);
}

.tui-timeline.vertical {
  flex-direction: column;
  gap: 2rem;
}

.tui-timeline.horizontal {
  flex-direction: row;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

/* Timeline Item */
.timeline-item {
  display: flex;
  position: relative;
}

.tui-timeline.vertical .timeline-item {
  flex-direction: row;
  gap: 1.5rem;
}

.tui-timeline.horizontal .timeline-item {
  flex-direction: column;
  gap: 1rem;
  min-width: 200px;
}

/* Marker */
.timeline-marker {
  display: flex;
  align-items: flex-start;
  position: relative;
  flex-shrink: 0;
}

.tui-timeline.vertical .timeline-marker {
  flex-direction: column;
  align-items: center;
}

.tui-timeline.horizontal .timeline-marker {
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--tui-glow);
  z-index: 1;
  font-size: 0.9rem;
}

.timeline-item.active .timeline-dot {
  background: var(--tui-primary);
  color: var(--tui-bg);
  box-shadow: var(--tui-glow-hover);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.timeline-line {
  background: var(--tui-border);
  box-shadow: var(--tui-glow);
}

.tui-timeline.vertical .timeline-line {
  width: 2px;
  flex: 1;
  min-height: 2rem;
}

.tui-timeline.horizontal .timeline-line {
  height: 2px;
  flex: 1;
  min-width: 2rem;
}

/* Content */
.timeline-content {
  flex: 1;
  padding-top: 0.25rem;
}

.tui-timeline.horizontal .timeline-content {
  padding-top: 0;
}

.timeline-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.tui-timeline.horizontal .timeline-header {
  align-items: center;
  text-align: center;
}

.timeline-title {
  margin: 0;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--tui-primary);
  text-shadow: var(--tui-glow);
}

.timeline-timestamp {
  font-size: 0.8rem;
  color: var(--tui-text);
  opacity: 0.7;
  letter-spacing: 0.5px;
}

.timeline-description {
  font-size: 0.9rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

.tui-timeline.horizontal .timeline-description {
  text-align: center;
}

.timeline-slot {
  margin-top: 0.5rem;
}

/* Scrollbar for horizontal timeline */
.tui-timeline.horizontal::-webkit-scrollbar {
  height: 8px;
}

.tui-timeline.horizontal::-webkit-scrollbar-track {
  background: var(--tui-bg-light);
  border: 1px solid var(--tui-border);
}

.tui-timeline.horizontal::-webkit-scrollbar-thumb {
  background: var(--tui-primary);
  box-shadow: var(--tui-glow);
}
</style>
