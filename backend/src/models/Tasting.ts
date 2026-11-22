import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CuppingScore } from "./CuppingScore.js";

@Entity()
export class Tasting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  title: string;

  @Column("text")
  host: string;

  @Column("text")
  dateTime: string;

  @Column("integer")
  capacity: number;

  @Column("text")
  lineup: string;

  @Column("simple-json")
  confirmedAttendees: string[];

  @Column("simple-json")
  waitingList: string[];

  @Column("text")
  status: "active" | "completed" | "cancelled";

  // Relation: One tasting has many cupping scores
  @OneToMany(() => CuppingScore, (score) => score.tasting)
  scores?: CuppingScore[] | undefined;
  constructor(
    title: string,
    host: string,
    dateTime: string,
    capacity: number,
    lineup: string
  ) {
    this.title = title;
    this.host = host;
    this.dateTime = dateTime;
    this.capacity = capacity;
    this.lineup = lineup;
    this.confirmedAttendees = [`${host} (Host)`];
    this.waitingList = [];
    this.status = "active";
  }
}