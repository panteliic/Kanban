import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Board } from "./Board";
import { Task } from "./Task";

@Entity("board_columns")
export class BoardColumn {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: "CASCADE" })
  board: Board;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks: Task[];

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
