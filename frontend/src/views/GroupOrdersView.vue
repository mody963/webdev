<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import GroupOrderForm from '../views/GroupOrderForms.vue'
import { useGroupOrders } from '../composables/useGroupOrders'
import type { GroupOrder } from '../types/GroupOrders.ts'
 
const {
  orders,
  openOrders,
  closedOrders,
  getTotalGrams,
  updateOrder,
  deleteOrder,
  joinOrder,
  closeOrder
} = useGroupOrders()
 
const filter = ref<'all' | 'open' | 'closed'>('all')
const editingOrder = ref<GroupOrder | null>(null)
const feedback = ref('')
 
const filteredOrders = computed(() => {
  if (filter.value === 'open') return openOrders.value
  if (filter.value === 'closed') return closedOrders.value
  return orders.value
})
 
function setFilter(value: 'all' | 'open' | 'closed') {
  filter.value = value
  document.getElementById('order-list')?.scrollIntoView({ behavior: 'smooth' })
}
 
function handleJoin(order: GroupOrder) {
  const joined = joinOrder(order.id, 'Current Member')
  feedback.value = joined
    ? `You joined the order for "${order.bean}"!`
    : 'You already joined this order.'
}
 
function startEditing(order: GroupOrder) {
  editingOrder.value = order
  feedback.value = ''
  window.scrollTo({ top: 250, behavior: 'smooth' })
}
 
function cancelEdit() {
  editingOrder.value = null
}
 
function handleUpdate(updatedOrder: GroupOrder) {
  updateOrder(updatedOrder)
  editingOrder.value = null
  feedback.value = `Order "${updatedOrder.bean}" was successfully updated!`
}
 
function handleClose(order: GroupOrder) {
  closeOrder(order.id)
  if (editingOrder.value?.id === order.id) {
    cancelEdit()
  }
  feedback.value = `Order "${order.bean}" is now closed.`
}
 
function handleDelete(order: GroupOrder) {
  const confirmed = confirm(`Are you sure you want to cancel the order for "${order.bean}"?`)
  if (!confirmed) return
 
  if (editingOrder.value?.id === order.id) {
    cancelEdit()
  }
  deleteOrder(order.id)
  feedback.value = `Order "${order.bean}" was cancelled.`
}
 
// Escape cancels edit mode
function handleKeyPress(e: KeyboardEvent) {
  if (e.key === 'Escape' && editingOrder.value !== null) {
    cancelEdit()
  }
}
 
onMounted(() => document.addEventListener('keydown', handleKeyPress))
onUnmounted(() => document.removeEventListener('keydown', handleKeyPress))
</script>
 
<template>
  <div class="page-container">
    <header>
      <p>
        <RouterLink to="/" class="back-link">&larr; Back to Main Menu</RouterLink>
      </p>
      <h1>Group Orders</h1>
    </header>
 
    <p class="intro">
      Order coffee together with other members of the club!
    </p>
 
    <hr>
 
    <h2>MENU</h2>
 
    <div class="order-box">
      <h4>Options</h4>
      <ul>
        <li>
          <button type="button" class="back-link" @click="setFilter('all')">
            All Orders ({{ orders.length }})
          </button>
        </li>
        <li>
          <button type="button" class="back-link" @click="setFilter('open')">
            Open Orders ({{ openOrders.length }})
          </button>
        </li>
        <li>
          <button type="button" class="back-link" @click="setFilter('closed')">
            Closed Orders ({{ closedOrders.length }})
          </button>
        </li>
      </ul>
 
      <RouterLink to="/new-group-order" class="button-primary">
        + Start New Order
      </RouterLink>
      <hr>
    </div>
 
    <!-- User feedback banner -->
    <p v-if="feedback" class="card card--highlight" style="font-weight: bold;">
      {{ feedback }}
    </p>
 
    <!-- Inline edit form (only visible while editing) -->
    <div v-if="editingOrder" class="card" style="border: 2px solid var(--color-surface-light);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0;">Editing: {{ editingOrder.bean }}</h3>
        <small>Tip: Press <kbd>Escape</kbd> to cancel</small>
      </div>
      <hr>
      <GroupOrderForm
        :editing-order="editingOrder"
        @update="handleUpdate"
        @cancel="cancelEdit"
      />
    </div>
 
    <!-- Order list -->
    <div id="order-list" class="card">
      <h4>
        {{ filter === 'all' ? 'All Orders' : filter === 'open' ? 'Open Orders' : 'Closed Orders' }}
      </h4>
      <p v-if="filter === 'open'">
        These orders are still open and accepting new members.
        Only the starter or a committee member can cancel an open order.
      </p>
      <p v-else-if="filter === 'closed'">
        Closed orders can no longer be changed or joined, but you can still see what was ordered and by who.
      </p>
      <p v-else>
        Take a look at all group orders that have been made.
      </p>
 
      <div v-if="filteredOrders.length === 0">
        <p>No orders found.</p>
      </div>
 
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="card"
        style="margin-top: 1rem; background-color: var(--color-surface);"
      >
        <header>
          <h3>{{ order.bean }}</h3>
          <p>
            <strong>Started by:</strong> {{ order.starter }} |
            <strong>Status:</strong> {{ order.status }}
          </p>
          <p><strong>Closing date:</strong> {{ order.closingDate }}</p>
          <p><strong>Minimum per member:</strong> {{ order.minimumGrams }} g</p>
          <p>
            <strong>Total:</strong> {{ getTotalGrams(order) }} g
            ({{ order.participants.length }} members)
          </p>
        </header>
 
        <h4>Members:</h4>
        <ol>
          <li v-for="p in order.participants" :key="p.name">
            {{ p.name }} ({{ p.grams }} g)
          </li>
        </ol>
 
        <!-- Actions only for open orders -->
        <div
          v-if="order.status === 'open'"
          style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem; align-items: center;"
        >
          <button type="button" class="button-primary" @click="handleJoin(order)">
            Join Order
          </button>
 
          <button
            type="button"
            class="button-primary"
            style="background-color: transparent; border: 1px solid var(--color-surface-light); color: var(--color-surface-light);"
            @click="startEditing(order)"
          >
            Edit Order
          </button>
 
          <button
            type="button"
            class="button-primary"
            style="background-color: transparent; border: 1px solid var(--color-surface-light); color: var(--color-surface-light);"
            @click="handleClose(order)"
          >
            Close Order
          </button>
 
          <button
            type="button"
            class="back-link"
            style="color: #ff6b6b;"
            @click="handleDelete(order)"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
 
    <!-- Status open orders -->
    <div class="card">
      <h4>Status Open Orders</h4>
      <p>
        Quick overview of how the currently open orders are progressing:
        how many members joined so far and the current total.
      </p>
 
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Started by</th>
            <th scope="col">Members</th>
            <th scope="col">Total grams</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="openOrders.length === 0">
            <td colspan="4">No open orders.</td>
          </tr>
          <tr v-for="order in openOrders" :key="order.id">
            <td>{{ order.bean }}</td>
            <td>{{ order.starter }}</td>
            <td>{{ order.participants.length }}</td>
            <td>{{ getTotalGrams(order) }} g</td>
          </tr>
        </tbody>
      </table>
    </div>
 
    <hr>
    <p class="footer-text">Group Orders &copy; the club</p>
  </div>
</template>
 
<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}
</style>