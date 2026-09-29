<script setup lang="ts">
import { ref } from 'vue'

/*
  User fills in form -> User clicks "Announce Tasting"-> handleSubmit()-> emit('create-tasting', data)-> Parent receives the event-> Parent runs addTasting(data)
*/
// Define the shape of data this form creates
export interface NewTastingData {
  title: string
  dateTime: string
  capacity: number
  lineup: string
}

// event to send to parent through emit
const emit = defineEmits<{
  'create-tasting': [data: NewTastingData]
}>()

// Reactive Form State (Two-Way Binding with v-model)
const title = ref<string>('')
const dateTime = ref<string>('')
const capacity = ref<number>(6)
const lineup = ref<string>('')
const formError = ref<string>('')

function handleSubmit() {
  // Simple validation
  if (!title.value.trim()) {
    formError.value = 'Please provide a tasting title.'
    return
  }
  if (!dateTime.value) {
    formError.value = 'Please select a date and time.'
    return
  }

  // Send the data up to the parent
  emit('create-tasting', {
    title: title.value.trim(),
    dateTime: dateTime.value,
    capacity: capacity.value,
    lineup: lineup.value.trim() || 'No beans specified'
  })

  // Reset the form
  title.value = ''
  dateTime.value = ''
  capacity.value = 6
  lineup.value = ''
  formError.value = ''
}
</script>

<template>
  <div class="card">
    <h2>Schedule a Tasting</h2>
    <p>Schedule a blind cupping session in the back room.</p>

    <!-- @submit.prevent stops the browser from doing a page reload -->
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="tasting-title">Title:</label>
        <input 
          id="tasting-title" 
          v-model="title" 
          type="text" 
          class="form-input" 
          placeholder="e.g. FLEX YOUR BEANS CUP" 
          required
        >
      </div>

      <div class="form-group">
        <label for="tasting-date">Date &amp; Time:</label>
        <input 
          id="tasting-date" 
          v-model="dateTime" 
          type="datetime-local" 
          class="form-input" 
          required
        >
      </div>

      <div class="form-group">
        <label for="tasting-cap">Capacity (Seats):</label>
        <input 
          id="tasting-cap" 
          v-model.number="capacity" 
          type="number" 
          min="2" 
          max="12" 
          class="form-input" 
          required
        >
      </div>

      <div class="form-group">
        <label for="tasting-lineup">Beans in Line-up (4 or 5 coffees):</label>
        <input 
          id="tasting-lineup" 
          v-model="lineup" 
          type="text" 
          class="form-input" 
          placeholder="e.g. Geisha, Worka, Chelbesa, Finca Betulia"
        >
      </div>

      <p v-if="formError" class="form-error">{{ formError }}</p>

      <button type="submit" class="button-primary">Announce Tasting</button>
    </form>
  </div>
</template>

<style scoped>
.form-error {
  color: #ff6b6b;
  font-weight: bold;
}
</style>
