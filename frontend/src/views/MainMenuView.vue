<script setup lang="ts">
import { useUser } from '../composables/useUser'

const { users, currentUser, setCurrentUser } = useUser()
</script>


<template>
  <main>
    <h1>Main Menu</h1>

    <p>Current user: {{ currentUser?.name }}</p>

        <select
            :value="currentUser?.id"
            @change="(event) => {
                const selectedId = Number((event.target as HTMLSelectElement).value)
                const selectedUser = users.find(user => user.id === selectedId)

                if (selectedUser) {
                    setCurrentUser(selectedUser)
                }
            }"
        >
            <option
                v-for="user in users"
                :key="user.id"
                :value="user.id"
            >
                {{ user.name }}
            </option>
        </select>
    <hr>

    <p>
      <RouterLink to="/group-orders">
        Grouporder
      </RouterLink>
      <br>

      <RouterLink to="/the-shelf">
        The shelf
      </RouterLink>
      <br>

      <RouterLink to="/tastings">
        Tastings
      </RouterLink>
      <br>

      <RouterLink to="/the-grinder-and-the-scale">
        The Grinders And The Scales
      </RouterLink>
      <br>
    </p>
  </main>
</template>