<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBrewNotes } from '../composables/useBrewNote'

const route = useRoute()
const { brewNotes } = useBrewNotes()


const filteredNotes = computed(() => {
  const beanName = String(route.query.beanName ?? '')
  const roaster = String(route.query.roaster ?? '')

  return brewNotes.value.filter(
    note => note.beanName === beanName && note.roaster === roaster
  )
})
</script>

<template>
  <header>
    <h1>Brew notes</h1>
    <hr />
  </header>
  <main>

    <p v-if="filteredNotes.length === 0">
      No brew notes for this coffee bag yet.
    </p>

    <article
      v-for="note in filteredNotes"
      :key="note.id"
      class="card"
    >
      <h2>{{ note.title }}</h2>
      <p>Bean: {{ note.beanName }}</p>
      <p>Method: {{ note.method }}</p>
      <p>Dose: {{ note.dose }}</p>
      <p>Result: {{ note.result }}</p>
    </article>
  </main>
</template>