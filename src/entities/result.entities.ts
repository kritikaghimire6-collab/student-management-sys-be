import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entities";
import { Base } from "./base.entities";

@Entity({ name: "results" })
export class Result extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  // Each result belongs to one student
  @ManyToOne(() => User, (user) => user.results)
  @JoinColumn({ name: "student_id" })
  student!: User;

  @Column({ type: "varchar", length: 100 })
  subject!: string;

  @Column({ type: "int", nullable: true })
  marks!: number;

  @Column({ type: "varchar", length: 4, nullable: true })
  grade!: string;

  // Recorded by a faculty member
  @ManyToOne(() => User, (user) => user.resultsRecorded)
  @JoinColumn({ name: "recorded_by" })
  recorder!: User;
}
