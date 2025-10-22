<template>
  <div class="tui-otp" :class="{ error: hasError }">
    <div class="otp-inputs">
      <input
        v-for="(digit, index) in digits"
        :key="index"
        :ref="el => inputRefs[index] = el"
        v-model="digits[index]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="otp-input"
        :class="{ filled: digits[index] }"
        :aria-label="`Digit ${index + 1}`"
        @input="handleInput(index, $event)"
        @keydown="handleKeyDown(index, $event)"
        @paste="handlePaste"
        :disabled="disabled"
      />
    </div>
    <p v-if="error" class="otp-error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  length: {
    type: Number,
    default: 6,
    validator: (value) => value > 0 && value <= 10
  },
  masked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  autoFocus: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'complete'])

const digits = ref(Array(props.length).fill(''))
const inputRefs = ref([])
const hasError = ref(false)

// Initialize digits from modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    const chars = newValue.split('').slice(0, props.length)
    digits.value = [...chars, ...Array(props.length - chars.length).fill('')]
  }
}, { immediate: true })

watch(() => props.error, (newValue) => {
  hasError.value = Boolean(newValue)
})

const handleInput = (index, event) => {
  const value = event.target.value
  
  // Only allow digits
  if (!/^\d*$/.test(value)) {
    digits.value[index] = ''
    return
  }
  
  // Store the digit
  digits.value[index] = value.slice(-1)
  
  // Update model value
  updateModelValue()
  
  // Move to next input if value entered
  if (value && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
    })
  }
}

const handleKeyDown = (index, event) => {
  if (event.key === 'Backspace') {
    if (!digits.value[index] && index > 0) {
      // Move to previous input if current is empty
      nextTick(() => {
        inputRefs.value[index - 1]?.focus()
      })
    } else {
      digits.value[index] = ''
      updateModelValue()
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < props.length - 1) {
    event.preventDefault()
    inputRefs.value[index + 1]?.focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text') || ''
  const pastedDigits = pastedData.replace(/\D/g, '').slice(0, props.length)
  
  if (pastedDigits) {
    const chars = pastedDigits.split('')
    digits.value = [...chars, ...Array(props.length - chars.length).fill('')]
    updateModelValue()
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(chars.length, props.length - 1)
    nextTick(() => {
      inputRefs.value[nextIndex]?.focus()
    })
  }
}

const updateModelValue = () => {
  const value = digits.value.join('')
  emit('update:modelValue', value)
  
  // Check if complete
  if (value.length === props.length) {
    emit('complete', value)
  }
}

onMounted(() => {
  if (props.autoFocus) {
    nextTick(() => {
      inputRefs.value[0]?.focus()
    })
  }
})
</script>

<style scoped>
.tui-otp {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.otp-inputs {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.otp-input {
  width: 2.5rem;
  height: 3rem;
  font-family: var(--tui-font);
  font-size: 1.5rem;
  text-align: center;
  color: var(--tui-text);
  background: var(--tui-bg);
  border: 2px solid var(--tui-border);
  transition: all 0.3s ease;
  box-shadow: var(--tui-glow);
  caret-color: var(--tui-primary);
}

.otp-input:focus {
  outline: none;
  border-color: var(--tui-primary);
  box-shadow: var(--tui-glow-hover);
  transform: scale(1.05);
}

.otp-input.filled {
  background: var(--tui-primary-transparent-10);
}

.otp-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tui-otp.error .otp-input {
  border-color: var(--tui-error);
  box-shadow: var(--tui-glow-error);
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.otp-error {
  color: var(--tui-error);
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
  text-shadow: var(--tui-glow-error);
  letter-spacing: 1px;
}

/* Responsive */
@media (max-width: 480px) {
  .otp-input {
    width: 2rem;
    height: 2.5rem;
    font-size: 1.2rem;
  }
}
</style>
