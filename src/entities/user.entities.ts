import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entities";
import { RoleEnum } from "../utils/enum";
import { Attendance } from "./attendance.entities";
import { Result } from "./result.entities";

@Entity({ name: "users" })
export class User extends Base {
  @Column({ name: "name", type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({
    name: "email",
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({ name: "password", type: "varchar", length: 255, nullable: false })
  password!: string;

  @Column({ name: "role", type: "enum", enum: RoleEnum, nullable: true })
  role!: RoleEnum;

  // Student’s attendance records
  @OneToMany(() => Attendance, (att) => att.student)
  attendanceRecords!: Attendance[];

  // Faculty’s recorded attendance
  @OneToMany(() => Attendance, (att) => att.recorder)
  attendanceRecorded!: Attendance[];

  // Student’s results
  @OneToMany(() => Result, (result) => result.student)
  results!: Result[];

  // Faculty’s recorded results
  @OneToMany(() => Result, (result) => result.recorder)
  resultsRecorded!: Result[];
}
