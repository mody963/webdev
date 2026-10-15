<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useTastings } from '../composables/useTastings'
import HostTastingForm from '../components/HostTastingForm.vue'

const router = useRouter()
const { addTasting } = useTastings()

const feedback = ref('')

// Deze functie wordt getriggerd wanneer HostTastingForm.vue de 'add' emit uitvoert
function handleAdd(title: string, host: string, dateTime: string, capacity: number, lineup: string) {
  addTasting({ title, host, dateTime, capacity, lineup })
  
  feedback.value = 'Tasting session successfully scheduled!'

  // Redirect terug naar het overzicht na 1 seconde
  setTimeout(() => {
    router.push('/tastings')
  }, 1000)
}
</script>

<template>
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

    <p v-if="feedback" class="card card--highlight" style="font-weight: bold;">
      {{ feedback }}
    </p>

    <!-- Herbruikbaar formulier component in plaats van HTML-duplicatie -->
    <HostTastingForm @add="handleAdd" />

    <hr>
    <p class="footer-text">Coffee Tastings &copy; the club</p>

</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
