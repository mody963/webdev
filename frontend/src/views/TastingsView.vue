<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import HostTastingForm from '../components/HostTastingForm.vue'
import { useTastings } from '../composables/useTastings'
import type { Tasting } from '../types/Tasting'

const {
  tastings,
  activeCount,
  updateTasting,
  deleteTasting,
  registerMember
} = useTastings()

// Track which session is being edited (Lesson 4 pattern)
const editingTasting = ref<Tasting | null>(null)
const feedback = ref<string>('')

function handleClaimSeat(id: number) {
  registerMember(id, 'Current Member')
  feedback.value = 'Seat reservation / waiting list updated!'
}

function startEditing(tasting: Tasting) {
  editingTasting.value = tasting
  feedback.value = ''
  window.scrollTo({ top: 250, behavior: 'smooth' })
}

function cancelEdit() {
  editingTasting.value = null
}

function handleUpdate(updatedTasting: Tasting) {
  updateTasting(updatedTasting)
  editingTasting.value = null
  feedback.value = `Tasting "${updatedTasting.title}" was successfully updated!`
}

function handleDelete(id: number, title: string) {
  const confirmed = confirm(`Are you sure you want to cancel "${title}"?`)
  if (!confirmed) return

  if (editingTasting.value?.id === id) {
    cancelEdit()
  }
  deleteTasting(id)
  feedback.value = `Tasting "${title}" was cancelled.`
}

// Lesson 3: Keyboard shortcut to cancel edit mode with lifecycle cleanup
function handleKeyPress(e: KeyboardEvent) {
  if (e.key === 'Escape' && editingTasting.value !== null) {
    cancelEdit()
  }
}

onMounted(() => document.addEventListener('keydown', handleKeyPress))
onUnmounted(() => document.removeEventListener('keydown', handleKeyPress))
</script>

<template>
  <div class="page-container">
    <header>
      <p>
        <RouterLink to="/" class="back-link">&larr; Back to Main Menu</RouterLink>
      </p>
      <h1>Coffee Tastings</h1>
    </header>

    <p class="intro">
      Taste line-ups blind in the back room and help decide what beans the club re-orders!
    </p>

    <hr>

    <h2>MENU</h2>

    <!-- Options Box matching teammate's hub style -->
    <div class="order-box">
      <h4>Options</h4>
      <ul>
        <li><a href="#active-sessions" class="back-link">Active Sessions ({{ activeCount }})</a></li>
        <li><a href="#past-verdicts" class="back-link">Past Cupping Verdicts</a></li>
      </ul>

      <RouterLink to="/host-tasting" class="button-primary">
        + Host New Tasting
      </RouterLink>
      <hr>
    </div>

    <!-- User Feedback Banner -->
    <p v-if="feedback" class="card card--highlight" style="font-weight: bold;">
      {{ feedback }}
    </p>

    <!-- INLINE EDITING MODAL / FORM (Only visible when actively editing a tasting) -->
    <div v-if="editingTasting" class="card" style="border: 2px solid var(--color-surface-light);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0;">Editing: {{ editingTasting.title }}</h3>
        <small>Tip: Press <kbd>Escape</kbd> to cancel</small>
      </div>
      <hr>
      <HostTastingForm
        :editing-tasting="editingTasting"
        @update="handleUpdate"
        @cancel="cancelEdit"
      />
    </div>

    <!-- Host banner link (only when not editing) -->
    <div v-else class="card card--highlight">
      <h4>Lead a Cupping</h4>
      <p>
        Every member who knows the beans can book the back room, pick a line-up of 4 to 5 coffees, and lead a blind session.
      </p>
      <RouterLink to="/host-tasting" class="button-primary">
        + Host a New Tasting &rarr;
      </RouterLink>
    </div>

    <!-- Active / Upcoming Sessions List -->
    <div id="active-sessions" class="card">
      <h4>Upcoming Sessions</h4>
      <p>
        Sign up for a confirmed seat. Once capacity is reached, you are queued on the waiting list in order.
      </p>

      <div v-if="tastings.length === 0">
        <p>No tastings scheduled yet.</p>
      </div>

      <div 
        v-for="tasting in tastings" 
        :key="tasting.id" 
        class="card"
        style="margin-top: 1rem; background-color: var(--color-surface);"
      >
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
          <p><strong>Blind Line-up:</strong> {{ tasting.lineup }}</p>
        </header>

        <h4>Confirmed Attendees:</h4>
        <ol>
          <li v-for="att in tasting.confirmedAttendees" :key="att">{{ att }}</li>
        </ol>

        <div v-if="tasting.waitingList.length > 0">
          <h4>Waiting List:</h4>
          <ol :start="tasting.confirmedAttendees.length + 1">
            <li v-for="w in tasting.waitingList" :key="w">{{ w }}</li>
          </ol>
        </div>

        <!-- ACTION BUTTONS: Claim/Waitlist, Edit, Cancel Session -->
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem; align-items: center;">
          <button 
            type="button" 
            class="button-primary"
            @click="handleClaimSeat(tasting.id)"
          >
            {{ tasting.confirmedAttendees.length < tasting.capacity ? 'Claim a Seat' : 'Join Waiting List' }}
          </button>

          <button 
            type="button" 
            class="button-primary"
            style="background-color: transparent; border: 1px solid var(--color-surface-light); color: var(--color-surface-light);"
            @click="startEditing(tasting)"
          >
            Edit Session
          </button>

          <button 
            type="button" 
            class="back-link"
            style="color: #ff6b6b;"
            @click="handleDelete(tasting.id, tasting.title)"
          >
            Cancel Tasting
          </button>
        </div>
      </div>
    </div>

    <!-- Summary Table (Past Cupping Verdicts) -->
    <div id="past-verdicts" class="card">
      <h4>Past Cupping Verdicts</h4>
      <p>Calculated average scores decide what the club buys next in Group Orders.</p>

      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Session</th>
            <th scope="col">Host</th>
            <th scope="col">Top Rated Bean</th>
            <th scope="col">Average Score</th>
            <th scope="col">Re-order?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Thermal Shock vs Washed</td>
            <td>Mo</td>
            <td>Milky Cake (Dak)</td>
            <td>8.8 / 10</td>
            <td><strong>Yes (Placed)</strong></td>
          </tr>
          <tr>
            <td>Nordic Roasters Special</td>
            <td>Sofia</td>
            <td>Caballero Geisha (Wendelboe)</td>
            <td>9.1 / 10</td>
            <td><strong>Yes (Placed)</strong></td>
          </tr>
          <tr>
            <td>Dark Roast Espresso Test</td>
            <td>Daan</td>
            <td>Italian Dark (Local Roaster)</td>
            <td>4.2 / 10</td>
            <td>No (Failed)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr>
    <p class="footer-text">Coffee Tastings &copy; the club</p>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}
</style>