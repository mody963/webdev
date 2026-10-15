
import { ref, watch } from 'vue'


export interface BrewNote {
  id: number
  title: string
  beanName: string
  method: string
  dose: string
  grind: string
  result: string
}

const brewNotes = ref<BrewNote[]>(
  JSON.parse(localStorage.getItem('brewNotes') || '[]')
)

watch(
  brewNotes,
  (latest) => {
    localStorage.setItem('brewNotes', JSON.stringify(latest))
  },
  { deep: true }
)

export function useBrewNotes() {
  function addBrewNote(data: Omit<BrewNote, 'id'>) {
    const newBrewNote: BrewNote = {
      id: Date.now(),
      ...data
    }

    brewNotes.value.push(newBrewNote)
  }

  function deleteBrewNote(id: number) {
    brewNotes.value = brewNotes.value.filter(
      note => note.id !== id
    )
  }

  return {
    brewNotes,
    addBrewNote,
    deleteBrewNote
  }
}