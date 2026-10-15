export interface Participant {
  name: string
  grams: number
}
 
export interface GroupOrder {
  id: number
  bean: string
  minimumGrams: number
  closingDate: string
  starter: string
  participants: Participant[]
  status: 'open' | 'closed'
}