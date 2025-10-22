<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div 
        v-if="modelValue"
        class="tui-dialog-overlay"
        :style="{ '--overlay-opacity': overlayOpacity }"
        @click.self="handleOverlayClick"
      >
        <div 
          class="tui-dialog"
          :class="{ 'no-close': !closable }"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'dialog-title' : undefined"
        >
          <!-- Header -->
          <div class="dialog-header" v-if="title || closable">
            <h3 id="dialog-title" class="dialog-title" v-if="title">{{ title }}</h3>
            <button 
              v-if="closable"
              class="dialog-close"
              type="button"
              @click="close"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          <!-- Body -->
          <div class="dialog-body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="dialog-footer" v-if="$slots.footer || showActions">
            <slot name="footer">
              <div class="dialog-actions" v-if="showActions">
                <TuiButton 
                  v-if="showCancel"
                  :label="cancelText"
                  variant="secondary"
                  @click="handleCancel"
                />
                <TuiButton 
                  v-if="showConfirm"
                  :label="confirmText"
                  :variant="confirmVariant"
                  @click="handleConfirm"
                />
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import TuiButton from './TuiButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  overlayOpacity: {
    type: Number,
    default: 0.8
  },
  showActions: {
    type: Boolean,
    default: true
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmVariant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'danger', 'warning', 'info'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay && props.closable) {
    close()
  }
}

const handleConfirm = () => {
  emit('confirm')
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}

// Prevent body scroll when dialog is open
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.tui-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, var(--overlay-opacity));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.tui-dialog {
  background: var(--tui-bg);
  border: 2px solid var(--tui-border);
  box-shadow: var(--tui-glow), 0 0 50px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: dialogSlideIn 0.3s ease;
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 2px solid var(--tui-border);
  background: var(--tui-primary-transparent-5);
}

.dialog-title {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: var(--tui-glow);
  margin: 0;
}

.dialog-close {
  background: none;
  border: none;
  color: var(--tui-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-shadow: var(--tui-glow);
  font-family: inherit;
}

.dialog-close:hover {
  transform: scale(1.2) rotate(90deg);
  color: var(--tui-error);
  text-shadow: var(--tui-glow-error);
}

.dialog-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.dialog-footer {
  padding: 1rem 1.5rem;
  border-top: 2px solid var(--tui-border);
  background: var(--tui-primary-transparent-5);
}

.dialog-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Fade Animation */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-active .tui-dialog {
  animation: dialogSlideIn 0.3s ease;
}

.dialog-fade-leave-active .tui-dialog {
  animation: dialogSlideOut 0.3s ease;
}

@keyframes dialogSlideOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
}
</style>
