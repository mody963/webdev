<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Tasting } from '../types/Tasting'

const props = defineProps<{
  editingTasting?: Tasting | null
}>()

const emit = defineEmits<{
  add: [title: string, host: string, dateTime: string, capacity: number, lineup: string]
  update: [tasting: Tasting]
  cancel: []
}>()

const title = ref('')
const host = ref('Mo')
const dateTime = ref('')
const capacity = ref(6)
const lineup = ref('')
const formError = ref('')

watch(
  () => props.editingTasting,
  (tasting) => {
    formError.value = ''
    if (tasting) {
      title.value = tasting.title
      host.value = tasting.host
      dateTime.value = tasting.dateTime
      capacity.value = tasting.capacity
      lineup.value = tasting.lineup
    } else {
      title.value = ''
      host.value = 'Mo'
      dateTime.value = ''
      capacity.value = 6
      lineup.value = ''
    }
  },
  { immediate: true }
)

function handleSubmit() {
  if (!title.value.trim()) {
    formError.value = 'Please provide a tasting title.'
    return
  }
  if (!dateTime.value) {
    formError.value = 'Please select a date and time.'
    return
  }

  if (props.editingTasting) {
    emit('update', {
      ...props.editingTasting,
      title: title.value.trim(),
      host: host.value.trim(),
      dateTime: dateTime.value,
      capacity: capacity.value,
      lineup: lineup.value.trim() || 'No beans specified'
    })
  } else {
    emit(
      'add',
      title.value.trim(),
      host.value.trim(),
      dateTime.value,
      capacity.value,
      lineup.value.trim() || 'No beans specified'
    )
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="tasting-title">Tasting Title:</label>
      <input 
        id="tasting-title" 
        v-model="title" 
        type="text" 
        class="form-input" 
        placeholder="e.g. Ethiopian Washed vs Natural" 
        required
      >
    </div>

    <div class="form-group">
      <label for="tasting-host">Host Member:</label>
      <input 
        id="tasting-host" 
        v-model="host" 
        type="text" 
        class="form-input" 
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

    <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem;">
      <button type="submit" class="button-primary">
        {{ editingTasting ? 'Save Changes' : '+ Announce Tasting' }}
      </button>

      <button 
        v-if="editingTasting" 
        type="button" 
        class="back-link" 
        @click="emit('cancel')"
      >
        Cancel Edit
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-error {
  color: #ff6b6b;
  font-weight: bold;
}
</style>