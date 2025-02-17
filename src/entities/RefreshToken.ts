import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  token: string;

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  expiresAt: Date;
}