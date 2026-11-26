import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";

import { CoffeeBag } from "./CoffeeBag.js";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    name!: string;

    @OneToMany(() => CoffeeBag, (bag) => bag.owner)
    coffeeBags?: CoffeeBag[];
}