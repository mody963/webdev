export type TransferStatus = 'pending' | 'accepted' | 'declined'

export interface BagTransfer {
  id: number
  bagId: number
  fromUserId: number
  toUserId: number
  status: TransferStatus
}