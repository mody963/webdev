// net zoals mo de database entery temporery aangemaakt
// DATABASE ENTITY TEMPORARY

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @entity verteld orm dat de class een database tabel represent
@Entity()
export class GroupOrder {

    // zorgt ervoor dat het automatisch een unice id krijgt(drm ook nie in constructor want onnodig)8uuyhggfgv 
    @PrimaryGeneratedColumn()
    id!: number;

    // zegt wat er al colom in de db komt. 
    @Column("integer")
    beanId: number;

    @Column("integer")
    starterId: number;

    @Column("integer")
    minimumGrams: number;

    @Column("text")
    closingDate: string;

    @Column("text")
    status: "open" | "placed" | "failed" | "cancelled";

    constructor(
        beanId: number,
        starterId: number,
        minimumGrams: number,
        closingDate: string
    ) {
        this.beanId = beanId;
        this.starterId = starterId;
        this.minimumGrams = minimumGrams;
        this.closingDate = closingDate;
        this.status = "open";
    }
}



/*

    ! is zodat TypeScript niet zijkt dat ze nog geen beginwaarde hebben
*/
