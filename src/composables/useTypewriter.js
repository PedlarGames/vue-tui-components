import { ref, watch, onMounted } from 'vue'

/**
 * Typewriter effect composable
 * @param {String} text - The text to display with typewriter effect
 * @param {Object} options - Configuration options
 * @param {Number} options.speed - Typing speed in milliseconds per character (default: 50)
 * @param {Boolean} options.enabled - Whether the effect is enabled (default: true)
 * @param {Number} options.delay - Initial delay before typing starts (default: 0)
 * @param {Boolean} options.cursor - Show blinking cursor during typing (default: true)
 * @param {Function} options.onComplete - Callback when typing is complete
 * @returns {Object} - { displayText, isTyping, resetTypewriter }
 */
export function useTypewriter(text, options = {}) {
  const {
    speed = 50,
    enabled = true,
    delay = 0,
    cursor = true,
    onComplete = null
  } = options

  const displayText = ref('')
  const isTyping = ref(false)
  const currentIndex = ref(0)
  let timeoutId = null

  const type = () => {
    if (!enabled) {
      displayText.value = text.value || text
      isTyping.value = false
      return
    }

    const fullText = text.value || text
    
    if (currentIndex.value < fullText.length) {
      isTyping.value = true
      displayText.value = fullText.substring(0, currentIndex.value + 1)
      currentIndex.value++
      
      timeoutId = setTimeout(type, speed)
    } else {
      isTyping.value = false
      if (onComplete) {
        onComplete()
      }
    }
  }

  const resetTypewriter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    currentIndex.value = 0
    displayText.value = ''
    isTyping.value = false
    
    if (delay > 0) {
      setTimeout(type, delay)
    } else {
      type()
    }
  }

  // Watch for text changes
  watch(() => text.value || text, () => {
    resetTypewriter()
  })

  // Start typing on mount
  onMounted(() => {
    if (enabled) {
      if (delay > 0) {
        setTimeout(type, delay)
      } else {
        type()
      }
    } else {
      displayText.value = text.value || text
    }
  })

  return {
    displayText,
    isTyping,
    resetTypewriter
  }
}
