import { ref, computed, watch } from 'vue'
import type { CuppingScore, Tasting } from '../types/Tasting'

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
        scores: [],
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
        scores: [],
        status: 'completed'
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
  const activeTastings = computed(() => tastings.value.filter(t => t.status === 'active'))
  const completedTastings = computed(() => tastings.value.filter(t => t.status === 'completed'))
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
      scores: [],
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
  // closing sessions
  function completeTasting(id: number) {
    const session = tastings.value.find(t => t.id === id)
    if (session) session.status = 'completed'
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

  // Rule: Calculate average dynamically
  function getAverageScore(session: Tasting, position: number): string {
    // Safety check in case scores is undefined on old data
    if (!session.scores) return 'Pending...' 
    
    const scores = session.scores.filter(s => s.position === position)
    if (scores.length === 0) return 'Pending...'
    
    const total = scores.reduce((sum, s) => sum + s.score, 0)
    return (total / scores.length).toFixed(1) + ' / 10'
  }

  // Rule: Only add score if member is confirmed
    function addScore(tastingId: number, score: CuppingScore) {
    const session = tastings.value.find(t => t.id === tastingId)
    if (!session) return
    // Safety check
    if (!session.scores) session.scores = [] 
    
    if (session && session.confirmedAttendees.includes(score.memberName)) {
      session.scores.push(score)
    }
  }
  function getWinningBean(session: Tasting) {
    if (!session.scores || session.scores.length === 0) return { name: 'No scores', score: '-' }
    
    const lineupArray = session.lineup.split(',').map(b => b.trim()).filter(Boolean)
    let bestScore = 0
    let bestBean = 'None'

    for (let i = 0; i < lineupArray.length; i++) {
      const pos = i + 1
      const posScores = session.scores.filter(s => s.position === pos)
      if (posScores.length > 0) {
        const avg = posScores.reduce((sum, s) => sum + s.score, 0) / posScores.length
        if (avg > bestScore) {
          bestScore = avg
          bestBean = lineupArray[i] || 'Unknown'
        }
      }
    }
    return { name: bestBean, score: bestScore > 0 ? `${bestScore.toFixed(1)} / 10` : '-' }
  }

   return {
    tastings,
    activeTastings,
    completedTastings,
    activeCount,
    addTasting,
    updateTasting,
    deleteTasting,
    completeTasting,
    registerMember,
    addScore,
    getAverageScore,
    getWinningBean
  }
}
