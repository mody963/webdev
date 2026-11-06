class TransferRequest {
    id: number;
    bagId: number;
    senderId: number;
    recipientId: number;
    status: 'pending' | 'accepted' | 'declined';

    constructor(
        id: number,
        bagId: number,
        senderId: number,
        recipientId: number,
        status: 'pending' | 'accepted' | 'declined' = 'pending'
    ) {
        this.id = id;
        this.bagId = bagId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.status = status;
    }
}

const transferRequests: TransferRequest[] = [];

function addTransferRequest(t: TransferRequest) {
    transferRequests.push(t);
}

function getAllTransferRequests(): TransferRequest[] {
    return transferRequests;
}

function getTransferRequestById(id: number): TransferRequest | undefined {
    return transferRequests.find(t => t.id === id);
}

export {
    TransferRequest,
    transferRequests,
    addTransferRequest,
    getAllTransferRequests,
    getTransferRequestById
};