<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useGrinderScaleReservations } from '../composables/useGrinderScale'
import ReserveGrinderScale from '../components/ReserveGrinderScale.vue'

const router = useRouter()
const { addGrinderScale } = useGrinderScaleReservations()

const feedback = ref('')

// Deze functie wordt getriggerd wanneer HostTastingForm.vue de 'add' emit uitvoert
function handleAdd(grinderScale: string) {
  addGrinderScale({ grinderScale })
  
  feedback.value = 'Reservation successfull!'

  // Redirect terug naar het overzicht na 1 seconde
  setTimeout(() => {
    router.push('/TheGrindersAndTheScales')
  }, 1000)
}
</script>

<template>
    <header>
      <p>
        <RouterLink to="/TheGrindersAndTheScales" class="back-link">&larr; Back to The Grinders and The Scales</RouterLink>
      </p>
      <h1>Make a reservation</h1>
    </header>

    <p class="intro">
      Reserve your chosen grinder/scale.
    </p>

    <hr>

    <p v-if="feedback" class="card card--highlight" style="font-weight: bold;">
      {{ feedback }}
    </p>

    <!-- Herbruikbaar formulier component in plaats van HTML-duplicatie -->
    <ReserveGrinderScale @add="handleAdd" />

    <hr>
    <p class="footer-text">The Grinders and the Scales &copy; the club</p>

</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
