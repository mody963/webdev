<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGrinderScaleReservations } from '../composables/useGrinderScale'
import type { GrinderScale } from '../types/GrindersScale'

const { GrinderScalesReservations, activeCount, addGrinderScale, updateGrinderScale, deleteGrinderScale, } = useGrinderScaleReservations()

const editingGrinderScale = ref<GrinderScale | null>(null)
const feedback = ref<string>('')

function startEditing(tasting: GrinderScale) {
  editingGrinderScale.value = tasting
  feedback.value = ''
  window.scrollTo({ top: 250, behavior: 'smooth' })
}

function cancelEdit() {
  editingGrinderScale.value = null
}

function handleUpdate(updatedTasting: GrinderScale) {
  updateGrinderScale(updatedTasting)
  editingGrinderScale.value = null
  feedback.value = `Reservation was successfully updated!`
}

function handleDelete(id: number, title: string) {
  const confirmed = confirm(`Are you sure you want to cancel "${title}"?`)
  if (!confirmed) return

  if (editingGrinderScale.value?.id === id) {
    cancelEdit()
  }
  deleteGrinderScale(id)
  feedback.value = `Tasting "${title}" was cancelled.`
}

// Lesson 3: Keyboard shortcut to cancel edit mode
function handleKeyPress(e: KeyboardEvent) {
  if (e.key === 'Escape' && editingGrinderScale.value !== null) {
    cancelEdit()
  }
}

onMounted(() => document.addEventListener('keydown', handleKeyPress))
onUnmounted(() => document.removeEventListener('keydown', handleKeyPress))
</script>

<template>
    <div id="active-sessions" class="card">
      <h4>All reservations</h4>

      <div v-if="GrinderScalesReservations.length === 0">
        <p>No tastings scheduled yet.</p>
      </div>

      <div v-for="GrinderScale in GrinderScalesReservations" :key="GrinderScale.id" class="card" style="margin-top: 1rem; background-color: var(--color-surface);">
        <header>
          <h3>{{ GrinderScale.grinderScale }}</h3>
        </header>

        <!-- ACTION BUTTONS: Claim/Waitlist, Edit, Cancel Session -->
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem; align-items: center;">
          <button type="button" class="button-primary" style="background-color: transparent; border: 1px solid var(--color-surface-light); color: var(--color-surface-light);" @click="startEditing(tasting)">
            Edit reservation
          </button>
          <button type="button" class="back-link" style="color: #ff6b6b;" @click="handleDelete(tasting.id, tasting.title)">
            Cancel reservation
          </button>
        </div>
        <RouterLink to="/host-tasting" class="button-primary">+ Make Reservation</RouterLink>
      </div>
    </div>

    <hr>

    <p class="footer-text">
        The Grinders and the Scales &copy; the club
    </p>
</template>

<style scoped>
.form-error {
    color: #ff6b6b;
    font-weight: bold;
}
</style>