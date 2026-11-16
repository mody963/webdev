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

// net zoals mo de database entery temporery aangemaakt
// DATABASE ENTITY TEMPORARY
/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class GroupOrder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("integer")
    beanId!: number;

    @Column("integer")
    starterId!: number;

    @Column("integer")
    minimumGrams!: number;

    @Column("text")
    closingDate!: string;

    @Column("text")
    status!: string;
}
    ! is zodat TypeScript niet zijkt dat ze nog geen beginwaarde hebben
*/
