import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { User } from "./User.js";

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

    @ManyToOne(() => User, (user) => user.coffeeBags, {
        nullable: false
    })
    @JoinColumn({ name: "ownerId" })
    owner?: User;
}