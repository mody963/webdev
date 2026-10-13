
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBrewNotes } from '../composables/useBrewNote'

const { brewNotes } = useBrewNotes()

const selectedBean = ref('')

const beanNames = computed(() => {
  return [...new Set(
    brewNotes.value.map(note => note.beanName)
  )].sort()
})

const filteredNotes = computed(() => {
  if (!selectedBean.value) {
    return brewNotes.value
  }

  return brewNotes.value.filter(
    note => note.beanName === selectedBean.value
  )
})
</script>

<template>
  <div class="page-container">
    <header>
      <h1>Brew notes</h1>
      <hr />
    </header>

    <main>
      <label for="bean-filter">Filter by bean:</label>

      <select
        id="bean-filter"
        v-model="selectedBean"
        class="form-input"
      >
        <option value="">All beans</option>
        <option
          v-for="bean in beanNames"
          :key="bean"
          :value="bean"
        >
          {{ bean }}
        </option>
      </select>

      <p v-if="filteredNotes.length === 0">
        No brew notes found.
      </p>

      <section
        v-for="note in filteredNotes"
        :key="note.id"
        class="brew-note"
      >
      <article class="card">
        <table class="data-table">
        <h2>{{ note.title }}</h2>
        <p><strong>Bean:</strong> {{ note.beanName }}</p>
        <p><strong>Method:</strong> {{ note.method }}</p>
        <p><strong>Dose:</strong> {{ note.dose }} g</p>
        <p><strong>Grind:</strong> {{ note.grind }}</p>
        <p><strong>Result:</strong> {{ note.result }}</p>
        </table>
      </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}
</style>
