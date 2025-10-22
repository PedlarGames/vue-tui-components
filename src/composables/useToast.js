import { ref, h, render } from 'vue'
import TuiToast from '../components/TuiToast.vue'

const toasts = ref([])
let toastIdCounter = 0

export function useToast() {
  const show = (options) => {
    const id = ++toastIdCounter
    
    // Default options
    const defaultOptions = {
      message: '',
      title: '',
      severity: 'info',
      position: 'top-right',
      duration: 5000,
      dismissable: true,
      showProgress: true,
      glow: true,
      sound: false
    }
    
    const toastOptions = { ...defaultOptions, ...options, id }
    
    // Create container if it doesn't exist for this position
    let container = document.querySelector(`.tui-toast-container-${toastOptions.position}`)
    if (!container) {
      container = document.createElement('div')
      container.className = `tui-toast-container tui-toast-container-${toastOptions.position}`
      container.style.cssText = `
        position: fixed;
        z-index: 10000;
        pointer-events: none;
      `
      
      // Position the container
      const [vertical, horizontal] = toastOptions.position.split('-')
      
      if (vertical === 'top') {
        container.style.top = '0'
      } else {
        container.style.bottom = '0'
      }
      
      if (horizontal === 'left') {
        container.style.left = '0'
      } else if (horizontal === 'right') {
        container.style.right = '0'
      } else {
        container.style.left = '0'
        container.style.right = '0'
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.alignItems = 'center'
      }
      
      document.body.appendChild(container)
    }
    
    // Create wrapper for this toast
    const toastWrapper = document.createElement('div')
    toastWrapper.style.pointerEvents = 'auto'
    toastWrapper.style.marginBottom = '0.5rem'
    container.appendChild(toastWrapper)
    
    // Create toast component
    const vnode = h(TuiToast, {
      ...toastOptions,
      onClose: () => {
        remove(id)
      },
      onClosed: () => {
        // Remove DOM element after transition
        if (toastWrapper.parentNode) {
          toastWrapper.parentNode.removeChild(toastWrapper)
        }
        // Clean up empty containers
        if (container && container.children.length === 0) {
          container.parentNode?.removeChild(container)
        }
      }
    })
    
    render(vnode, toastWrapper)
    
    // Store toast reference
    toasts.value.push({
      id,
      vnode,
      wrapper: toastWrapper,
      options: toastOptions,
      isClosing: false
    })
    
    return id
  }
  
  const remove = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      const toast = toasts.value[index]
      // Only call close if not already closing (to prevent infinite recursion)
      if (toast.vnode.component?.exposed && !toast.isClosing) {
        toast.isClosing = true
        toast.vnode.component.exposed.close()
      }
      toasts.value.splice(index, 1)
    }
  }
  
  const clear = (position) => {
    if (position) {
      // Clear toasts in specific position
      const positionToasts = toasts.value.filter(t => t.options.position === position)
      positionToasts.forEach(t => remove(t.id))
    } else {
      // Clear all toasts
      toasts.value.forEach(t => remove(t.id))
      toasts.value = []
    }
  }
  
  // Convenience methods for different severities
  const success = (message, options = {}) => {
    return show({ ...options, message, severity: 'success' })
  }
  
  const error = (message, options = {}) => {
    return show({ ...options, message, severity: 'error' })
  }
  
  const warning = (message, options = {}) => {
    return show({ ...options, message, severity: 'warning' })
  }
  
  const info = (message, options = {}) => {
    return show({ ...options, message, severity: 'info' })
  }
  
  return {
    show,
    remove,
    clear,
    success,
    error,
    warning,
    info,
    toasts
  }
}
