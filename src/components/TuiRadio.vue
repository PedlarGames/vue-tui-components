<template>
  <div class="tui-radio-group">
    <label v-if="groupLabel" class="group-label">
      <span class="label-bracket">&gt;</span> {{ groupLabel }}
    </label>
    <label 
      v-for="option in options" 
      :key="option.value"
      class="tui-radio"
    >
      <input 
        type="radio" 
        :value="option.value"
        :checked="modelValue === option.value"
        @change="$emit('update:modelValue', option.value)"
        class="radio-input"
      />
      <span class="radio-circle">
        <span class="radio-dot" v-if="modelValue === option.value">●</span>
        <span class="radio-empty" v-else>○</span>
      </span>
      <span class="radio-label">{{ option.label }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  groupLabel: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.tui-radio-group {
  margin-bottom: 1rem;
}

.group-label {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.label-bracket {
  color: var(--tui-primary);
  margin-right: 0.5rem;
  text-shadow: var(--tui-glow);
}

.tui-radio {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  user-select: none;
}

.radio-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-circle {
  font-size: 1.2rem;
  color: var(--tui-primary);
  text-shadow: var(--tui-glow);
  transition: all 0.2s ease;
}

.tui-radio:hover .radio-circle {
  transform: scale(1.1);
  text-shadow: 0 0 10px var(--tui-primary), 0 0 20px var(--tui-primary);
}

.radio-label {
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
