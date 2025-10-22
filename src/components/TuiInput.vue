<template>
  <div class="tui-input-wrapper">
    <label v-if="label" class="tui-label">
      <span class="label-bracket">&gt;</span> {{ label }}
    </label>
    <div class="input-container">
      <span class="input-prompt">&gt;&gt;</span>
      <input 
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="tui-input"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="input-cursor">_</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.tui-input-wrapper {
  margin-bottom: 1rem;
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

.input-container {
  display: flex;
  align-items: center;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  padding: 0.75rem;
  box-shadow: inset 0 0 10px var(--tui-primary-transparent-10);
}

.input-prompt {
  color: var(--tui-primary);
  margin-right: 0.5rem;
  font-weight: bold;
}

.tui-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--tui-text);
  font-family: var(--tui-font);
  font-size: 1rem;
  outline: none;
}

.tui-input::placeholder {
  color: var(--tui-primary-transparent-30);
}

.tui-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-cursor {
  color: var(--tui-primary);
  animation: blink 1s infinite;
  margin-left: 0.25rem;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
