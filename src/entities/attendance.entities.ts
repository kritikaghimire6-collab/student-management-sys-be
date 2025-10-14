import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./base.entities";
import { AttendanceStatusEnum } from "../utils/enum";
import { User } from "./user.entities";

@Entity({ name: "attendance" })
export class Attendance extends Base {
  @Column({ name: "date", type: "timestamp", nullable: true })
  date!: Date;

  @Column({
    name: "present_status",
    type: "enum",
    enum: AttendanceStatusEnum,
    nullable: true,
  })
  presentStatus!: AttendanceStatusEnum;

  // Each attendance record belongs to one student
  @ManyToOne(() => User, (user) => user.attendanceRecords)
  @JoinColumn({ name: "student_id" })
  student!: User;

  // Recorded by a faculty member
  @ManyToOne(() => User, (user) => user.attendanceRecorded)
  @JoinColumn({ name: "recorded_by" })
  recorder!: User;
}
