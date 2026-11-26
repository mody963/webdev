import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class CoffeeBag {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("integer")
    ownerId!: number;

    @Column("text")
    bean!: string;

    @Column("text")
    roaster!: string;

    @Column("integer")
    grams!: number;

    @Column("text")
    bagFreshness!: string;

    @Column("boolean", { default: false })
    finished!: boolean;
}