<template>
  <div class="tui-carousel">
    <div class="carousel-container">
      <button
        v-if="showControls"
        class="carousel-control prev"
        @click="prev"
        aria-label="Previous slide"
        :disabled="currentIndex === 0 && !loop"
      >
        ◄
      </button>
      
      <div class="carousel-viewport">
        <div class="carousel-track">
          <Transition :name="transitionName" mode="out-in">
            <div
              :key="currentIndex"
              class="carousel-slide"
            >
              <slot :item="items[currentIndex]" :index="currentIndex">
                <img v-if="items[currentIndex].image" :src="items[currentIndex].image" :alt="items[currentIndex].caption || ''" class="carousel-image" />
                <div v-if="items[currentIndex].caption" class="carousel-caption">
                  {{ items[currentIndex].caption }}
                </div>
              </slot>
            </div>
          </Transition>
        </div>
      </div>
      
      <button
        v-if="showControls"
        class="carousel-control next"
        @click="next"
        aria-label="Next slide"
        :disabled="currentIndex === items.length - 1 && !loop"
      >
        ►
      </button>
    </div>
    
    <div v-if="showIndicators" class="carousel-indicators">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Go to slide ${index + 1}`"
        :aria-current="index === currentIndex"
      >
        ■
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 3000
  },
  loop: {
    type: Boolean,
    default: true
  },
  showControls: {
    type: Boolean,
    default: true
  },
  showIndicators: {
    type: Boolean,
    default: true
  },
  transition: {
    type: String,
    default: 'slide',
    validator: (value) => ['slide', 'fade'].includes(value)
  }
})

const emit = defineEmits(['change'])

const currentIndex = ref(0)
const direction = ref('next')
let intervalId = null

const transitionName = computed(() => {
  if (props.transition === 'fade') return 'carousel-fade'
  return direction.value === 'next' ? 'carousel-slide-next' : 'carousel-slide-prev'
})

const next = () => {
  if (currentIndex.value < props.items.length - 1) {
    direction.value = 'next'
    currentIndex.value++
    emit('change', currentIndex.value)
  } else if (props.loop) {
    direction.value = 'next'
    currentIndex.value = 0
    emit('change', currentIndex.value)
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    direction.value = 'prev'
    currentIndex.value--
    emit('change', currentIndex.value)
  } else if (props.loop) {
    direction.value = 'prev'
    currentIndex.value = props.items.length - 1
    emit('change', currentIndex.value)
  }
}

const goToSlide = (index) => {
  direction.value = index > currentIndex.value ? 'next' : 'prev'
  currentIndex.value = index
  emit('change', currentIndex.value)
}

const startAutoplay = () => {
  if (props.autoplay) {
    intervalId = setInterval(() => {
      next()
    }, props.interval)
  }
}

const stopAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.tui-carousel {
  position: relative;
  font-family: var(--tui-font);
}

.carousel-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  box-shadow: var(--tui-glow);
}

.carousel-viewport {
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 300px;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.carousel-slide {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.carousel-caption {
  width: 100%;
  background: var(--tui-primary-transparent-30);
  border-top: 2px solid var(--tui-border);
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: auto;
}

.carousel-control {
  background: none;
  border: none;
  color: var(--tui-primary);
  font-size: 2rem;
  cursor: pointer;
  padding: 1rem;
  transition: all 0.3s ease;
  text-shadow: var(--tui-glow);
  font-family: inherit;
}

.carousel-control:hover:not(:disabled) {
  color: var(--tui-text);
  transform: scale(1.2);
  text-shadow: var(--tui-glow-hover);
}

.carousel-control:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 0;
}

.indicator {
  background: none;
  border: none;
  color: var(--tui-border);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.indicator:hover {
  color: var(--tui-primary);
  transform: scale(1.2);
}

.indicator.active {
  color: var(--tui-primary);
  text-shadow: var(--tui-glow);
  transform: scale(1.3);
}

/* Slide Transitions */
.carousel-slide-next-enter-active,
.carousel-slide-next-leave-active,
.carousel-slide-prev-enter-active,
.carousel-slide-prev-leave-active {
  transition: all 0.5s ease;
}

.carousel-slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.carousel-slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.carousel-slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.carousel-slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Fade Transition */
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.5s ease;
}

.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-viewport {
    min-height: 200px;
  }
  
  .carousel-control {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
}
</style>
