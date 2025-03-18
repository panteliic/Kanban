import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Board } from "./Board";
import { Task } from "./Task";

@Entity("board_columns")
export class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string; // npr. "todo", "doing", "done", ili dodatne kolone

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: "CASCADE" })
  board: Board;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks: Task[];
}
