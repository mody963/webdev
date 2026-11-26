import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class TransferRequest {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("integer")
    bagId!: number;

    @Column("integer")
    senderId!: number;

    @Column("integer")
    recipientId!: number;
}