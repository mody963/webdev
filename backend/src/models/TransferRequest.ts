class TransferRequest {
    bagId: number;
    senderId: number;
    recipientId: number;

    constructor(
        bagId: number,
        senderId: number,
        recipientId: number
    ) {
        this.bagId = bagId;
        this.senderId = senderId;
        this.recipientId = recipientId;
    }
}

const transferRequests: TransferRequest[] = [];

function addTransferRequest(transfer: TransferRequest) {
    transferRequests.push(transfer);
}

function getAllTransferRequests(): TransferRequest[] {
    return transferRequests;
}

export {
    TransferRequest,
    transferRequests,
    addTransferRequest,
    getAllTransferRequests
};