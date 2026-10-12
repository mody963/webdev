<script setup lang="ts">
import { ref } from 'vue'

const GrinderScale = ref<string>('')
const formError = ref<string>('')
const feedback = ref<string>('')

function handleSubmit() {
    formError.value = ''
    feedback.value = ''

    if (!GrinderScale.value) {
        formError.value = 'Please select a grinder/scale.'
        return
    }

    const newOrder = {
        GrinderScale: GrinderScale.value,
    }

    const storedOrders = localStorage.getItem('Reservation')

    const Reservation = storedOrders
        ? JSON.parse(storedOrders)
        : []

    Reservation.push(newOrder)

    localStorage.setItem(
        'Reservation',
        JSON.stringify(Reservation)
    )

    feedback.value = 'Successfully reserved!'

    GrinderScale.value = ''
}
</script>

<template>
    <header>
        <p>
            <a href="/TheGrindersAndTheScales" class="back-link">
                &larr; Back to Main Page
            </a>
        </p>

        <h1>Start New Reservation</h1>
    </header>

    <p class="intro">
        Reserve your grinder/scale and make some coffee!
    </p>

    <hr>

    <div class="card">
        <h2>New Reservation</h2>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="Grinder/scale">Grinder/Scale</label>

                <select
                    id="Grinder/Scale"
                    v-model="GrinderScale"
                    class="form-input"
                    required
                >
                    <option value="">-- Select a grinder/scale --</option>
                    <option value="Grinder 1">Grinder 1</option>
                    <option value="Grinder 2">Grinder 2</option>
                    <option value="Grinder 3">Grinder 3</option>
                    <option value="Scale 1">Scale 1</option>
                    <option value="Scale 2">Scale 2</option>
                </select>
            </div>

            <p v-if="formError" class="form-error">
                {{ formError }}
            </p>

            <p v-if="feedback" class="card card--highlight">
                {{ feedback }}
            </p>

            <button type="submit" class="button-primary">
                + Reserve Grinder/Scale
            </button>
        </form>
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