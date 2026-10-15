import { ref, computed, watch } from 'vue'
import type { GroupOrder } from '../types/GroupOrders'
 
export function useGroupOrders() {
  // Load initial state from localStorage
  const orders = ref<GroupOrder[]>(
    JSON.parse(localStorage.getItem('zetsel_group_orders') || '[]')
  )
 
  // Seed orders on first visit
  if (orders.value.length === 0) {
    orders.value = [
      {
        id: 1,
        bean: 'Ethiopian Yirgacheffe',
        minimumGrams: 250,
        closingDate: '2026-11-01',
        starter: 'Mo',
        participants: [
          { name: 'Mo', grams: 250 },
          { name: 'Aimee', grams: 250 }
        ],
        status: 'open'
      },
      {
        id: 2,
        bean: 'Colombian Supremo',
        minimumGrams: 500,
        closingDate: '2026-09-20',
        starter: 'Daan',
        participants: [
          { name: 'Daan', grams: 500 },
          { name: 'Fernando', grams: 500 }
        ],
        status: 'closed'
      }
    ]
  }
 
  // sync every change naar de  localStorage
  watch(
    orders,
    (latest) => {
      localStorage.setItem('zetsel_group_orders', JSON.stringify(latest))
    },
    { deep: true }
  )
 
  const openOrders = computed(() => orders.value.filter(o => o.status === 'open'))
  const closedOrders = computed(() => orders.value.filter(o => o.status === 'closed'))
 
  function getTotalGrams(order: GroupOrder): number {
    return order.participants.reduce((sum, p) => sum + p.grams, 0)
  }
 
  // CREATE
  function addOrder(
    data: Omit<GroupOrder, 'id' | 'participants' | 'status'>
  ) {
    const newOrder: GroupOrder = {
      id: Date.now(),
      ...data,
      // the starter automatisch met een minmaal aanta;
      participants: [{ name: data.starter, grams: data.minimumGrams }],
      status: 'open'
    }
    orders.value.unshift(newOrder)
  }
 
  // UPDATE
  function updateOrder(updatedOrder: GroupOrder) {
    const index = orders.value.findIndex(o => o.id === updatedOrder.id)
    if (index !== -1) {
      orders.value[index] = updatedOrder
    }
  }
 
  // DELETE
  function deleteOrder(id: number) {
    orders.value = orders.value.filter(o => o.id !== id)
  }
 
  // Join an open order. Returns false if joining was niett possible
  function joinOrder(orderId: number, memberName: string): boolean {
    const order = orders.value.find(o => o.id === orderId)
    if (!order || !memberName || order.status !== 'open') return false
 
    if (order.participants.some(p => p.name === memberName)) return false
 
    order.participants.push({ name: memberName, grams: order.minimumGrams })
    return true
  }
 
  function closeOrder(id: number) {
    const order = orders.value.find(o => o.id === id)
    if (order) {
      order.status = 'closed'
    }
  }
 
  return {
    orders,
    openOrders,
    closedOrders,
    getTotalGrams,
    addOrder,
    updateOrder,
    deleteOrder,
    joinOrder,
    closeOrder
  }
}