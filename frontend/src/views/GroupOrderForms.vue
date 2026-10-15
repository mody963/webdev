<script setup lang="ts">
import { ref, watch } from 'vue'
import type { GroupOrder } from '../types/GroupOrders'

const props = defineProps<{
  editingOrder?: GroupOrder | null
}>()

const emit = defineEmits<{
  add: [data: Omit<GroupOrder, 'id' | 'participants' | 'status'>]
  update: [order: GroupOrder]
  cancel: []
}>()

const beans = [
  'Ethiopian Yirgacheffe',
  'Colombian Supremo',
  'Brazilian Santos',
  'Costa Rican Tarrazú'
]

const bean = ref('')
const starter = ref('Mo')
const minimumGrams = ref(250)
const closingDate = ref('')
const formError = ref('')

watch(
  () => props.editingOrder,
  (order) => {
    formError.value = ''
    if (order) {
      bean.value = order.bean
      starter.value = order.starter
      minimumGrams.value = order.minimumGrams
      closingDate.value = order.closingDate
    } else {
      bean.value = ''
      starter.value = 'Mo'
      minimumGrams.value = 250
      closingDate.value = ''
    }
  },
  { immediate: true }
)

function handleSubmit() {
  if (!bean.value) {
    formError.value = 'Please select a coffee bean.'
    return
  }
  if (!starter.value.trim()) {
    formError.value = 'Please fill in who starts the order.'
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

  formError.value = ''

  if (props.editingOrder) {
    emit('update', {
      ...props.editingOrder,
      bean: bean.value,
      starter: starter.value.trim(),
      minimumGrams: minimumGrams.value,
      closingDate: closingDate.value
    })
  } else {
    emit('add', {
      bean: bean.value,
      starter: starter.value.trim(),
      minimumGrams: minimumGrams.value,
      closingDate: closingDate.value
    })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="order-bean">Coffee Bean:</label>
      <select id="order-bean" v-model="bean" class="form-input" required>
        <option value="">-- Select a coffee bean --</option>
        <option v-for="b in beans" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="order-starter">Started by:</label>
      <input
        id="order-starter"
        v-model="starter"
        type="text"
        class="form-input"
        required
      >
    </div>

    <div class="form-group">
      <label for="order-grams">Minimum amount of grams:</label>
      <input
        id="order-grams"
        v-model.number="minimumGrams"
        type="number"
        min="1"
        class="form-input"
        required
      >
    </div>

    <div class="form-group">
      <label for="order-closing">Closing date:</label>
      <input
        id="order-closing"
        v-model="closingDate"
        type="date"
        class="form-input"
        required
      >
    </div>

    <p v-if="formError" class="form-error">{{ formError }}</p>

    <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem;">
      <button type="submit" class="button-primary">
        {{ editingOrder ? 'Save Changes' : '+ Start Group Order' }}
      </button>

      <button
        v-if="editingOrder"
        type="button"
        class="back-link"
        @click="emit('cancel')"
      >
        Cancel Edit
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-error {
  color: #ff6b6b;
  font-weight: bold;
}
</style>