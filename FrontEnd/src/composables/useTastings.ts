import { ref, computed, watch } from 'vue'
import type { Tasting } from '../types/Tasting'

export function useTastings() {
  // Lesson 3: Load initial state from localStorage or use defaults
  const tastings = ref<Tasting[]>(
    JSON.parse(localStorage.getItem('zetsel_tastings') || '[]')
  )

  // Provide initial seed tastings if the user opens the page for the first time
  if (tastings.value.length === 0) {
    tastings.value = [
      {
        id: 1,
        title: 'Winter Cupping 2026',
        host: 'Mo',
        dateTime: '2026-09-13T19:30',
        capacity: 6,
        lineup: 'Geisha, Worka, Chelbesa, Finca Betulia',
        confirmedAttendees: ['Mo (Host)', 'Aimee', 'Daan', 'Fernando', 'Lars', 'Sofia'],
        waitingList: ['Kavita (10:15)', 'Bram (11:40)'],
        status: 'active'
      },
      {
        id: 2,
        title: 'Washed African Profiles',
        host: 'Elena',
        dateTime: '2026-10-04T20:00',
        capacity: 6,
        lineup: 'Worka Sakaro, Chelbesa',
        confirmedAttendees: ['Elena (Host)', 'Thijs', 'Sara'],
        waitingList: [],
        status: 'active'
      }
    ]
  }

  // Lesson 3: Deep watcher to automatically sync any changes to localStorage
  watch(
    tastings,
    (latest) => {
      localStorage.setItem('zetsel_tastings', JSON.stringify(latest))
    },
    { deep: true }
  )

  // Lesson 2: Computed derived state
  const activeCount = computed(() => {
    return tastings.value.filter(t => t.status === 'active').length
  })

  // Data mutation methods (pure data logic, no alerts or UI side-effects)
  function addTasting(tastingData: Omit<Tasting, 'id' | 'confirmedAttendees' | 'waitingList' | 'status'>) {
    const newTasting: Tasting = {
      id: Date.now(),
      // spread operator takes all properties.
      ...tastingData,
      confirmedAttendees: [`${tastingData.host} (Host)`],
      waitingList: [],
      status: 'active'
    }
    tastings.value.unshift(newTasting)
  }

  function updateTasting(updatedTasting: Tasting) {
    const index = tastings.value.findIndex(t => t.id === updatedTasting.id)
    if (index !== -1) {
      tastings.value[index] = updatedTasting
    }
  }

  function deleteTasting(id: number) {
    tastings.value = tastings.value.filter(t => t.id !== id)
  }

  // Case rule: If space exists -> confirmed seat. If full -> waitlist
  function registerMember(tastingId: number, memberName: string) {
    const session = tastings.value.find(t => t.id === tastingId)
    if (!session || !memberName) return

    if (session.confirmedAttendees.includes(memberName) || session.waitingList.includes(memberName)) {
      return
    }

    if (session.confirmedAttendees.length < session.capacity) {
      session.confirmedAttendees.push(memberName)
    } else {
      session.waitingList.push(memberName)
    }
  }

  return {
    tastings,
    activeCount,
    addTasting,
    updateTasting,
    deleteTasting,
    registerMember
  }
}