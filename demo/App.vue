<template>
  <div class="app-container">
    <TuiHeader title="TUI COMPONENT LIBRARY" subtitle="PIP-BOY INTERFACE SYSTEM V1.0" />
    <TuiThemeSwitcher />
    <ComponentShowcase />
  </div>
</template>

<script setup>
import TuiHeader from '../src/components/TuiHeader.vue'
import TuiThemeSwitcher from '../src/components/TuiThemeSwitcher.vue'
import ComponentShowcase from './ComponentShowcase.vue'
</script>

<style scoped>
.app-container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
