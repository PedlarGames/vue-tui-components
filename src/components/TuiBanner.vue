<template>
  <Transition name="banner-slide">
    <div 
      v-if="visible"
      class="tui-banner"
      :class="variant"
      role="banner"
    >
      <div class="banner-content">
        <span v-if="icon" class="banner-icon">{{ icon }}</span>
        <div class="banner-message">
          <strong v-if="title" class="banner-title">{{ title }}</strong>
          <span class="banner-text">{{ message }}</span>
        </div>
      </div>
      <div class="banner-actions">
        <slot name="actions">
          <a 
            v-if="linkText && linkUrl"
            :href="linkUrl"
            class="banner-link"
            @click="handleLinkClick"
          >
            {{ linkText }}
          </a>
        </slot>
        <button 
          v-if="dismissible"
          class="banner-close"
          type="button"
          @click="dismiss"
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['primary', 'success', 'error', 'warning', 'info'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  linkText: {
    type: String,
    default: ''
  },
  linkUrl: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'dismiss', 'link-click'])

const visible = ref(props.modelValue)

const dismiss = () => {
  visible.value = false
  emit('update:modelValue', false)
  emit('dismiss')
}

const handleLinkClick = (event) => {
  emit('link-click', event)
}
</script>

<style scoped>
.tui-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  font-family: var(--tui-font);
  margin-bottom: 1rem;
  box-shadow: var(--tui-glow);
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.banner-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.banner-message {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.banner-title {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
}

.banner-text {
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.banner-link {
  color: currentColor;
  text-decoration: underline;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.banner-link:hover {
  text-shadow: var(--tui-glow);
  transform: scale(1.05);
}

.banner-close {
  background: none;
  border: none;
  color: currentColor;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-family: inherit;
}

.banner-close:hover {
  transform: scale(1.2) rotate(90deg);
}

/* Variants */
.tui-banner.primary {
  border-color: var(--tui-primary);
  color: var(--tui-primary);
  background: var(--tui-primary-transparent-10);
  box-shadow: var(--tui-glow);
}

.tui-banner.success {
  border-color: var(--tui-success);
  color: var(--tui-success);
  background: var(--tui-success-transparent-20);
  box-shadow: var(--tui-glow-success);
}

.tui-banner.error {
  border-color: var(--tui-error);
  color: var(--tui-error);
  background: var(--tui-error-transparent-20);
  box-shadow: var(--tui-glow-error);
}

.tui-banner.warning {
  border-color: var(--tui-warning);
  color: var(--tui-warning);
  background: var(--tui-warning-transparent-20);
  box-shadow: var(--tui-glow-warning);
}

.tui-banner.info {
  border-color: var(--tui-info);
  color: var(--tui-info);
  background: var(--tui-info-transparent-20);
  box-shadow: var(--tui-glow-info);
}

/* Slide Animation */
.banner-slide-enter-active,
.banner-slide-leave-active {
  transition: all 0.3s ease;
}

.banner-slide-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.banner-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .tui-banner {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .banner-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
