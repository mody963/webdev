import type { User } from '../types/User.ts'
import { ref, watch } from 'vue'

const users = ref<User[]>(
  JSON.parse(localStorage.getItem('users') || '[]')
)


if (users.value.length === 0) {
    users.value = [
        { id: 1, name: 'Jurn' },
        { id: 2, name: 'Karlijn' }
    ]
}

watch(users, (newUsers) => {
    localStorage.setItem('users', JSON.stringify(newUsers))
}, { deep: true })

const currentUser = ref<User>(
    JSON.parse(localStorage.getItem('currentUser') || 'null') || users.value[0]
)


watch(currentUser, (newUser) => {
    localStorage.setItem('currentUser', JSON.stringify(newUser))
})

function setCurrentUser(user: User) {
    currentUser.value = user
}

export function useUser() {
    return {
        users,
        currentUser,
        setCurrentUser
    }
}