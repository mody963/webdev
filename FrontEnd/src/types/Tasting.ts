export interface Tasting {
  id: number
  title: string
  host: string
  dateTime: string
  capacity: number
  lineup: string
  confirmedAttendees: string[]
  waitingList: string[]
  status: 'active' | 'cancelled'
}