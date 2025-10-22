<template>
  <div 
    class="tui-image"
    :class="{ 'has-overlay': overlay || caption }"
    :style="aspectRatioStyle"
  >
    <img
      v-if="!lazy || isVisible"
      :src="src"
      :alt="alt"
      class="image-element"
      :class="{ loaded: imageLoaded, error: imageError }"
      @load="handleLoad"
      @error="handleError"
    />
    <div v-else class="image-placeholder">
      <span class="loading-text">{{ loadingText }}</span>
    </div>
    
    <div v-if="!imageLoaded && !imageError" class="image-loading">
      <span class="loading-spinner">◐</span>
    </div>
    
    <div v-if="imageError" class="image-error">
      <span>✕</span>
      <span class="error-text">{{ errorText }}</span>
    </div>
    
    <div 
      v-if="(overlay || caption) && imageLoaded"
      class="image-overlay"
      :style="overlayStyle"
    >
      <slot name="overlay">
        <div v-if="caption" class="image-caption">
          {{ caption }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  lazy: {
    type: Boolean,
    default: false
  },
  aspectRatio: {
    type: String,
    default: '',
    validator: (value) => !value || ['1:1', '4:3', '16:9', '21:9', '3:2'].includes(value)
  },
  overlay: {
    type: Boolean,
    default: false
  },
  overlayOpacity: {
    type: Number,
    default: 0.7
  },
  caption: {
    type: String,
    default: ''
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  errorText: {
    type: String,
    default: 'Failed to load image'
  }
})

const emit = defineEmits(['load', 'error'])

const isVisible = ref(!props.lazy)
const imageLoaded = ref(false)
const imageError = ref(false)
let observer = null

const aspectRatioStyle = computed(() => {
  if (!props.aspectRatio) return {}
  
  const ratios = {
    '1:1': '100%',
    '4:3': '75%',
    '16:9': '56.25%',
    '21:9': '42.86%',
    '3:2': '66.67%'
  }
  
  return {
    paddingBottom: ratios[props.aspectRatio],
    position: 'relative'
  }
})

const overlayStyle = computed(() => {
  return {
    backgroundColor: `rgba(0, 0, 0, ${props.overlayOpacity})`
  }
})

const handleLoad = () => {
  imageLoaded.value = true
  emit('load')
}

const handleError = () => {
  imageError.value = true
  imageLoaded.value = false
  emit('error')
}

onMounted(() => {
  if (props.lazy && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      })
    }, {
      rootMargin: '50px'
    })
    
    const element = document.querySelector('.tui-image')
    if (element) {
      observer.observe(element)
    }
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.tui-image {
  position: relative;
  overflow: hidden;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  box-shadow: var(--tui-glow);
  font-family: var(--tui-font);
  display: inline-block;
}

.image-element {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-element.loaded {
  opacity: 1;
}

.image-element.error {
  display: none;
}

/* Aspect ratio support */
.tui-image[style*="padding-bottom"] .image-element {
  position: absolute;
  top: 0;
  left: 0;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--tui-text);
  opacity: 0.5;
}

.loading-text {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
}

.image-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--tui-primary);
  font-size: 2rem;
  text-shadow: var(--tui-glow);
  pointer-events: none;
}

.loading-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--tui-error);
  font-size: 2rem;
  text-shadow: var(--tui-glow-error);
}

.error-text {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.tui-image:hover .image-overlay {
  opacity: 1;
}

.image-caption {
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: var(--tui-text);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  border-top: 2px solid var(--tui-border);
  background: var(--tui-primary-transparent-20);
  backdrop-filter: blur(5px);
}
</style>
