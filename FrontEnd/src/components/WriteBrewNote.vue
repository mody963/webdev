<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBrewNotes } from '../composables/useBrewNote'

const route = useRoute()
const { addBrewNote } = useBrewNotes()

const title = ref('')
const method = ref('Drip-machine')
const dose = ref('')
const grind = ref('')
const result = ref('')
const noteError = ref('')
const feedback = ref('')

function handleSubmit() {
  const coffeeBagId = Number(route.params.bagId)

  if (!Number.isInteger(coffeeBagId)) {
    noteError.value = 'No valid coffee bag was selected.'
    return
  }

  addBrewNote({
    coffeeBag: coffeeBagId,
    title: title.value.trim(),
    method: method.value,
    dose: String(dose.value).trim(),
    grind: grind.value.trim(),
    result: result.value.trim(),
  })

  noteError.value = ''
  feedback.value = 'Brew note saved successfully!'
  title.value = ''
  method.value = 'Drip-machine'
  dose.value = ''
  grind.value = ''
  result.value = ''
}
</script>

<template>
    <div class="page-container">
    <header>
    <h1>Write a brew note</h1>
    <hr />
    </header>

    <main>
    <h2>Add brew note</h2>
    <section>
        <p>Enter the details of your brew.</p>

        <form  class="form-group" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="brewnote-title">Title:</label>
                <input v-model="title" type="text" id="brewnote-title" class="form-input" placeholder="e.g. Sweet & fruity (french press)" required>
            </div>

            <div class="form-group">
                <label for="brew-method">Method:</label>
                <select v-model="method" id="brew-method" class="form-input">
                    <option value="Drip-machine">Drip machine</option>
                    <option value="espresso">Espresso</option>
                    <option value="french-press">French Press</option>
                    <option value="aeropress">AeroPress</option>
                    <option value="Pourover">Pourover</option>
                </select>
            </div>

            <div class="form-group">
                <label for="dose">Dose (grams):</label>
                <input v-model="dose" type="number" id="dose" class="form-input" placeholder="e.g. 15" min="1" step="0.1" required>
            </div>

            <div class="form-group">
                <label for="grind">Grind:</label>
                <input v-model="grind" type="text" id="grind" class="form-input" placeholder="e.g. Medium-fine / 24 clicks" required>
            </div>

            <div class="form-group">
                <label for="result">Result:</label>
                <textarea v-model="result" id="result" class="form-input" placeholder="e.g. Sweet, fruity and balanced..." rows="4" required>
                </textarea>
            </div>

            <button id="create-btn" type="submit" class="button-primary">
                Save brew note
            </button>

            <p v-if="noteError" class="status-message">
            {{ noteError }}
            </p>
            <p v-if="feedback" class="status-message">
            {{ feedback }}
            </p>
        </form>
    </section>    
  </main>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
header {
    padding: var(--space-lg) 0;
}

main section {
    margin-bottom: var(--space-lg);
}
</style>