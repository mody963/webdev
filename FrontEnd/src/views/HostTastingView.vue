<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useTastings } from '../composables/useTastings'

const router = useRouter()
const { addTasting } = useTastings()

const title = ref('')
const host = ref('Mo')
const dateTime = ref('')
const capacity = ref(6)
const lineup = ref('')
const formError = ref('')
const feedback = ref('')

function handleSubmit() {
  formError.value = ''
  feedback.value = ''

  if (!title.value.trim()) {
    formError.value = 'Please provide a tasting title.'
    return
  }
  if (!dateTime.value) {
    formError.value = 'Please select a date and time.'
    return
  }

  addTasting({
    title: title.value.trim(),
    host: host.value.trim(),
    dateTime: dateTime.value,
    capacity: capacity.value,
    lineup: lineup.value.trim() || 'No beans specified'
  })

  feedback.value = 'Tasting session successfully scheduled!'

  // optional: redirect back to tastings overview after a brief moment
  setTimeout(() => {
    router.push('/tastings')
  }, 1000)
}
</script>

<template>
  <div class="page-container">
    <header>
      <p>
        <RouterLink to="/tastings" class="back-link">&larr; Back to Tastings</RouterLink>
      </p>
      <h1>Host a Tasting Session</h1>
    </header>

    <p class="intro">
      Schedule a blind cupping session in the back room and pick your beans.
    </p>

    <hr>

    <div class="card">
      <h2>Session Details</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Tasting Title</label>
          <input 
            id="title" 
            v-model="title" 
            type="text" 
            class="form-input" 
            placeholder="e.g. Ethiopian Washed vs Natural" 
            required
          >
        </div>

        <div class="form-group">
          <label for="host">Host Member</label>
          <input 
            id="host" 
            v-model="host" 
            type="text" 
            class="form-input" 
            required
          >
        </div>

        <div class="form-group">
          <label for="datetime">Date &amp; Time</label>
          <input 
            id="datetime" 
            v-model="dateTime" 
            type="datetime-local" 
            class="form-input" 
            required
          >
        </div>

        <div class="form-group">
          <label for="capacity">Table Capacity (Seats)</label>
          <input 
            id="capacity" 
            v-model.number="capacity" 
            type="number" 
            min="2" 
            max="12" 
            class="form-input" 
            required
          >
        </div>

        <div class="form-group">
          <label for="lineup">Beans in Line-up (4 to 5 coffees)</label>
          <input 
            id="lineup" 
            v-model="lineup" 
            type="text" 
            class="form-input" 
            placeholder="e.g. Geisha, Worka, Chelbesa, Finca Betulia"
          >
        </div>

        <p v-if="formError" class="form-error">
          {{ formError }}
        </p>

        <p v-if="feedback" class="card card--highlight" style="font-weight: bold;">
          {{ feedback }}
        </p>

        <button type="submit" class="button-primary">
          + Announce Tasting
        </button>
      </form>
    </div>

    <hr>
    <p class="footer-text">Coffee Tastings &copy; the club</p>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
.form-error {
  color: #ff6b6b;
  font-weight: bold;
}
</style>