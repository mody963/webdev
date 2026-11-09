
class GroupOrder {
    id: number;
    beanId: number;
    starterId: number;
    minimumGrams: number;
    closingDate: string;
    status: string;

    constructor(
        id: number,
        beanId: number,
        starterId: number,
        minimumGrams: number,
        closingDate: string
    ) {
        this.id = id;
        this.beanId = beanId;
        this.starterId = starterId;
        this.minimumGrams = minimumGrams;
        this.closingDate = closingDate;
        this.status = "open";
    }
}

const groupOrders: GroupOrder[] = [];

function addGroupOrder(order: GroupOrder) {
    groupOrders.push(order);
}

function getAllGroupOrders(): GroupOrder[] {
    return groupOrders;
}

export { GroupOrder, groupOrders, addGroupOrder, getAllGroupOrders };
