<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBrewNotes } from '../composables/useBrewNote'
import { useCoffeeBag } from '../composables/useCoffeeBags'

const route = useRoute()
const { brewNotes } = useBrewNotes()
const { coffeeBags } = useCoffeeBag()


const filteredNotes = computed(() => {
  const bagId = String(route.params.bagId ?? '')
  return brewNotes.value.filter(note => String(note.coffeeBag) === bagId)
})

function getBeanName(bagId: number) {
  return coffeeBags.value.find(bag => String(bag.id) === String(bagId))?.bean
    ?? 'Unknown bean'
}
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
      <p>Bean: {{ getBeanName(note.coffeeBag) }}</p>
      <p>Method: {{ note.method }}</p>
      <p>Dose: {{ note.dose }}</p>
      <p>Result: {{ note.result }}</p>
    </article>
  </main>
</template>