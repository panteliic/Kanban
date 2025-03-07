import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RefreshToken } from "./RefreshToken";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  googleId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];
}
