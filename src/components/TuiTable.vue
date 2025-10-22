<template>
  <div class="tui-table-wrapper">
    <table class="tui-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" class="table-header">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index" class="table-row">
          <td v-for="column in columns" :key="column.key" class="table-cell">
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.tui-table-wrapper {
  border: 2px solid var(--tui-border);
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.tui-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--tui-bg-light);
}

.table-header {
  border-bottom: 2px solid var(--tui-border);
  padding: 1rem;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  background: var(--tui-bg);
  text-shadow: var(--tui-glow);
}

.table-row {
  border-bottom: 1px solid var(--tui-primary-transparent-20);
  transition: background 0.2s ease;
}

.table-row:hover {
  background: var(--tui-primary-transparent-10);
}

.table-cell {
  padding: 0.75rem 1rem;
  border-right: 1px solid var(--tui-primary-transparent-10);
}

.table-cell:last-child {
  border-right: none;
}
</style>
