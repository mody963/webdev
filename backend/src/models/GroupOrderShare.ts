import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from "typeorm";

import {GroupOrder} from "./GroupOrder.js";
import { User } from "./User.js";

@Entity()
@Unique(["groupOrder", "member"])
export class GroupOrderShare{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("integer")
    grams: number;

    @ManyToOne(()=> GroupOrder, order => order.shares, {nullable: false})
    groupOrder?: GroupOrder;

    @ManyToOne(() => User, {nullable: false})
    member?: User;

    constructor(grams: number)
    {
        this.grams = grams;
    }

}