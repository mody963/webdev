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
  confirmedAttendees: string[];  // ATTENDEES IS EIGENLIJK OOK EEN ENTITY.

  @Column("simple-json")
  waitingList: string[]; // IS EIGENLIJK GEWOON EEN ENTITY  VOOR CONFIRMED ATTENDEE EN WAITINGLIST

  @Column("text")
  status: "active" | "completed" | "cancelled"; // enum maken inplaats van hardcoded. of model of iets voor validatie.

  // Relation: One tasting has many cupping scores
  @OneToMany(() => CuppingScore, (score) => score.tasting)
  scores?: CuppingScore[];
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