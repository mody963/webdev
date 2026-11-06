
import { ref, watch, computed } from 'vue'
import { useUser } from './useUser'
import { useCoffeeBag } from './useCoffeeBags.ts'

interface BagTransfer {
    id: number
    bagId: number
    fromUserId: number
    toUserId: number
    status: 'pending' | 'accepted' | 'declined'
}

const transfers = ref<BagTransfer[]>(
    JSON.parse(localStorage.getItem('bagTransfers') || '[]')
)

watch(
    transfers,
    (latest) => {
        localStorage.setItem('bagTransfers', JSON.stringify(latest))
    },
    { deep: true }
)

const { currentUser, users } = useUser()
const { coffeeBags, updateCoffeeBag } = useCoffeeBag()

const incomingTransfers = computed(() =>
    transfers.value.filter(
        transfer =>
            transfer.toUserId === currentUser.value.id &&
            transfer.status === 'pending'
    )
)



function createTransfer(bagId: number, toUserId: number) {

    const bag = coffeeBags.value.find(
        bag => bag.id === bagId
    )

    if (!bag || bag.owner.id !== currentUser.value.id) {
        return false
    }
    const alreadyPending = transfers.value.some(
    transfer =>
        transfer.bagId === bagId &&
        transfer.status === 'pending'
    )

    if (alreadyPending) {
        return false
    }

    const newOwner = users.value.find(
        user => user.id === toUserId
    )

    if (!newOwner || newOwner.id === currentUser.value.id) {
        return false
    }

    const newTransfer: BagTransfer = {
        id: Date.now(),
        bagId: bagId,
        fromUserId: currentUser.value.id,
        toUserId: newOwner.id,
        status: 'pending'
    }

    transfers.value.push(newTransfer)

    return true
}

// Accept an incoming transfer request
function acceptTransfer(requestId: number) {

    const transfer = transfers.value.find(
        transfer => transfer.id === requestId
    )

    if (
        !transfer ||
        transfer.toUserId !== currentUser.value.id ||
        transfer.status !== 'pending'
    ) {
        return false
    }

    const bag = coffeeBags.value.find(
        bag => bag.id === transfer.bagId
    )

    // Check if bag still belongs to original owner
    if (!bag || bag.owner.id !== transfer.fromUserId) {
        return false
    }
    const newOwner = users.value.find(
        user => user.id === transfer.toUserId
    )

    if (!newOwner) {
        return false
    }

    updateCoffeeBag({
        ...bag,
        owner: newOwner
    })

    transfer.status = 'accepted'

    return true
}

function declineTransfer(requestId: number) {

    const transfer = transfers.value.find(
        transfer => transfer.id === requestId
    )

    if (
        !transfer ||
        transfer.toUserId !== currentUser.value.id ||
        transfer.status !== 'pending'
    ) {
        return false
    }
    transfer.status = 'declined'

    return true
}

export function useBagTransfers() {
    return {
        transfers,
        incomingTransfers,
        createTransfer,
        acceptTransfer,
        declineTransfer
    }
}
