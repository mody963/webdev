import type { User } from "./User"

export interface CoffeeBag {
  id: number
  owner: User
  bean: string
  roaster: string
  grams: string
  dayOfArival: string
  bagFreshness: string
  finished: boolean
}