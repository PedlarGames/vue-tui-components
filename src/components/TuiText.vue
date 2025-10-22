<template>
  <div class="tui-text" :class="rootClasses">
    <span v-if="prefix" class="text-prefix">{{ prefix }}</span>
    <span class="text-content">
      {{ displayText }}<span v-if="showCursor && isTyping" class="typing-cursor">█</span>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTypewriter } from '../composables/useTypewriter'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  typewriter: {
    type: Boolean,
    default: false
  },
  typewriterSpeed: {
    type: Number,
    default: 50
  },
  typewriterDelay: {
    type: Number,
    default: 0
  },
  showCursor: {
    type: Boolean,
    default: true
  },
  prefix: {
    type: String,
    default: ''
  },
  glow: {
    type: Boolean,
    default: false
  },
  inheritColor: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['typewriter-complete'])

const { displayText, isTyping } = useTypewriter(
  computed(() => props.text),
  {
    speed: props.typewriterSpeed,
    enabled: props.typewriter,
    delay: props.typewriterDelay,
    cursor: props.showCursor,
    onComplete: () => emit('typewriter-complete')
  }
)

const rootClasses = computed(() => ({
  'is-typing': isTyping.value,
  'inherit-color': props.inheritColor
}))
</script>

<style scoped>
.tui-text {
  color: var(--tui-text);
  font-family: var(--tui-font);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.text-prefix {
  color: var(--tui-primary);
  margin-right: 0.5rem;
  text-shadow: var(--tui-glow);
  font-weight: bold;
}

.text-content {
  letter-spacing: 0.5px;
}

.typing-cursor {
  color: var(--tui-primary);
  animation: cursor-blink 1s step-end infinite;
  text-shadow: var(--tui-glow);
  margin-left: 2px;
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.tui-text.is-typing .text-content {
  text-shadow: 0 0 5px var(--tui-primary-transparent-20);
}

.tui-text.inherit-color {
  color: inherit;
}

.tui-text.inherit-color .text-prefix,
.tui-text.inherit-color .typing-cursor {
  color: currentColor;
  text-shadow: inherit;
}
</style>
