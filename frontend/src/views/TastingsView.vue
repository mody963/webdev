<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import HostTastingForm from '../components/HostTastingForm.vue'
import TastingCard from '../components/TastingCard.vue'
import { useTastings } from '../composables/useTastings'
import type { Tasting } from '../types/Tasting'

// Track which session is being edited (Lesson 4 pattern)
const { tastings, activeCount, updateTasting, deleteTasting, registerMember } = useTastings()

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

// Lesson 3: Keyboard shortcut to cancel edit mode
function handleKeyPress(e: KeyboardEvent) {
  if (e.key === 'Escape' && editingTasting.value !== null) {
    cancelEdit()
  }
}

onMounted(() => document.addEventListener('keydown', handleKeyPress))
onUnmounted(() => document.removeEventListener('keydown', handleKeyPress))
</script>

<template>
  <div>
    <header>
      <h1>Coffee Tastings</h1>
    </header>
    <p class="intro">Taste line-ups blind in the back room and help decide what beans the club re-orders!</p>
    <hr>

    <h2>MENU</h2>
    <div class="order-box">
      <h4>Options</h4>
      <ul>
        <li><a href="#active-sessions" class="back-link">Active Sessions ({{ activeCount }})</a></li>
        <li><a href="#past-verdicts" class="back-link">Past Cupping Verdicts</a></li>
      </ul>
      <RouterLink to="/host-tasting" class="button-primary">+ Host New Tasting</RouterLink>
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
      <HostTastingForm :editing-tasting="editingTasting" @update="handleUpdate" @cancel="cancelEdit" />
    </div>

    <!-- Host banner link (only when not editing) -->
    <div v-else class="card card--highlight">
      <h4>Lead a Cupping</h4>
      <p>Every member who knows the beans can book the back room, pick a line-up of 4 to 5 coffees, and lead a blind
        session.</p>
      <RouterLink to="/host-tasting" class="button-primary">+ Host a New Tasting &rarr;</RouterLink>
    </div>

    <!-- ACTIVE SESSIONS LIST -->
    <div id="active-sessions" class="card">
      <h4>Upcoming Sessions</h4>
      <p>Sign up for a confirmed seat. Once capacity is reached, you are queued on the waiting list in order.</p>

      <div v-if="tastings.length === 0">
        <p>No tastings scheduled yet.</p>
      </div>

      <!-- Hier gebruiken we je nieuwe TastingCard component! -->
      <TastingCard v-for="tasting in tastings" :key="tasting.id" :tasting="tasting" @claim-seat="handleClaimSeat"
        @edit="startEditing" @delete="handleDelete($event, tasting.title)"
        style="margin-top: 1rem; background-color: var(--color-surface);" />
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
        </tbody>
      </table>
    </div>
    <hr>
    <p class="footer-text">Coffee Tastings &copy; the club</p>
  </div>
</template>
