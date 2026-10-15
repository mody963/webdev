<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTastings } from '../composables/useTastings'

const { tastings, addScore, getAverageScore, completeTasting } = useTastings()

const session = computed(() => tastings.value[0])

const form = ref({ memberName: '', position: 1, score: 8.0, remark: '' })
const feedback = ref('')

function submitScore() {
  // Added '?' to safely check if session exists before getting its ID
  if (!session.value?.id) return
  
  addScore(session.value.id, { id: Date.now(), ...form.value })
  feedback.value = `Score saved for Position #${form.value.position}!`
  form.value.remark = '' 
}

// Added '?' to safely check session.value
const lineupArray = computed(() => {
  if (!session.value?.lineup) return []
  return session.value.lineup.split(',').map((bean: string) => bean.trim()).filter(Boolean)
})
</script>

<template>
  <div class="page-container" v-if="session">
    <header>
      <p>
        <RouterLink to="/tastings" class="back-link">&larr; Back to Tastings</RouterLink>
      </p>
      <h1>Cupping Room: {{ session.title }}</h1>
      <hr>
    </header>

    <div class="card">
      <h2>The Line-up Averages</h2>
      <table class="data-table">
        <tr>
          <th>Position</th>
          <th>Bean</th>
          <th>Average</th>
        </tr>
        <tr v-for="(bean, index) in lineupArray" :key="index">
          <td>#{{ index + 1 }}</td>
          <td>{{ bean }}</td>
          <td><strong>{{ getAverageScore(session, index + 1) }}</strong></td>
        </tr>
      </table>
    </div>

    <div class="card">
      <h2>Score a Cup</h2>
      <form @submit.prevent="submitScore">
        
        <div class="form-group">
          <label>Member (Confirmed Only):</label>
          <select v-model="form.memberName" class="form-input" required>
            <option value="" disabled>-- Select Member --</option>
            <option v-for="m in session.confirmedAttendees" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Position:</label>
          <select v-model.number="form.position" class="form-input" required>
            <option v-for="(_, i) in lineupArray" :key="i" :value="i + 1">Position #{{ i + 1 }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Score (1-10):</label>
          <input v-model.number="form.score" type="number" step="0.1" min="1" max="10" class="form-input" required>
        </div>

        <div class="card card--highlight" style="margin-top: 2rem; text-align: center;">
        <h3>Finish Tasting Event</h3>
        <p>Are all scores submitted? Close the session to publish the verdict to the club.</p>
        <button 
            type="button" 
            class="button-primary" 
            style="background-color: var(--color-bg); color: var(--color-text-light);"
            @click="completeTasting(session.id); $router.push('/tastings')"
        >
            Lock Scores & Complete Session &rarr;
        </button>
        </div>


        <div class="form-group">
          <label>Remark:</label>
          <textarea v-model="form.remark" class="form-input" required></textarea>
        </div>

        <button type="submit" class="button-primary">Submit Score</button>
        <p v-if="feedback" style="color: #42b983; font-weight: bold; margin-top: 10px;">{{ feedback }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-container { max-width: 800px; margin: 0 auto; width: 100%; }
</style>
