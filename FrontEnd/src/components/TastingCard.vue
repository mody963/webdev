<script setup lang="ts">
import type { Tasting } from '../types/Tasting'

defineProps<{
  tasting: Tasting
}>()

const emit = defineEmits<{
  edit: [tasting: Tasting]
  delete: [id: number]
  'claim-seat': [id: number]
}>()
</script>

<template>
  <article class="card">
    <header>
      <h3>{{ tasting.title }}</h3>
      <p><strong>Host:</strong> {{ tasting.host }} | <strong>Status:</strong> {{ tasting.status }}</p>
      <p><strong>Date &amp; Time:</strong> {{ tasting.dateTime.replace('T', ' at ') }}</p>
      <p>
        <strong>Capacity:</strong> 
        {{ tasting.confirmedAttendees.length }} / {{ tasting.capacity }} seats confirmed
        <span v-if="tasting.waitingList.length > 0">
          ({{ tasting.waitingList.length }} on waiting list)
        </span>
      </p>
      <p><strong>Line-up:</strong> {{ tasting.lineup }}</p>
    </header>

    <h4>Confirmed Attendees:</h4>
    <ol>
      <li v-for="member in tasting.confirmedAttendees" :key="member">
        {{ member }}
      </li>
    </ol>

    <div v-if="tasting.waitingList.length > 0">
      <h4>Waiting List:</h4>
      <ol :start="tasting.confirmedAttendees.length + 1">
        <li v-for="member in tasting.waitingList" :key="member">
          {{ member }}
        </li>
      </ol>
    </div>

    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem;">
      <button 
        type="button" 
        class="button-primary"
        @click="emit('claim-seat', tasting.id)"
      >
        {{ tasting.confirmedAttendees.length < tasting.capacity ? 'Claim a Seat' : 'Join Waiting List' }}
      </button>

      <button type="button" class="forward-link" @click="emit('edit', tasting)">
        Edit
      </button>

      <button type="button" class="back-link" @click="emit('delete', tasting.id)">
        Cancel Session
      </button>
    </div>
  </article>
</template>