import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { RefreshToken } from "./entity/RefreshToken";
import { Board } from "./entity/Board";
import { BoardColumn } from "./entity/BoardColumn";
import { Task } from "./entity/Task";
import { Subtask } from "./entity/Subtask";
const dotenv = require("dotenv");
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [Users, RefreshToken, Board, BoardColumn, Task, Subtask],
  migrations: ["src/migration/*.ts"], 
  subscribers: [],
});
