// Main entry point for the Vue TUI Components library
import './style.css'

// Import all components
import TuiAvatar from './components/TuiAvatar.vue'
import TuiBadge from './components/TuiBadge.vue'
import TuiBanner from './components/TuiBanner.vue'
import TuiButton from './components/TuiButton.vue'
import TuiCard from './components/TuiCard.vue'
import TuiCarousel from './components/TuiCarousel.vue'
import TuiCheckbox from './components/TuiCheckbox.vue'
import TuiChip from './components/TuiChip.vue'
import TuiDatepicker from './components/TuiDatepicker.vue'
import TuiDialog from './components/TuiDialog.vue'
import TuiDropdown from './components/TuiDropdown.vue'
import TuiHeader from './components/TuiHeader.vue'
import TuiIcon from './components/TuiIcon.vue'
import TuiImage from './components/TuiImage.vue'
import TuiInput from './components/TuiInput.vue'
import TuiMenubar from './components/TuiMenubar.vue'
import TuiOTP from './components/TuiOTP.vue'
import TuiProgressBar from './components/TuiProgressBar.vue'
import TuiRadio from './components/TuiRadio.vue'
import TuiSelect from './components/TuiSelect.vue'
import TuiSlider from './components/TuiSlider.vue'
import TuiTable from './components/TuiTable.vue'
import TuiTabs from './components/TuiTabs.vue'
import TuiTerminal from './components/TuiTerminal.vue'
import TuiTerminalTypewriter from './components/TuiTerminalTypewriter.vue'
import TuiText from './components/TuiText.vue'
import TuiThemeSwitcher from './components/TuiThemeSwitcher.vue'
import TuiTimeline from './components/TuiTimeline.vue'
import TuiToast from './components/TuiToast.vue'
import TuiTooltip from './components/TuiTooltip.vue'

// Import composables
import { useToast } from './composables/useToast.js'
import { useTypewriter } from './composables/useTypewriter.js'

// Component array for plugin installation
const components = [
  TuiAvatar,
  TuiBadge,
  TuiBanner,
  TuiButton,
  TuiCard,
  TuiCarousel,
  TuiCheckbox,
  TuiChip,
  TuiDatepicker,
  TuiDialog,
  TuiDropdown,
  TuiHeader,
  TuiIcon,
  TuiImage,
  TuiInput,
  TuiMenubar,
  TuiOTP,
  TuiProgressBar,
  TuiRadio,
  TuiSelect,
  TuiSlider,
  TuiTable,
  TuiTabs,
  TuiTerminal,
  TuiTerminalTypewriter,
  TuiText,
  TuiThemeSwitcher,
  TuiTimeline,
  TuiToast,
  TuiTooltip
]

// Vue plugin install function
const install = (app) => {
  components.forEach(component => {
    app.component(component.name || component.__name, component)
  })
}

// Export plugin
export default {
  install
}

// Export individual components
export {
  TuiAvatar,
  TuiBadge,
  TuiBanner,
  TuiButton,
  TuiCard,
  TuiCarousel,
  TuiCheckbox,
  TuiChip,
  TuiDatepicker,
  TuiDialog,
  TuiDropdown,
  TuiHeader,
  TuiIcon,
  TuiImage,
  TuiInput,
  TuiMenubar,
  TuiOTP,
  TuiProgressBar,
  TuiRadio,
  TuiSelect,
  TuiSlider,
  TuiTable,
  TuiTabs,
  TuiTerminal,
  TuiTerminalTypewriter,
  TuiText,
  TuiThemeSwitcher,
  TuiTimeline,
  TuiToast,
  TuiTooltip,
  useToast,
  useTypewriter
}
