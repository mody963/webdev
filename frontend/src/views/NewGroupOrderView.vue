<script setup lang="ts">
import { ref } from 'vue'

const bean = ref<string>('')
const minimumGrams = ref<number>(1)
const closingDate = ref<string>('')
const formError = ref<string>('')
const feedback = ref<string>('')

function handleSubmit() {
    formError.value = ''
    feedback.value = ''

    if (!bean.value) {
        formError.value = 'Please select a coffee bean.'
        return
    }

    if (minimumGrams.value < 1) {
        formError.value = 'Minimum amount of grams must be at least 1.'
        return
    }

    if (!closingDate.value) {
        formError.value = 'Please select a closing date.'
        return
    }

    const newOrder = {
        bean: bean.value,
        minimumGrams: minimumGrams.value,
        closingDate: closingDate.value,
        totalGrams: 0,
        status: 'Open'
    }

    const storedOrders = localStorage.getItem('groupOrders')

    const groupOrders = storedOrders
        ? JSON.parse(storedOrders)
        : []

    groupOrders.push(newOrder)

    localStorage.setItem(
        'groupOrders',
        JSON.stringify(groupOrders)
    )

    feedback.value = 'Group Order successfully created!'

    bean.value = ''
    minimumGrams.value = 1
    closingDate.value = ''
}
</script>

<template>
    <header>
        <p>
            <a href="/group-orders" class="back-link">
                &larr; Back to Group Orders
            </a>
        </p>

        <h1>Start New Group Order</h1>
    </header>

    <p class="intro">
        Start a new order and invite other members to join!
    </p>

    <hr>

    <div class="card">
        <h2>New Order</h2>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="bean">Coffee Bean</label>

                <select
                    id="bean"
                    v-model="bean"
                    class="form-input"
                    required
                >
                    <option value="">-- Select a coffee bean --</option>
                    <option value="Ethiopian Yirgacheffe">Ethiopian Yirgacheffe</option>
                    <option value="Colombian Supremo">Colombian Supremo</option>
                    <option value="Brazilian Santos">Brazilian Santos</option>
                    <option value="Costa Rican Tarrazú">Costa Rican Tarrazú</option>
                </select>
            </div>

            <div class="form-group">
                <label for="minimum-grams">Minimum amount of grams</label>

                <input
                    id="minimum-grams"
                    v-model.number="minimumGrams"
                    type="number"
                    min="1"
                    class="form-input"
                    required
                >
            </div>

            <div class="form-group">
                <label for="closing-date">Closing date</label>

                <input
                    id="closing-date"
                    v-model="closingDate"
                    type="date"
                    class="form-input"
                    required
                >
            </div>

            <p v-if="formError" class="form-error">
                {{ formError }}
            </p>

            <p v-if="feedback" class="card card--highlight">
                {{ feedback }}
            </p>

            <button type="submit" class="button-primary">
                + Start Group Order
            </button>
        </form>
    </div>

    <hr>

    <p class="footer-text">
        Group Orders &copy; the club
    </p>
</template>

<style scoped>
.form-error {
    color: #ff6b6b;
    font-weight: bold;
}
</style>