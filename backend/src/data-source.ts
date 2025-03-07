import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { RefreshToken } from "./entity/RefreshToken";
const dotenv = require("dotenv");
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host:  process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Users, RefreshToken],
  migrations: [],
  subscribers: [],
});
