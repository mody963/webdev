import { ref, computed, watch } from 'vue'
import type { GrinderScale } from '../types/GrindersScale'

export function useGrinderScaleReservations() {
  // Lesson 3: Load initial state from localStorage or use defaults
  const GrinderScalesReservations = ref<GrinderScale[]>(
    JSON.parse(localStorage.getItem('zetsel_grindersscales') || '[]')
  )

  // Provide initial seed tastings if the user opens the page for the first time
  if (GrinderScalesReservations.value.length === 0) {
    GrinderScalesReservations.value = [
      {
        id: 1,
        grinderScale: "Grinder 1",
        status: "active"
      },
      {
        id: 2,
        grinderScale: "Grinder 2",
        status: "active"
      }
    ]
  }

  // Lesson 3: Deep watcher to automatically sync any changes to localStorage
  watch(
    GrinderScalesReservations,
    (latest) => {
      localStorage.setItem('zetsel_grindersscales', JSON.stringify(latest))
    },
    { deep: true }
  )

  // Lesson 2: Computed derived state
  const activeCount = computed(() => {
    return GrinderScalesReservations.value.filter(t => t.status === 'active').length
  })

  // Data mutation methods (pure data logic, no alerts or UI side-effects)
  function addGrinderScale(GrindersScalesReservationsData: Omit<GrinderScale, 'id' | 'status'>) {
    const newGrinderScale: GrinderScale = {
      id: Date.now(),
      status: "active",
      // spread operator takes all properties.
      ...GrindersScalesReservationsData,
    }
    GrinderScalesReservations.value.unshift(newGrinderScale)
  }

  function updateGrinderScale(updatedGrinderScale: GrinderScale) {
    const index = GrinderScalesReservations.value.findIndex(t => t.id === updatedGrinderScale.id)
    if (index !== -1) {
      GrinderScalesReservations.value[index] = updatedGrinderScale
    }
  }

  function deleteGrinderScale(id: number) {
    GrinderScalesReservations.value = GrinderScalesReservations.value.filter(t => t.id !== id)
  }

  return {
    GrinderScalesReservations,
    activeCount,
    addGrinderScale,
    updateGrinderScale,
    deleteGrinderScale,
  }
}