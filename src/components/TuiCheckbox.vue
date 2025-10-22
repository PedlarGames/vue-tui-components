<template>
  <label class="tui-checkbox">
    <input 
      type="checkbox" 
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox-input"
    />
    <span class="checkbox-box">
      <span class="checkbox-check" v-if="modelValue">✓</span>
      <span class="checkbox-empty" v-else>[ ]</span>
    </span>
    <span class="checkbox-label">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.tui-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  user-select: none;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-box {
  font-size: 1.2rem;
  color: var(--tui-primary);
  text-shadow: var(--tui-glow);
  transition: all 0.2s ease;
}

.checkbox-check {
  font-weight: bold;
}

.tui-checkbox:hover .checkbox-box {
  transform: scale(1.1);
  text-shadow: 0 0 10px var(--tui-primary), 0 0 20px var(--tui-primary);
}

.checkbox-label {
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
