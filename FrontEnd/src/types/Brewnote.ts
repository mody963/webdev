import type { CoffeeBag } from '../types/CoffeeBag.ts'

export interface BrewNote {
  id: number
  coffeeBag: CoffeeBag['id']
  title: string
  method: string
  dose: string
  grind: string
  result: string
}