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
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Users, RefreshToken, Board, BoardColumn, Task, Subtask],
  migrations: ["src/migration/*.ts"], 
  subscribers: [],
});
