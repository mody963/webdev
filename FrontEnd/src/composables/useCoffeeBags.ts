import type { CoffeeBag } from '../types/CoffeeBag.ts'
import { ref, watch } from 'vue'

const coffeeBags = ref<CoffeeBag[]>(
  JSON.parse(localStorage.getItem('coffeeBag') || '[]')
)
if (coffeeBags.value.length === 0) {
    coffeeBags.value = [
      {
        id: 1,
        owner: "Jurn",
        bean: "Robusta",
        roaster: "Giraffe Coffee Roasters",
        grams: "500",
        dayOfArival: "13-10-2026",
        bagFreshness: "Fresh",
        finished: false
      },
      {
        id: 2,
        owner: "Karlijn",
        bean: "Arabica",
        roaster: "Giraffe Coffee Roasters",
        grams: "400",
        dayOfArival: "12-10-2026",
        bagFreshness: "Fresh",
        finished: false
      }
    ]
}

watch(
  coffeeBags,
  (latest) => {
    localStorage.setItem('coffeeBags', JSON.stringify(latest))
  },
  { deep: true }
)

export function useCoffeeBag() {
  function addCoffeeBag(data: Omit<CoffeeBag, 'id'>) {
    const newCoffeeBag: CoffeeBag = {
      id: Date.now(),
      ...data
    }

    coffeeBags.value.push(newCoffeeBag)
  }

  function deleteCoffeeBag(id: number) {
    coffeeBags.value = coffeeBags.value.filter(
      note => note.id !== id
    )
  }

  return {
    coffeeBags,
    addCoffeeBag,
    deleteCoffeeBag
  }
}