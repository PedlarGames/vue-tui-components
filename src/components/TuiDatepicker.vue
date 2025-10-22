<template>
  <div class="tui-datepicker">
    <label v-if="label" class="datepicker-label">{{ label }}</label>
    <div class="datepicker-input-wrapper">
      <input
        v-model="displayValue"
        type="text"
        class="datepicker-input"
        :placeholder="placeholder"
        @focus="openPicker"
        @blur="handleBlur"
        readonly
      />
      <button
        type="button"
        class="datepicker-toggle"
        @click="togglePicker"
        aria-label="Toggle date picker"
      >
        ▼
      </button>
    </div>
    
    <Transition name="picker-fade">
      <div v-if="isOpen" class="datepicker-popup" @mousedown.prevent>
        <div class="datepicker-header">
          <button type="button" @click="previousMonth" class="nav-button" aria-label="Previous month">◄</button>
          <span class="current-month">{{ currentMonthYear }}</span>
          <button type="button" @click="nextMonth" class="nav-button" aria-label="Next month">►</button>
        </div>
        
        <div class="datepicker-calendar">
          <div class="calendar-weekdays">
            <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
          </div>
          
          <div class="calendar-days">
            <button
              v-for="day in calendarDays"
              :key="day.key"
              type="button"
              class="calendar-day"
              :class="{
                'other-month': !day.currentMonth,
                'selected': isSelected(day),
                'today': isToday(day),
                'in-range': isInRange(day)
              }"
              :disabled="!day.currentMonth"
              @click="selectDate(day)"
            >
              {{ day.date }}
            </button>
          </div>
        </div>
        
        <div class="datepicker-actions">
          <button type="button" @click="clearSelection" class="action-button">Clear</button>
          <button type="button" @click="closePicker" class="action-button primary">Done</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Date, Array, null],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select date'
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  range: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const displayValue = ref('')
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const selectedDate = ref(props.modelValue)
const rangeStart = ref(null)
const rangeEnd = ref(null)

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const currentMonthYear = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const prevLastDay = new Date(currentYear.value, currentMonth.value, 0)
  
  const firstDayOfWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()
  
  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: prevLastDate - i,
      month: currentMonth.value - 1,
      year: currentYear.value,
      currentMonth: false,
      key: `prev-${prevLastDate - i}`
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    days.push({
      date: i,
      month: currentMonth.value,
      year: currentYear.value,
      currentMonth: true,
      key: `current-${i}`
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      month: currentMonth.value + 1,
      year: currentYear.value,
      currentMonth: false,
      key: `next-${i}`
    })
  }
  
  return days
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return props.format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
}

const updateDisplayValue = () => {
  if (props.range && rangeStart.value) {
    if (rangeEnd.value) {
      displayValue.value = `${formatDate(rangeStart.value)} - ${formatDate(rangeEnd.value)}`
    } else {
      displayValue.value = formatDate(rangeStart.value)
    }
  } else if (selectedDate.value) {
    displayValue.value = formatDate(selectedDate.value)
  } else {
    displayValue.value = ''
  }
}

const isSelected = (day) => {
  if (!day.currentMonth) return false
  
  const dayDate = new Date(day.year, day.month, day.date)
  
  if (props.range) {
    if (rangeStart.value && rangeEnd.value) {
      const start = new Date(rangeStart.value)
      const end = new Date(rangeEnd.value)
      start.setHours(0, 0, 0, 0)
      end.setHours(0, 0, 0, 0)
      dayDate.setHours(0, 0, 0, 0)
      return dayDate.getTime() === start.getTime() || dayDate.getTime() === end.getTime()
    }
    return rangeStart.value && dayDate.getTime() === new Date(rangeStart.value).setHours(0, 0, 0, 0)
  }
  
  return selectedDate.value && dayDate.getTime() === new Date(selectedDate.value).setHours(0, 0, 0, 0)
}

const isToday = (day) => {
  if (!day.currentMonth) return false
  const today = new Date()
  return day.date === today.getDate() &&
         day.month === today.getMonth() &&
         day.year === today.getFullYear()
}

const isInRange = (day) => {
  if (!props.range || !rangeStart.value || !rangeEnd.value || !day.currentMonth) return false
  
  const dayDate = new Date(day.year, day.month, day.date)
  const start = new Date(rangeStart.value)
  const end = new Date(rangeEnd.value)
  
  dayDate.setHours(0, 0, 0, 0)
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  
  return dayDate > start && dayDate < end
}

const selectDate = (day) => {
  const selected = new Date(day.year, day.month, day.date)
  
  if (props.range) {
    if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
      rangeStart.value = selected
      rangeEnd.value = null
    } else {
      if (selected < rangeStart.value) {
        rangeEnd.value = rangeStart.value
        rangeStart.value = selected
      } else {
        rangeEnd.value = selected
      }
      emit('update:modelValue', [rangeStart.value, rangeEnd.value])
      emit('change', [rangeStart.value, rangeEnd.value])
    }
  } else {
    selectedDate.value = selected
    emit('update:modelValue', selected)
    emit('change', selected)
    closePicker()
  }
  
  updateDisplayValue()
}

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const openPicker = () => {
  isOpen.value = true
}

const closePicker = () => {
  isOpen.value = false
}

const togglePicker = () => {
  isOpen.value = !isOpen.value
}

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false
  }, 200)
}

const clearSelection = () => {
  selectedDate.value = null
  rangeStart.value = null
  rangeEnd.value = null
  displayValue.value = ''
  emit('update:modelValue', null)
  emit('change', null)
}

watch(() => props.modelValue, (newValue) => {
  if (props.range && Array.isArray(newValue)) {
    rangeStart.value = newValue[0] || null
    rangeEnd.value = newValue[1] || null
  } else {
    selectedDate.value = newValue
  }
  updateDisplayValue()
}, { immediate: true })
</script>

<style scoped>
.tui-datepicker {
  position: relative;
  font-family: var(--tui-font);
  display: inline-block;
  min-width: 250px;
}

.datepicker-label {
  display: block;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.datepicker-input-wrapper {
  display: flex;
  border: 2px solid var(--tui-border);
  background: var(--tui-bg);
  box-shadow: var(--tui-glow);
}

.datepicker-input {
  flex: 1;
  padding: 0.75rem;
  background: transparent;
  border: none;
  color: var(--tui-text);
  font-family: var(--tui-font);
  font-size: 1rem;
  letter-spacing: 1px;
  cursor: pointer;
}

.datepicker-input:focus {
  outline: none;
}

.datepicker-toggle {
  background: none;
  border: none;
  border-left: 2px solid var(--tui-border);
  color: var(--tui-primary);
  padding: 0 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.datepicker-toggle:hover {
  background: var(--tui-primary-transparent-10);
}

.datepicker-popup {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 1000;
  background: var(--tui-bg);
  border: 2px solid var(--tui-border);
  box-shadow: var(--tui-glow), 0 10px 30px rgba(0, 0, 0, 0.5);
  min-width: 300px;
  padding: 1rem;
}

.datepicker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.nav-button {
  background: none;
  border: 2px solid var(--tui-border);
  color: var(--tui-primary);
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: var(--tui-primary);
  color: var(--tui-bg);
}

.current-month {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.datepicker-calendar {
  margin-bottom: 1rem;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.weekday {
  text-align: center;
  font-size: 0.8rem;
  padding: 0.25rem;
  color: var(--tui-primary);
  text-shadow: var(--tui-glow);
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.calendar-day {
  aspect-ratio: 1;
  background: none;
  border: 2px solid var(--tui-border);
  color: var(--tui-text);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.calendar-day:hover:not(:disabled) {
  background: var(--tui-primary);
  color: var(--tui-bg);
  transform: scale(1.1);
}

.calendar-day.other-month {
  opacity: 0.3;
  cursor: default;
}

.calendar-day.today {
  border-color: var(--tui-secondary);
  box-shadow: var(--tui-glow-secondary);
}

.calendar-day.selected {
  background: var(--tui-primary);
  color: var(--tui-bg);
  box-shadow: var(--tui-glow-hover);
}

.calendar-day.in-range {
  background: var(--tui-primary-transparent-20);
}

.datepicker-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding-top: 0.5rem;
  border-top: 2px solid var(--tui-border);
}

.action-button {
  padding: 0.5rem 1rem;
  background: none;
  border: 2px solid var(--tui-border);
  color: var(--tui-text);
  cursor: pointer;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.action-button:hover {
  background: var(--tui-primary-transparent-10);
}

.action-button.primary {
  border-color: var(--tui-primary);
  color: var(--tui-primary);
}

.action-button.primary:hover {
  background: var(--tui-primary);
  color: var(--tui-bg);
}

/* Fade Animation */
.picker-fade-enter-active,
.picker-fade-leave-active {
  transition: all 0.3s ease;
}

.picker-fade-enter-from,
.picker-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
