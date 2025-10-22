<template>
  <div class="tui-theme-switcher">
    <div class="theme-switcher-header">
      <span class="corner">┌</span>
      <span class="line"></span>
      <span class="title">DISPLAY SETTINGS</span>
      <span class="line"></span>
      <span class="corner">┐</span>
    </div>
    
    <div class="theme-switcher-body">
      <div class="setting-group">
        <label class="setting-label">
          <span class="label-bracket">&gt;</span> COLOR SCHEME
        </label>
        <div class="theme-buttons">
          <button 
            class="theme-button"
            :class="{ active: currentTheme === 'amber' }"
            @click="setTheme('amber')"
          >
            <span class="theme-indicator amber"></span>
            AMBER
          </button>
          <button 
            class="theme-button"
            :class="{ active: currentTheme === 'green' }"
            @click="setTheme('green')"
          >
            <span class="theme-indicator green"></span>
            GREEN
          </button>
          <button 
            class="theme-button"
            :class="{ active: currentTheme === 'greyscale' }"
            @click="setTheme('greyscale')"
          >
            <span class="theme-indicator greyscale"></span>
            GREYSCALE
          </button>
        </div>
      </div>

      <div class="setting-group">
        <label class="setting-label">
          <span class="label-bracket">&gt;</span> DISPLAY EFFECTS
        </label>
        <div class="toggle-group">
          <label class="toggle-option">
            <input 
              type="checkbox" 
              v-model="scanlines"
              @change="toggleScanlines"
              class="toggle-input"
            />
            <span class="toggle-box">
              <span v-if="scanlines">✓</span>
              <span v-else>✗</span>
            </span>
            <span class="toggle-label">SCANLINES</span>
          </label>

          <label class="toggle-option">
            <input 
              type="checkbox" 
              v-model="flicker"
              @change="toggleFlicker"
              class="toggle-input"
            />
            <span class="toggle-box">
              <span v-if="flicker">✓</span>
              <span v-else>✗</span>
            </span>
            <span class="toggle-label">CRT FLICKER</span>
          </label>

          <label class="toggle-option">
            <input 
              type="checkbox" 
              v-model="glow"
              @change="toggleGlow"
              class="toggle-input"
            />
            <span class="toggle-box">
              <span v-if="glow">✓</span>
              <span v-else>✗</span>
            </span>
            <span class="toggle-label">GLOW EFFECT</span>
          </label>
        </div>
      </div>
    </div>

    <div class="theme-switcher-footer">
      <span class="corner">└</span>
      <span class="line"></span>
      <span class="corner">┘</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTheme = ref('amber')
const scanlines = ref(true)
const flicker = ref(true)
const glow = ref(true)

const setTheme = (theme) => {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('tui-theme', theme)
}

const toggleScanlines = () => {
  document.body.setAttribute('data-scanlines', scanlines.value.toString())
  localStorage.setItem('tui-scanlines', scanlines.value.toString())
}

const toggleFlicker = () => {
  document.body.setAttribute('data-flicker', flicker.value.toString())
  localStorage.setItem('tui-flicker', flicker.value.toString())
}

const toggleGlow = () => {
  document.documentElement.setAttribute('data-glow', glow.value.toString())
  localStorage.setItem('tui-glow', glow.value.toString())
}

onMounted(() => {
  // Load saved preferences
  const savedTheme = localStorage.getItem('tui-theme') || 'amber'
  const savedScanlines = localStorage.getItem('tui-scanlines')
  const savedFlicker = localStorage.getItem('tui-flicker')
  const savedGlow = localStorage.getItem('tui-glow')

  currentTheme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)

  if (savedScanlines !== null) {
    scanlines.value = savedScanlines === 'true'
    document.body.setAttribute('data-scanlines', savedScanlines)
  }

  if (savedFlicker !== null) {
    flicker.value = savedFlicker === 'true'
    document.body.setAttribute('data-flicker', savedFlicker)
  }

  if (savedGlow !== null) {
    glow.value = savedGlow === 'true'
    document.documentElement.setAttribute('data-glow', savedGlow)
  }
})
</script>

<style scoped>
.tui-theme-switcher {
  border: 2px solid var(--tui-border);
  background: var(--tui-bg-light);
  margin-bottom: 2rem;
  box-shadow: var(--tui-glow);
}

.theme-switcher-header,
.theme-switcher-footer {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}

.corner {
  color: var(--tui-primary);
  font-size: 1.2rem;
}

.line {
  flex: 1;
  height: 2px;
  background: var(--tui-border);
  margin: 0 0.5rem;
}

.title {
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: var(--tui-glow);
  padding: 0 1rem;
}

.theme-switcher-body {
  padding: 1.5rem;
}

.setting-group {
  margin-bottom: 1.5rem;
}

.setting-group:last-child {
  margin-bottom: 0;
}

.setting-label {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.label-bracket {
  color: var(--tui-primary);
  margin-right: 0.5rem;
  text-shadow: var(--tui-glow);
}

.theme-buttons {
  display: flex;
  gap: 1rem;
}

.theme-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--tui-font);
  font-size: 1rem;
  color: var(--tui-text);
  background: var(--tui-bg);
  border: 2px solid var(--tui-border);
  padding: 0.75rem 1rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.theme-button:hover {
  opacity: 0.8;
  transform: scale(1.02);
}

.theme-button.active {
  opacity: 1;
  background: var(--tui-primary-transparent-10);
  box-shadow: inset var(--tui-glow);
}

.theme-indicator {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: relative;
}

.theme-indicator.amber {
  background: #ffb000;
  box-shadow: 0 0 5px #ffb000, 0 0 10px #ffb000;
}

.theme-indicator.green {
  background: #00ff00;
  box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
}

.theme-indicator.greyscale {
  background: #cccccc;
  box-shadow: 0 0 5px #cccccc, 0 0 10px #cccccc;
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.toggle-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.toggle-option:hover {
  border-color: var(--tui-border);
  background: var(--tui-primary-transparent-5);
}

.toggle-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.toggle-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid var(--tui-border);
  color: var(--tui-primary);
  font-size: 1rem;
  font-weight: bold;
  text-shadow: var(--tui-glow);
  transition: all 0.2s ease;
}

.toggle-option:hover .toggle-box {
  box-shadow: var(--tui-glow);
}

.toggle-label {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .theme-buttons {
    flex-direction: column;
  }
}
</style>
