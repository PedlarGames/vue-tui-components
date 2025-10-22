<template>
  <div class="tui-progress-wrapper">
    <div class="progress-header" v-if="label">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-value">{{ value }}%</span>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: value + '%' }">
        <div class="progress-fill" :class="{ 'animated': animated }"></div>
      </div>
      <div class="progress-segments">
        <span v-for="i in 20" :key="i" class="segment"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
    validator: (val) => val >= 0 && val <= 100
  },
  label: {
    type: String,
    default: ''
  },
  animated: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.tui-progress-wrapper {
  margin-bottom: 1.5rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.progress-value {
  color: var(--tui-primary);
  font-weight: bold;
  text-shadow: var(--tui-glow);
}

.progress-bar-container {
  position: relative;
  height: 30px;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  overflow: hidden;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--tui-primary);
  transition: width 0.5s ease;
  box-shadow: 0 0 10px var(--tui-primary);
}

.progress-fill {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.2) 10px,
    rgba(0, 0, 0, 0.2) 20px
  );
}

.progress-fill.animated {
  animation: scroll 1s linear infinite;
}

@keyframes scroll {
  0% { background-position: 0 0; }
  100% { background-position: 20px 0; }
}

.progress-segments {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.segment {
  width: 1px;
  height: 100%;
  background: var(--tui-primary-transparent-20);
}
</style>
