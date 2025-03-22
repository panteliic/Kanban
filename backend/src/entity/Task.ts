import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoardColumn } from "./BoardColumn";
import { Subtask } from "./Subtask";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.tasks, {
    onDelete: "CASCADE",
  })
  column: BoardColumn;

  @OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
  subtasks: Subtask[];

  @CreateDateColumn({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string;

  @UpdateDateColumn({
    type: "timestamp without time zone",
    onUpdate: "CURRENT_TIMESTAMP",
    nullable: true,
  })
  updatedAt: string;
}
