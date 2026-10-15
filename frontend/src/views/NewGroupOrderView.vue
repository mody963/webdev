<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import GroupOrderForm from '../views/GroupOrderForms.vue'
import { useGroupOrders } from '../composables/useGroupOrders'
import type { GroupOrder } from '../types/GroupOrders.ts'

const router = useRouter()
const { addOrder } = useGroupOrders()

const feedback = ref('')

function handleAdd(data: Omit<GroupOrder, 'id' | 'participants' | 'status'>) {
  addOrder(data)
  feedback.value = 'Group Order successfully created!'

  setTimeout(() => {
    router.push('/group-orders')
  }, 1000)
}
</script>

<template>
  <div class="page-container">
    <header>
      <p>
        <RouterLink to="/group-orders" class="back-link">&larr; Back to Group Orders</RouterLink>
      </p>
      <h1>Start New Group Order</h1>
    </header>

    <p class="intro">
      Start a new order and invite other members to join!
    </p>

    <hr>

    <div class="card">
      <h2>New Order</h2>

      <GroupOrderForm @add="handleAdd" />

      <p v-if="feedback" class="card card--highlight" style="font-weight: bold;">
        {{ feedback }}
      </p>
    </div>

    <hr>
    <p class="footer-text">Group Orders &copy; the club</p>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>