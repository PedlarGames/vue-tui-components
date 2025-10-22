<template>
  <div class="new-components-showcase">
    <TuiCard title="Additional Components Gallery" glowing>
      <p style="margin-bottom: 1rem;">Explore the newly added components to the TUI library.</p>
    </TuiCard>

    <!-- Tooltips -->
    <TuiCard title="Tooltips" glowing>
      <div class="demo-section">
        <div class="tooltip-examples">
          <TuiTooltip text="This is a tooltip on top" position="top">
            <TuiButton label="Top Tooltip" />
          </TuiTooltip>
          
          <TuiTooltip text="This is a tooltip on bottom" position="bottom">
            <TuiButton label="Bottom Tooltip" />
          </TuiTooltip>
          
          <TuiTooltip text="This is a tooltip on left" position="left">
            <TuiButton label="Left Tooltip" />
          </TuiTooltip>
          
          <TuiTooltip text="This is a tooltip on right" position="right">
            <TuiButton label="Right Tooltip" />
          </TuiTooltip>
          
          <TuiTooltip text="<strong>Rich HTML</strong> content with <em>formatting</em>" :rich="true">
            <TuiButton label="Rich Tooltip" variant="info" />
          </TuiTooltip>
        </div>
      </div>
    </TuiCard>

    <!-- Dialog -->
    <TuiCard title="Dialogs" glowing>
      <div class="demo-section">
        <div class="button-group">
          <TuiButton label="Open Basic Dialog" @click="showBasicDialog = true" />
          <TuiButton label="Open Confirmation" @click="showConfirmDialog = true" variant="warning" />
          <TuiButton label="Open Custom Dialog" @click="showCustomDialog = true" variant="info" />
        </div>
        
        <TuiDialog v-model="showBasicDialog" title="Basic Dialog">
          <p>This is a basic dialog with default settings.</p>
          <p>Click outside or use the close button to dismiss.</p>
        </TuiDialog>
        
        <TuiDialog 
          v-model="showConfirmDialog" 
          title="Confirm Action"
          confirm-variant="danger"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <p>Are you sure you want to proceed with this action?</p>
          <p style="color: var(--tui-warning);">This action cannot be undone!</p>
        </TuiDialog>
        
        <TuiDialog 
          v-model="showCustomDialog" 
          title="Custom Dialog"
          :show-actions="false"
        >
          <p style="margin-bottom: 1rem;">This dialog has custom footer content.</p>
          <template #footer>
            <div style="display: flex; justify-content: space-between; width: 100%;">
              <TuiButton label="Learn More" variant="info" />
              <TuiButton label="Close" @click="showCustomDialog = false" />
            </div>
          </template>
        </TuiDialog>
      </div>
    </TuiCard>

    <!-- Chips -->
    <TuiCard title="Chips" glowing>
      <div class="demo-section">
        <h4 style="margin-bottom: 0.5rem;">Basic Chips</h4>
        <div class="chip-examples">
          <TuiChip label="Default Chip" />
          <TuiChip label="Success" variant="success" />
          <TuiChip label="Error" variant="error" />
          <TuiChip label="Warning" variant="warning" />
          <TuiChip label="Info" variant="info" />
        </div>
        
        <h4 style="margin: 1rem 0 0.5rem;">Sizes</h4>
        <div class="chip-examples">
          <TuiChip label="Small" size="small" />
          <TuiChip label="Medium" size="medium" />
          <TuiChip label="Large" size="large" />
        </div>
        
        <h4 style="margin: 1rem 0 0.5rem;">With Icons & Closable</h4>
        <div class="chip-examples">
          <TuiChip label="User" icon="👤" closable @close="handleChipClose('User')" />
          <TuiChip label="Settings" icon="⚙" closable @close="handleChipClose('Settings')" />
          <TuiChip label="Star" icon="★" variant="warning" closable @close="handleChipClose('Star')" />
        </div>
      </div>
    </TuiCard>

    <!-- OTP Input -->
    <TuiCard title="OTP Input" glowing>
      <div class="demo-section">
        <div style="margin-bottom: 1rem;">
          <TuiOTP v-model="otpValue" :length="6" @complete="handleOtpComplete" :autoFocus="false"/>
          <p v-if="otpValue" style="margin-top: 1rem;">Current value: <strong>{{ otpValue }}</strong></p>
        </div>
        
        <div>
          <TuiOTP v-model="otpError" :length="4" :error="otpErrorMessage" :autoFocus="false"/>
        </div>
      </div>
    </TuiCard>

    <!-- Slider -->
    <TuiCard title="Sliders" glowing>
      <div class="demo-section">
        <TuiSlider v-model="sliderValue" label="Volume" :min="0" :max="100" suffix="%" />
        <TuiSlider v-model="sliderValue2" label="Temperature" :min="-10" :max="40" suffix="°C" />
        <TuiSlider v-model="sliderValue3" label="Progress" :min="0" :max="10" :step="1" />
      </div>
    </TuiCard>

    <!-- Carousel -->
    <TuiCard title="Carousel" glowing>
      <div class="demo-section">
        <TuiCarousel :items="carouselItems" :autoplay="true" :interval="4000" />
      </div>
    </TuiCard>

    <!-- Badges -->
    <TuiCard title="Badges" glowing>
      <div class="demo-section">
        <h4 style="margin-bottom: 0.5rem;">With Content</h4>
        <div class="badge-examples">
          <TuiBadge content="5" variant="error">
            <TuiButton label="Messages" />
          </TuiBadge>
          
          <TuiBadge content="99" variant="warning" :max="99">
            <TuiButton label="Notifications" />
          </TuiBadge>
          
          <TuiBadge content="150" variant="info" :max="99">
            <TuiButton label="Updates" />
          </TuiBadge>
        </div>
        
        <h4 style="margin: 1rem 0 0.5rem;">Dot Indicators</h4>
        <div class="badge-examples">
          <TuiBadge dot variant="success">
            <TuiAvatar initials="JD" />
          </TuiBadge>
          
          <TuiBadge dot variant="error" placement="bottom-right">
            <TuiAvatar initials="AB" />
          </TuiBadge>
        </div>
        
        <h4 style="margin: 1rem 0 0.5rem;">Standalone</h4>
        <div class="badge-examples">
          <TuiBadge content="NEW" variant="success" />
          <TuiBadge content="BETA" variant="warning" />
          <TuiBadge content="HOT" variant="error" />
        </div>
      </div>
    </TuiCard>

    <!-- Banner -->
    <TuiCard title="Banners" glowing>
      <div class="demo-section">
        <TuiBanner 
          v-model="showBanner1"
          message="System update available. Click to learn more."
          variant="info"
          icon="ℹ"
          link-text="Learn More"
          link-url="#"
        />
        
        <TuiBanner 
          v-model="showBanner2"
          title="Warning"
          message="Your session will expire in 5 minutes."
          variant="warning"
          icon="⚠"
        />
        
        <TuiBanner 
          v-model="showBanner3"
          title="Success"
          message="Your changes have been saved successfully."
          variant="success"
          icon="✓"
        />
        
        <div class="button-group" style="margin-top: 1rem;">
          <TuiButton label="Show All Banners" @click="resetBanners" variant="secondary" />
        </div>
      </div>
    </TuiCard>

    <!-- Avatars -->
    <TuiCard title="Avatars" glowing>
      <div class="demo-section">
        <h4 style="margin-bottom: 0.5rem;">Sizes</h4>
        <div class="avatar-examples">
          <TuiAvatar initials="XS" size="small" />
          <TuiAvatar initials="MD" size="medium" />
          <TuiAvatar initials="LG" size="large" />
          <TuiAvatar initials="XL" size="xlarge" />
        </div>
        
        <h4 style="margin: 1rem 0 0.5rem;">Shapes & Status</h4>
        <div class="avatar-examples">
          <TuiAvatar initials="JD" shape="circle" status="online" />
          <TuiAvatar initials="AB" shape="circle" status="away" />
          <TuiAvatar initials="CD" shape="square" status="busy" />
          <TuiAvatar initials="EF" shape="square" status="offline" />
        </div>
        
        <h4 style="margin: 1rem 0 0.5rem;">With Icons</h4>
        <div class="avatar-examples">
          <TuiAvatar icon="👤" />
          <TuiAvatar icon="⚙" />
          <TuiAvatar icon="★" />
        </div>
      </div>
    </TuiCard>

    <!-- Icons -->
    <TuiCard title="Icons" glowing>
      <div class="demo-section">
        <h4 style="margin-bottom: 0.5rem;">Unicode Icons - Sizes</h4>
        <div class="icon-examples">
          <TuiIcon icon="★" size="small" />
          <TuiIcon icon="★" size="medium" />
          <TuiIcon icon="★" size="large" />
          <TuiIcon icon="★" size="xlarge" />
        </div>
        
        <h4 style="margin: 1rem 0 0.5rem;">Unicode Icons - Variants</h4>
        <div class="icon-examples">
          <TuiIcon icon="●" variant="primary" size="large" />
          <TuiIcon icon="●" variant="success" size="large" />
          <TuiIcon icon="●" variant="error" size="large" />
          <TuiIcon icon="●" variant="warning" size="large" />
          <TuiIcon icon="●" variant="info" size="large" />
        </div>
        
        <h4 style="margin: 1rem 0 0.5rem;">Unicode Icons - Animations</h4>
        <div class="icon-examples">
          <TuiIcon icon="◐" spin size="large" aria-label="Loading" />
          <TuiIcon icon="♥" pulse variant="error" size="large" aria-label="Heartbeat" />
        </div>

        <h4 style="margin: 1.5rem 0 0.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">Material Icons - Filled (Default)</h4>
        <div class="icon-examples">
          <TuiIcon icon="home" type="material" size="small" />
          <TuiIcon icon="favorite" type="material" size="medium" variant="error" />
          <TuiIcon icon="settings" type="material" size="large" variant="primary" />
          <TuiIcon icon="search" type="material" size="xlarge" />
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Material Icons - Outlined</h4>
        <div class="icon-examples">
          <TuiIcon icon="home" type="material" materialVariant="outlined" size="large" />
          <TuiIcon icon="favorite" type="material" materialVariant="outlined" size="large" variant="error" />
          <TuiIcon icon="settings" type="material" materialVariant="outlined" size="large" variant="primary" />
          <TuiIcon icon="search" type="material" materialVariant="outlined" size="large" />
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Material Icons - Round</h4>
        <div class="icon-examples">
          <TuiIcon icon="home" type="material" materialVariant="round" size="large" />
          <TuiIcon icon="favorite" type="material" materialVariant="round" size="large" variant="error" />
          <TuiIcon icon="settings" type="material" materialVariant="round" size="large" variant="primary" />
          <TuiIcon icon="search" type="material" materialVariant="round" size="large" />
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Material Icons - Sharp</h4>
        <div class="icon-examples">
          <TuiIcon icon="home" type="material" materialVariant="sharp" size="large" />
          <TuiIcon icon="favorite" type="material" materialVariant="sharp" size="large" variant="error" />
          <TuiIcon icon="settings" type="material" materialVariant="sharp" size="large" variant="primary" />
          <TuiIcon icon="search" type="material" materialVariant="sharp" size="large" />
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Material Icons - Common Examples</h4>
        <div class="icon-examples">
          <TuiIcon icon="check_circle" type="material" variant="success" size="large" />
          <TuiIcon icon="error" type="material" variant="error" size="large" />
          <TuiIcon icon="warning" type="material" variant="warning" size="large" />
          <TuiIcon icon="info" type="material" variant="info" size="large" />
          <TuiIcon icon="delete" type="material" size="large" />
          <TuiIcon icon="edit" type="material" variant="primary" size="large" />
          <TuiIcon icon="visibility" type="material" size="large" />
          <TuiIcon icon="download" type="material" size="large" />
        </div>

        <h4 style="margin: 1rem 0 0.5rem;">Material Icons - With Animations</h4>
        <div class="icon-examples">
          <TuiIcon icon="refresh" type="material" spin size="large" variant="primary" aria-label="Refreshing" />
          <TuiIcon icon="favorite" type="material" pulse variant="error" size="large" aria-label="Heartbeat" />
        </div>
      </div>
    </TuiCard>

    <!-- Timeline -->
    <TuiCard title="Timeline" glowing>
      <div class="demo-section">
        <h4 style="margin-bottom: 1rem;">Vertical Timeline</h4>
        <TuiTimeline :items="timelineItems" orientation="vertical" />
        
        <h4 style="margin: 2rem 0 1rem;">Horizontal Timeline</h4>
        <TuiTimeline :items="timelineItemsShort" orientation="horizontal" />
      </div>
    </TuiCard>

    <!-- Images -->
    <TuiCard title="Images" glowing>
      <div class="demo-section">
        <h4 style="margin-bottom: 0.5rem;">With Caption & Overlay</h4>
        <div style="max-width: 400px; margin-bottom: 1rem;">
          <TuiImage 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23ffb000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='36' fill='%230a0a0a'%3ETUI IMAGE%3C/text%3E%3C/svg%3E"
            alt="Sample image"
            caption="Terminal User Interface"
            overlay
          />
        </div>
        
        <h4 style="margin-bottom: 0.5rem;">Aspect Ratios</h4>
        <div class="image-grid">
          <TuiImage 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23ffb000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='48' fill='%230a0a0a'%3E1:1%3C/text%3E%3C/svg%3E"
            aspect-ratio="1:1"
            caption="1:1 Square"
          />
          <TuiImage 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2300ff00'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='48' fill='%230a0a0a'%3E4:3%3C/text%3E%3C/svg%3E"
            aspect-ratio="4:3"
            caption="4:3 Classic"
          />
          <TuiImage 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%2300ccff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='48' fill='%230a0a0a'%3E16:9%3C/text%3E%3C/svg%3E"
            aspect-ratio="16:9"
            caption="16:9 Widescreen"
          />
        </div>
      </div>
    </TuiCard>

    <!-- Datepicker -->
    <TuiCard title="Date Picker" glowing>
      <div class="demo-section">
        <div style="margin-bottom: 1.5rem;">
          <TuiDatepicker 
            v-model="selectedDate"
            label="Select Date"
            placeholder="Choose a date"
            @change="handleDateChange"
          />
          <p v-if="selectedDate" style="margin-top: 0.5rem;">
            Selected: <strong>{{ formatSelectedDate(selectedDate) }}</strong>
          </p>
        </div>
        
        <div>
          <TuiDatepicker 
            v-model="dateRange"
            label="Select Date Range"
            placeholder="Choose date range"
            :range="true"
            @change="handleRangeChange"
          />
          <p v-if="dateRange && dateRange[0]" style="margin-top: 0.5rem;">
            Range: <strong>{{ formatSelectedDate(dateRange[0]) }} - {{ dateRange[1] ? formatSelectedDate(dateRange[1]) : '...' }}</strong>
          </p>
        </div>
      </div>
    </TuiCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TuiCard from '../src/components/TuiCard.vue'
import TuiButton from '../src/components/TuiButton.vue'
import TuiTooltip from '../src/components/TuiTooltip.vue'
import TuiDialog from '../src/components/TuiDialog.vue'
import TuiChip from '../src/components/TuiChip.vue'
import TuiOTP from '../src/components/TuiOTP.vue'
import TuiSlider from '../src/components/TuiSlider.vue'
import TuiCarousel from '../src/components/TuiCarousel.vue'
import TuiBadge from '../src/components/TuiBadge.vue'
import TuiBanner from '../src/components/TuiBanner.vue'
import TuiAvatar from '../src/components/TuiAvatar.vue'
import TuiIcon from '../src/components/TuiIcon.vue'
import TuiTimeline from '../src/components/TuiTimeline.vue'
import TuiImage from '../src/components/TuiImage.vue'
import TuiDatepicker from '../src/components/TuiDatepicker.vue'

// Dialog states
const showBasicDialog = ref(false)
const showConfirmDialog = ref(false)
const showCustomDialog = ref(false)

// OTP states
const otpValue = ref('')
const otpError = ref('')
const otpErrorMessage = ref('Invalid OTP code')

// Slider states
const sliderValue = ref(50)
const sliderValue2 = ref(20)
const sliderValue3 = ref(5)

// Carousel items - using data URIs to avoid external dependencies
const carouselItems = ref([
  { 
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect width="800" height="400" fill="%23ffb000"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="48" fill="%230a0a0a"%3ESLIDE 1%3C/text%3E%3C/svg%3E',
    caption: 'WELCOME TO THE VAULT'
  },
  { 
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect width="800" height="400" fill="%2300ff00"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="48" fill="%230a0a0a"%3ESLIDE 2%3C/text%3E%3C/svg%3E',
    caption: 'EXPLORE NEW FEATURES'
  },
  { 
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect width="800" height="400" fill="%2300ccff"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="48" fill="%230a0a0a"%3ESLIDE 3%3C/text%3E%3C/svg%3E',
    caption: 'BUILD THE FUTURE'
  }
])

// Banner states
const showBanner1 = ref(true)
const showBanner2 = ref(true)
const showBanner3 = ref(true)

// Timeline items
const timelineItems = ref([
  {
    title: 'Project Initialized',
    description: 'Repository created and initial setup completed',
    timestamp: '2025-01-15 10:00',
    icon: '●',
    active: false
  },
  {
    title: 'Components Development',
    description: 'Built core TUI components with retro styling',
    timestamp: '2025-02-01 14:30',
    icon: '●',
    active: false
  },
  {
    title: 'Theme System',
    description: 'Implemented multi-theme support with amber and green themes',
    timestamp: '2025-03-10 09:15',
    icon: '●',
    active: false
  },
  {
    title: 'Current Phase',
    description: 'Adding advanced components and enhancing functionality',
    timestamp: '2025-10-22 16:45',
    icon: '★',
    active: true
  }
])

const timelineItemsShort = ref([
  { title: 'Start', icon: '●', timestamp: 'Q1 2025' },
  { title: 'Development', icon: '●', timestamp: 'Q2 2025' },
  { title: 'Testing', icon: '●', timestamp: 'Q3 2025' },
  { title: 'Launch', icon: '★', timestamp: 'Q4 2025', active: true }
])

// Datepicker states
const selectedDate = ref(null)
const dateRange = ref([])

// Event handlers
const handleConfirm = () => {
  console.log('Confirmed!')
}

const handleCancel = () => {
  console.log('Cancelled!')
}

const handleChipClose = (label) => {
  console.log(`Chip "${label}" closed`)
}

const handleOtpComplete = (value) => {
  console.log('OTP Complete:', value)
}

const resetBanners = () => {
  showBanner1.value = true
  showBanner2.value = true
  showBanner3.value = true
}

const handleDateChange = (date) => {
  console.log('Date selected:', date)
}

const handleRangeChange = (range) => {
  console.log('Date range selected:', range)
}

const formatSelectedDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.new-components-showcase {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tooltip-examples,
.chip-examples,
.badge-examples,
.avatar-examples,
.icon-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

h4 {
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--tui-primary);
}
</style>
