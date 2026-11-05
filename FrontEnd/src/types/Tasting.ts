export interface CuppingScore {
  id: number
  memberName: string
  position: number
  score: number
  remark: string
}

export interface Tasting {
  id: number
  title: string
  host: string
  dateTime: string
  capacity: number
  lineup: string
  confirmedAttendees: string[]
  waitingList: string[]
  scores: CuppingScore[]
  status: 'active' | 'completed'
}
