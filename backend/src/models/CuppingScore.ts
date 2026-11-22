import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tasting } from "./Tasting.js";

@Entity()
export class CuppingScore {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  memberName: string;

  @Column("text")
  beanName: string;

  @Column("real")
  points: number;

  @Column("text")
  remark: string;

  // Relation: Many scores belong to one tasting
  @ManyToOne(() => Tasting, (tasting) => tasting.scores)
  tasting?: Tasting | undefined;

  constructor(memberName: string, beanName: string, points: number, remark: string, tasting?: Tasting) {
    this.memberName = memberName;
    this.beanName = beanName;
    this.points = points;
    this.remark = remark;
    if (tasting !== undefined) {
      this.tasting = tasting;
    }
  }
}