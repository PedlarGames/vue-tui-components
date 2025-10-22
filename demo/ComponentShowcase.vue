<template>
  <div class="showcase">
    <!-- Theme Info -->
    <TuiCard title="Theme Customization" glowing>
      <p class="info-text">
        <span class="highlight">►</span> Use the <strong>DISPLAY SETTINGS</strong> panel above to customize your experience.
      </p>
      <div class="feature-list">
        <p><span class="bullet">●</span> <strong>AMBER THEME:</strong> Vintage terminal amber monitor (default)</p>
        <p><span class="bullet">●</span> <strong>GREEN THEME:</strong> Classic Pip-Boy phosphor display</p>
        <p><span class="bullet">●</span> <strong>SCANLINES:</strong> Authentic CRT horizontal scan effect</p>
        <p><span class="bullet">●</span> <strong>CRT FLICKER:</strong> Subtle screen flicker animation</p>
        <p><span class="bullet">●</span> <strong>GLOW EFFECT:</strong> Text and border glow illumination</p>
      </div>
      <p class="info-text" style="margin-top: 1rem;">
        <span class="highlight">►</span> Your preferences are automatically saved!
      </p>
    </TuiCard>

    <!-- Menubar Section -->
    <TuiCard title="Application Menubar" glowing>
      <p style="margin-bottom: 1rem;">Classic desktop application menu bar with dropdown menus:</p>
      <TuiMenubar :menus="menubarMenus" @menu-item-click="handleMenuItemClick">
        <template #right>
          <span style="color: var(--tui-text-dim); font-size: 0.9rem;">STATUS: ONLINE</span>
        </template>
      </TuiMenubar>
      
      <div style="margin-top: 1rem;">
        <h4 style="margin-bottom: 0.5rem; text-transform: uppercase;">Compact Version</h4>
        <TuiMenubar :menus="menubarMenus" compact @menu-item-click="handleMenuItemClick" />
      </div>
    </TuiCard>

    <!-- Buttons Section -->
    <TuiCard title="Buttons" glowing>
      <div class="button-group">
        <TuiButton label="Primary Button" @click="handleClick('Primary')" />
        <TuiButton label="Secondary" variant="secondary" @click="handleClick('Secondary')" />
        <TuiButton label="Warning" variant="warning" @click="handleClick('Tertiary')" />
        <TuiButton label="Danger" variant="danger" @click="handleClick('Danger')" />
        <TuiButton label="Info" variant="info" @click="handleClick('Info')" />
        <TuiButton label="Disabled" :disabled="true" />
      </div>
    </TuiCard>

    <!-- Toast Notifications Section -->
    <TuiCard title="Toast Notifications" glowing>
      <p style="margin-bottom: 1rem;">Click buttons to trigger toast notifications in different positions with various severities:</p>
      
      <div style="margin-bottom: 1.5rem;">
        <h4 style="margin-bottom: 0.5rem; text-transform: uppercase;">Severity Types</h4>
        <div class="button-group">
          <TuiButton label="Success" variant="success" @click="showToast('success')" />
          <TuiButton label="Error" variant="danger" @click="showToast('error')" />
          <TuiButton label="Warning" variant="warning" @click="showToast('warning')" />
          <TuiButton label="Info" variant="info" @click="showToast('info')" />
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="margin-bottom: 0.5rem; text-transform: uppercase;">Positions</h4>
        <div class="toast-grid">
          <TuiButton label="Top Left" @click="showPositionToast('top-left')" />
          <TuiButton label="Top Center" @click="showPositionToast('top-center')" />
          <TuiButton label="Top Right" @click="showPositionToast('top-right')" />
          <TuiButton label="Bottom Left" @click="showPositionToast('bottom-left')" />
          <TuiButton label="Bottom Center" @click="showPositionToast('bottom-center')" />
          <TuiButton label="Bottom Right" @click="showPositionToast('bottom-right')" />
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 0.5rem; text-transform: uppercase;">Special Options</h4>
        <div class="button-group">
          <TuiButton label="Long Message" @click="showLongToast" />
          <TuiButton label="No Auto-Close" @click="showPersistentToast" />
          <TuiButton label="Custom Title" @click="showCustomToast" />
          <TuiButton label="No Progress Bar" @click="showNoProgressToast" />
        </div>
      </div>
    </TuiCard>

    <!-- Animations Section -->
    <TuiCard title="Animations Showcase" glowing fade-in :animation-delay="200">
      <h4 style="margin-bottom: 1rem;">Typewriter Effect</h4>
      <TuiText 
        text="VAULT-TEC PRESENTS: THE FUTURE OF POST-NUCLEAR SURVIVAL TECHNOLOGY"
        typewriter
        :typewriter-speed="50"
        prefix="►"
        show-cursor
        @typewriter-complete="handleTypewriterComplete"
      />
      
      <TuiText 
        text="Welcome to your new home in the Vault. All systems operational."
        typewriter
        :typewriter-speed="30"
        :typewriter-delay="2500"
        prefix="►"
      />

      <div style="margin-top: 2rem;">
        <h4 style="margin-bottom: 1rem;">Button Animations</h4>
        <div class="button-group">
          <TuiButton label="Pulse Effect" pulse />
          <TuiButton label="Danger Pulse" variant="danger" pulse />
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <h4 style="margin-bottom: 1rem;">Card Animations</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <TuiCard title="Fade In" fade-in :animation-delay="0" style="flex: 1; min-width: 200px;">
            <p>This card fades in smoothly</p>
          </TuiCard>
          <TuiCard title="Slide In" slide-in :animation-delay="300" style="flex: 1; min-width: 200px;">
            <p>This card slides up while fading</p>
            <template #footer>
              <p style="font-size: 0.8rem; color: var(--tui-text-dim);">
                Animation delay: 300ms
              </p>
            </template>
          </TuiCard>
          <TuiCard title="Minimizable Card" :minimizable="true" style="flex: 1; min-width: 200px;">
            <p>This content can be hidden!</p>
            <template #footer>
              <p style="font-size: 0.8rem; color: var(--tui-text-dim);">
                Click the ▲/▼ button to minimize or expand.
              </p>
            </template>
          </TuiCard>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <h4 style="margin-bottom: 1rem;">Terminal Typewriter</h4>
        <TuiTerminalTypewriter
        ref="terminal2"
          title="ANIMATED TERMINAL"
          status="READY"
          typing-status="TYPING"
          :lines="animatedTerminalLines"
          :typewriter-speed="30"
          :typewriter-stagger="500"
          :interactive="true"
          @command="handleCommand2"
        />
      </div>
    </TuiCard>

    <!-- Form Inputs Section -->
    <TuiCard title="Form Inputs">
      <TuiInput 
        v-model="username" 
        label="Username" 
        placeholder="Enter username..."
      />
      <TuiInput 
        v-model="password" 
        label="Password" 
        type="password"
        placeholder="Enter password..."
      />
      <TuiSelect
        v-model="selectedOption"
        label="Vault Selection"
        :options="vaultOptions"
        placeholder="Select your vault..."
      />
      <div style="margin-top: 1rem;">
        <p>Selected: {{ username || 'N/A' }} | Vault: {{ selectedOption || 'None' }}</p>
      </div>
    </TuiCard>

    <!-- Checkboxes and Radio Buttons -->
    <TuiCard title="Selection Controls">
      <div class="row">
        <div class="col">
          <h4 style="margin-bottom: 1rem;">Checkboxes</h4>
          <TuiCheckbox v-model="option1" label="Enable S.P.E.C.I.A.L." />
          <TuiCheckbox v-model="option2" label="Activate V.A.T.S." />
          <TuiCheckbox v-model="option3" label="Radio Beacon" />
        </div>
        <div class="col">
          <TuiRadio
            v-model="difficulty"
            :options="difficultyOptions"
            group-label="Difficulty Level"
          />
        </div>
      </div>
    </TuiCard>

    <!-- Progress Bars -->
    <TuiCard title="Progress Indicators">
      <TuiProgressBar :value="health" label="Health Points" />
      <TuiProgressBar :value="radiation" label="Radiation Level (animation false)" :animated="false"/>
      <TuiProgressBar :value="experience" label="Experience" />
      <div class="button-group" style="margin-top: 1rem;">
        <TuiButton label="Heal (+10)" @click="adjustHealth(10)" />
        <TuiButton label="Damage (-10)" variant="danger" @click="adjustHealth(-10)" />
        <TuiButton label="Add Rads" variant="secondary" @click="radiation = Math.min(100, radiation + 15)" />
      </div>
    </TuiCard>

    <!-- Terminal -->
    <TuiCard title="Terminal Interface">
      <TuiTerminal
        ref="terminal"
        title="ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM"
        status="CONNECTED"
        :lines="terminalLines"
        :interactive="true"
        @command="handleCommand"
      />
    </TuiCard>

    <!-- Table -->
    <TuiCard title="Data Table">
      <TuiTable :columns="tableColumns" :data="tableData" />
    </TuiCard>

    <!-- Tabs -->
    <TuiCard title="Tab Navigation">
      <TuiTabs :tabs="tabsList" default-tab="stats">
        <template #stats>
          <div class="tab-content">
            <h3>S.P.E.C.I.A.L. Stats</h3>
            <TuiProgressBar :value="75" label="Strength" />
            <TuiProgressBar :value="60" label="Perception" />
            <TuiProgressBar :value="80" label="Endurance" />
            <TuiProgressBar :value="55" label="Charisma" />
          </div>
        </template>
        <template #inventory>
          <div class="tab-content">
            <h3>Inventory</h3>
            <p>• Stimpak x5</p>
            <p>• RadAway x3</p>
            <p>• Nuka-Cola x12</p>
            <p>• 10mm Pistol</p>
          </div>
        </template>
        <template #map>
          <div class="tab-content">
            <h3>Map Location</h3>
            <p>Current: Vault 111</p>
            <p>Discovered Locations: 15</p>
            <p>Quest Markers: 3 Active</p>
          </div>
        </template>
      </TuiTabs>
    </TuiCard>
  </div>
  <NewComponentsShowcase />
</template>

<script setup>
import { ref } from 'vue'
import TuiButton from '../src/components/TuiButton.vue'
import TuiInput from '../src/components/TuiInput.vue'
import TuiSelect from '../src/components/TuiSelect.vue'
import TuiCard from '../src/components/TuiCard.vue'
import TuiProgressBar from '../src/components/TuiProgressBar.vue'
import TuiTerminal from '../src/components/TuiTerminal.vue'
import TuiTerminalTypewriter from '../src/components/TuiTerminalTypewriter.vue'
import TuiCheckbox from '../src/components/TuiCheckbox.vue'
import TuiRadio from '../src/components/TuiRadio.vue'
import TuiTable from '../src/components/TuiTable.vue'
import TuiTabs from '../src/components/TuiTabs.vue'
import TuiText from '../src/components/TuiText.vue'
import TuiMenubar from '../src/components/TuiMenubar.vue'
import NewComponentsShowcase from './NewComponentsShowcase.vue'
import { useToast } from '../src/composables/useToast.js'

// Toast composable
const toast = useToast()

// Menubar configuration
const menubarMenus = [
  {
    id: 'file',
    label: 'File',
    items: [
      { id: 'new', label: 'New', icon: '+', shortcut: 'Ctrl+N', action: () => console.log('New file') },
      { id: 'open', label: 'Open', icon: '○', shortcut: 'Ctrl+O', action: () => console.log('Open file') },
      { id: 'save', label: 'Save', icon: '◆', shortcut: 'Ctrl+S', action: () => console.log('Save file') },
      { id: 'save-as', label: 'Save As...', shortcut: 'Ctrl+Shift+S', action: () => console.log('Save As') },
      { separator: true },
      { id: 'recent', label: 'Recent Files', icon: '◄', disabled: true },
      { separator: true },
      { id: 'exit', label: 'Exit', icon: '✕', shortcut: 'Alt+F4', action: () => console.log('Exit') }
    ]
  },
  {
    id: 'edit',
    label: 'Edit',
    items: [
      { id: 'undo', label: 'Undo', icon: '↶', shortcut: 'Ctrl+Z', action: () => console.log('Undo') },
      { id: 'redo', label: 'Redo', icon: '↷', shortcut: 'Ctrl+Y', action: () => console.log('Redo') },
      { separator: true },
      { id: 'cut', label: 'Cut', icon: '✂', shortcut: 'Ctrl+X', action: () => console.log('Cut') },
      { id: 'copy', label: 'Copy', icon: '⧉', shortcut: 'Ctrl+C', action: () => console.log('Copy') },
      { id: 'paste', label: 'Paste', icon: '▭', shortcut: 'Ctrl+V', action: () => console.log('Paste') },
      { separator: true },
      { id: 'select-all', label: 'Select All', shortcut: 'Ctrl+A', action: () => console.log('Select All') }
    ]
  },
  {
    id: 'view',
    label: 'View',
    items: [
      { id: 'zoom-in', label: 'Zoom In', icon: '+', shortcut: 'Ctrl++', action: () => console.log('Zoom In') },
      { id: 'zoom-out', label: 'Zoom Out', icon: '-', shortcut: 'Ctrl+-', action: () => console.log('Zoom Out') },
      { id: 'zoom-reset', label: 'Reset Zoom', shortcut: 'Ctrl+0', action: () => console.log('Reset Zoom') },
      { separator: true },
      { id: 'fullscreen', label: 'Fullscreen', icon: '⛶', shortcut: 'F11', action: () => console.log('Fullscreen') }
    ]
  },
  {
    id: 'help',
    label: 'Help',
    items: [
      { id: 'docs', label: 'Documentation', icon: '?', action: () => console.log('Docs') },
      { id: 'shortcuts', label: 'Keyboard Shortcuts', action: () => console.log('Shortcuts') },
      { separator: true },
      { id: 'about', label: 'About', icon: 'i', action: () => console.log('About') }
    ]
  }
]

const handleMenuItemClick = (item) => {
  terminalLines.value.push({ 
    type: 'info', 
    text: `Menu item clicked: ${item.label}` 
  })
  terminal.value?.scrollToBottom()
  
  toast.info(`Menu action: ${item.label}`, {
    duration: 3000,
    position: 'bottom-right'
  })
}

// Form data
const username = ref('')
const password = ref('')
const selectedOption = ref('')

const vaultOptions = [
  { value: 'vault111', label: 'Vault 111' },
  { value: 'vault76', label: 'Vault 76' },
  { value: 'vault101', label: 'Vault 101' },
  { value: 'vault13', label: 'Vault 13' }
]

// Checkboxes
const option1 = ref(true)
const option2 = ref(false)
const option3 = ref(true)

// Radio buttons
const difficulty = ref('normal')
const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'normal', label: 'Normal' },
  { value: 'hard', label: 'Hard' },
  { value: 'survival', label: 'Survival' }
]

// Progress bars
const health = ref(85)
const radiation = ref(25)
const experience = ref(60)

const adjustHealth = (amount) => {
  health.value = Math.max(0, Math.min(100, health.value + amount))
}

// Terminal
const terminal = ref(null)
const terminalLines = ref([
  { type: 'success', text: 'System initialized...' },
  { type: 'info', text: 'Loading ROBCO Industries (TM) Termlink Protocol' },
  { type: 'success', text: 'Connection established.' },
  { type: 'output', text: 'Type HELP for available commands.' }
])

// Animated terminal for showcase
const terminal2 = ref(null)
const animatedTerminalLines = ref([
  { type: 'success', text: 'BOOT SEQUENCE INITIATED...' },
  { type: 'info', text: 'Loading Vault-Tec Operating System v2.1.1' },
  { type: 'success', text: 'All systems nominal. Welcome, Overseer.' },
  { type: 'output', text: 'Type HELP for available commands.' }
])

const handleTypewriterComplete = () => {
  console.log('Typewriter animation completed!')
}

const handleCommand = (cmd) => {
  terminalLines.value.push({ type: 'input', text: cmd })
  
  const command = cmd.toLowerCase().trim()
  
  if (command === 'help') {
    terminalLines.value.push({ 
      type: 'output', 
      text: 'Available commands: status, scan, clear, exit' 
    })
  } else if (command === 'status') {
    terminalLines.value.push({ 
      type: 'success', 
      text: 'All systems operational. Vault-Tec approved.' 
    })
  } else if (command === 'scan') {
    terminalLines.value.push({ 
      type: 'info', 
      text: 'Scanning... 3 life forms detected nearby.' 
    })
  } else if (command === 'clear') {
    terminalLines.value = []
  } else if (command === 'exit') {
    terminalLines.value.push({ 
      type: 'warning', 
      text: 'Disconnecting... Goodbye.' 
    })
  } else {
    terminalLines.value.push({ 
      type: 'error', 
      text: `Unknown command: ${cmd}` 
    })
  }
  
  terminal.value?.scrollToBottom()
}

const handleCommand2 = (cmd) => {
  animatedTerminalLines.value.push({ type: 'input', text: cmd })
  
  const command = cmd.toLowerCase().trim()
  
  if (command === 'help') {
    animatedTerminalLines.value.push({ 
      type: 'output', 
      text: 'Available commands: status, scan, clear, exit' 
    })
  } else if (command === 'status') {
    animatedTerminalLines.value.push({ 
      type: 'success', 
      text: 'All systems operational. Vault-Tec approved.' 
    })
  } else if (command === 'scan') {
    animatedTerminalLines.value.push({ 
      type: 'info', 
      text: 'Scanning... 3 life forms detected nearby.' 
    })
  } else if (command === 'clear') {
    animatedTerminalLines.value = []
  } else if (command === 'exit') {
    animatedTerminalLines.value.push({ 
      type: 'warning', 
      text: 'Disconnecting... Goodbye.' 
    })
  } else {
    animatedTerminalLines.value.push({ 
      type: 'error', 
      text: `Unknown command: ${cmd}` 
    })
  }
  
  terminal2.value?.scrollToBottom()
}

// Table
const tableColumns = [
  { key: 'item', label: 'Item' },
  { key: 'type', label: 'Type' },
  { key: 'value', label: 'Value' },
  { key: 'weight', label: 'Weight' }
]

const tableData = [
  { item: '10mm Pistol', type: 'Weapon', value: '50 Caps', weight: '3.5 lbs' },
  { item: 'Stimpak', type: 'Aid', value: '25 Caps', weight: '0.1 lbs' },
  { item: 'RadAway', type: 'Aid', value: '40 Caps', weight: '0.1 lbs' },
  { item: 'Nuka-Cola', type: 'Food', value: '20 Caps', weight: '1.0 lbs' },
  { item: 'Leather Armor', type: 'Armor', value: '75 Caps', weight: '6.0 lbs' }
]

// Tabs
const tabsList = [
  { id: 'stats', label: 'Stats' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'map', label: 'Map' }
]

// Button handler
const handleClick = (type) => {
  terminalLines.value.push({ 
    type: 'info', 
    text: `${type} button clicked at ${new Date().toLocaleTimeString()}` 
  })
  terminal.value?.scrollToBottom()
}

// Toast handlers
const toastMessages = {
  success: 'Operation completed successfully! All systems nominal.',
  error: 'Critical system failure detected! Immediate action required.',
  warning: 'Warning: Radiation levels approaching dangerous threshold.',
  info: 'System notification: Software update available for download.'
}

const showToast = (severity) => {
  toast[severity](toastMessages[severity], {
    title: `${severity.toUpperCase()} ALERT`,
    duration: 5000
  })
}

const showPositionToast = (position) => {
  const [vertical, horizontal] = position.split('-')
  toast.info(`Toast notification appearing at ${vertical} ${horizontal}`, {
    position,
    title: 'POSITION TEST',
    duration: 4000
  })
}

const showLongToast = () => {
  toast.warning(
    'Vault-Tec Security Protocol Alert: Multiple unauthorized access attempts detected in Sector 7-G. Security teams have been dispatched to investigate. All personnel are advised to remain in designated safe zones until the all-clear signal is given.',
    {
      title: 'SECURITY ALERT',
      duration: 8000,
      position: 'top-center'
    }
  )
}

const showPersistentToast = () => {
  toast.error('This toast will not auto-close. Click the × button to dismiss.', {
    title: 'PERSISTENT ALERT',
    duration: 0,
    position: 'top-right'
  })
}

const showCustomToast = () => {
  toast.success('You have received a new message from the Overseer.', {
    title: 'INCOMING TRANSMISSION',
    duration: 6000,
    position: 'bottom-right'
  })
}

const showNoProgressToast = () => {
  toast.info('This toast has no progress bar, but will still auto-close after 5 seconds.', {
    showProgress: false,
    duration: 5000,
    position: 'top-left'
  })
}

</script>

<style scoped>
.showcase {
  padding: 1rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.toast-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .toast-grid {
    grid-template-columns: 1fr;
  }
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.col h4 {
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: var(--tui-glow);
}

.tab-content {
  min-height: 200px;
}

.tab-content h3 {
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: var(--tui-glow);
}

.tab-content p {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

.info-text {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 0.5rem;
}

.highlight {
  color: var(--tui-primary);
  font-weight: bold;
  margin-right: 0.5rem;
  text-shadow: var(--tui-glow);
}

.feature-list {
  margin: 1rem 0;
  padding-left: 1rem;
}

.feature-list p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.bullet {
  color: var(--tui-primary);
  margin-right: 0.75rem;
  text-shadow: var(--tui-glow);
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style>
