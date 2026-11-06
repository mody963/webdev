
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCoffeeBag } from '../composables/useCoffeeBags'
import { useUser } from '../composables/useUser'
import { useBagTransfers } from '../composables/useBagTransfers'

const { myBags, coffeeBags } = useCoffeeBag()
const { currentUser, users } = useUser()

const {
    incomingTransfers,
    createTransfer,
    acceptTransfer,
    declineTransfer
} = useBagTransfers()

const selectedBagId = ref(0)
const selectedRecipientId = ref(0)

const availableRecipients = computed(() =>
    users.value.filter(
        user => user.id !== currentUser.value.id
    )
)
const message = ref('')

function requestTransfer() {
    const success = createTransfer(
        selectedBagId.value,
        selectedRecipientId.value
    )

    if (success) {
        message.value = 'Transfer request successfully created!'
        selectedBagId.value = 0
        selectedRecipientId.value = 0
    } else {
        message.value = 'Could not create transfer request.'
    }
}

// Accept transfer request
function acceptRequest(requestId: number) {
    const success = acceptTransfer(requestId)

    message.value = success
        ? 'Transfer accepted!'
        : 'Could not accept transfer.'
}

// Decline transfer request
function declineRequest(requestId: number) {
    const success = declineTransfer(requestId)

    message.value = success
        ? 'Transfer declined.'
        : 'Could not decline transfer.'
}

// Get coffee bag information
function getBagName(bagId: number) {
    const bag = coffeeBags.value.find(
        bag => bag.id === bagId
    )

    return bag ? `${bag.bean} - ${bag.roaster}` : 'Bag not found'
}

// Get sender information
function getSenderName(userId: number) {
    return users.value.find(
        user => user.id === userId
    )?.name ?? 'Unknown user'
}
</script>

<template>
    <div class="page-container">

        <header>
            <h1>Coffee Bag Transfers</h1>
            <p class="intro">
                Send coffee bags to other club members and manage incoming requests.
            </p>
            <hr>
        </header>

        <main>

            <section>
                <h2>Send a transfer</h2>

                <article class="card">
                    <h3>Transfer a coffee bag</h3>

                    <p>Select a coffee bag and choose who should receive it.</p>
                    <div class="form-field">
                    <label for="selectedBag">Select coffee bag:</label>

                    <select
                        id="selectedBag"
                        v-model.number="selectedBagId"
                    >
                        <option :value="0" disabled>
                            Select a bag
                        </option>

                        <option
                            v-for="bag in myBags"
                            :key="bag.id"
                            :value="bag.id"
                        >
                            {{ bag.bean }} - {{ bag.roaster }}
                        </option>
                    </select>

                    <p v-if="myBags.length === 0">
                        You don't have any coffee bags to transfer.
                    </p>
                    </div>

                    <label for="recipient">Select recipient:</label>
                    <div class="form-field">
                    <select
                        id="recipient"
                        v-model.number="selectedRecipientId"
                    >
                        <option :value="0" disabled>
                            Select a user
                        </option>

                        <option
                            v-for="user in availableRecipients"
                            :key="user.id"
                            :value="user.id"
                        >
                            {{ user.name }}
                        </option>
                    </select>
                    </div>
                    <button
                        type="button"
                        class="button-primary"
                        :disabled="selectedBagId === 0 || selectedRecipientId === 0"
                        @click="requestTransfer"
                    >
                        Send transfer request
                    </button>

                    <p v-if="message">
                        {{ message }}
                    </p>
                </article>
            </section>

            <section>
                <h2>Incoming transfer requests</h2>

                <p v-if="incomingTransfers.length === 0">
                    You have no incoming transfer requests.
                </p>

                <article
                    v-for="request in incomingTransfers"
                    :key="request.id"
                    class="card"
                >
                    <h3>{{ getBagName(request.bagId) }}</h3>

                    <p>
                        <strong>From:</strong>
                        {{ getSenderName(request.fromUserId) }}
                    </p>

                    <button
                        type="button"
                        class="button-primary"
                        @click="acceptRequest(request.id)"
                    >
                        Accept
                    </button>

                    <button
                        type="button"
                        class="button-primary"
                        style="background-color: transparent; border: 1px solid var(--color-surface-light); color: var(--color-surface-light);"
                        @click="declineRequest(request.id)"
                    >
                        Decline
                    </button>
                </article>
            </section>

            <RouterLink to="/the-shelf" class="back-link">
                &larr; Back to The Shelf
            </RouterLink>

        </main>
    </div>

    <hr>
    <p class="footer-text">The Shelf &copy; the club</p>
</template>

<style scoped>
.page-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

header {
    padding: var(--space-lg) 0;
}

main section {
    margin-bottom: var(--space-lg);
}
.form-field {
  margin-bottom: 1rem;
}

.form-field label,
.form-field select {
  display: block;
}

.form-field label {
  margin-bottom: 0.4rem;
}

.form-field select {
  width: 100%;
  max-width: 24rem;
}
</style>
