<template>
  <div class="animation-examples">
    <!-- Example 1: Welcome Screen with Typewriter -->
    <TuiCard title="Welcome Screen Example" fade-in glowing>
      <TuiText 
        text="VAULT-TEC CORPORATION - SECURING YOUR FUTURE"
        typewriter
        :typewriter-speed="40"
        prefix="►"
        show-cursor
      />
      <TuiText 
        text="Initializing Pip-Boy interface..."
        typewriter
        :typewriter-speed="30"
        :typewriter-delay="2500"
        prefix="►"
      />
      <TuiButton 
        label="Continue" 
        pulse 
        style="margin-top: 2rem;"
      />
    </TuiCard>

    <!-- Example 2: Staggered Card Animations -->
    <div style="margin-top: 2rem;">
      <h2>Staggered Card Entry</h2>
      <TuiCard 
        title="First Card" 
        slide-in 
        :animation-delay="0"
      >
        <p>This card appears first</p>
      </TuiCard>
      
      <TuiCard 
        title="Second Card" 
        slide-in 
        :animation-delay="200"
      >
        <p>This card appears 200ms later</p>
      </TuiCard>
      
      <TuiCard 
        title="Third Card" 
        slide-in 
        :animation-delay="400"
      >
        <p>This card appears 400ms later</p>
      </TuiCard>
    </div>

    <!-- Example 3: Boot Sequence Terminal -->
    <TuiCard title="Boot Sequence" fade-in :animation-delay="600">
      <TuiTerminalTypewriter
        title="SYSTEM BOOT"
        status="READY"
        typing-status="INITIALIZING"
        :lines="bootSequence"
        :typewriter-speed="20"
        :typewriter-stagger="400"
        :interactive="true"
      />
    </TuiCard>

    <!-- Example 4: Action Buttons -->
    <TuiCard title="Interactive Actions" slide-in :animation-delay="800">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <TuiButton label="Normal Action" />
        <TuiButton label="Important Action" pulse />
        <TuiButton label="Critical Action" variant="danger" pulse />
      </div>
    </TuiCard>

    <!-- Example 5: Multi-line Typewriter -->
    <TuiCard title="Mission Brief" fade-in :animation-delay="1000">
      <TuiText 
        text="MISSION: Investigate Vault 111"
        typewriter
        :typewriter-speed="35"
        prefix="►"
      />
      <TuiText 
        text="OBJECTIVE: Locate and secure resources"
        typewriter
        :typewriter-speed="35"
        :typewriter-delay="1500"
        prefix="►"
      />
      <TuiText 
        text="STATUS: Active"
        typewriter
        :typewriter-speed="35"
        :typewriter-delay="3000"
        prefix="►"
      />
    </TuiCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TuiCard from '../src/components/TuiCard.vue'
import TuiText from '../src/components/TuiText.vue'
import TuiButton from '../src/components/TuiButton.vue'
import TuiTerminalTypewriter from '../src/components/TuiTerminalTypewriter.vue'

const bootSequence = ref([
  { type: 'info', text: 'BIOS v2.4.1 initialized' },
  { type: 'info', text: 'Loading Vault-Tec Operating System...' },
  { type: 'success', text: 'Memory check: 4096KB OK' },
  { type: 'success', text: 'Peripheral devices: OK' },
  { type: 'info', text: 'Connecting to V.A.T.S...' },
  { type: 'success', text: 'System ready. Welcome, Overseer.' }
])
</script>

<style scoped>
.animation-examples {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  color: var(--tui-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  text-shadow: var(--tui-glow);
}
</style>
