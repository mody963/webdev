<script setup lang="ts">
import { ref } from 'vue'
import HostTastingForm, { type NewTastingData } from './components/HostTastingForm.vue'

// Reactive array of scheduled tastings
const announcedTastings = ref<NewTastingData[]>([
  {
    title: 'Winter Cupping 2026',
    dateTime: '2026-09-13T19:30',
    capacity: 6,
    lineup: 'Geisha, Worka, Chelbesa, Finca Betulia'
  }
])

const feedback = ref<string>('')

function handleCreateTasting(newTasting: NewTastingData) {
  announcedTastings.value.push(newTasting)
  feedback.value = `Tasting "${newTasting.title}" was announced successfully!`
}
</script>

<template>
  <div class="page-container">
    <header>
      <h1>Zetsel - Coffee Tastings</h1>
      <hr />
    </header>

    <main>
      <!--Feedback banner using your highlight card style -->
      <p v-if="feedback" class="card card--highlight" style="font-weight: bold;">
        {{ feedback }}
      </p>

      <!--The Host Form Component -->
      <HostTastingForm @create-tasting="handleCreateTasting" />

      <hr />

      <!-- Preview of Announced Tastings -->
      <h2>Recently Announced Tastings</h2>
      <div v-if="announcedTastings.length === 0">
        <p>No tastings scheduled yet.</p>
      </div>

      <div 
        v-for="(tasting, index) in announcedTastings" 
        :key="index" 
        class="card"
      >
        <h3>{{ tasting.title }}</h3>
        <p><strong>Date &amp; Time:</strong> {{ tasting.dateTime.replace('T', ' at ') }}</p>
        <p><strong>Capacity:</strong> {{ tasting.capacity }} seats</p>
        <p><strong>Line-up:</strong> {{ tasting.lineup }}</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>