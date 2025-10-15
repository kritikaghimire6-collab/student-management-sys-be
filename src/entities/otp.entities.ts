import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Base} from "./base.entities";
import {OTPType} from "../utils/enum";
import {User} from "./user.entities";

@Entity({name: "otp"})
export class OTP extends Base {
  @Column({name: "otp_code", type: "varchar", length: 6})
  otpCode!: string;

  @ManyToOne(() => User, (user) => user.otp)
  @JoinColumn({name: "user"})
  user!: User;

  @Column({name: "type", type: "enum", enum: OTPType, default: OTPType.LOGIN})
  type!: OTPType;
}
