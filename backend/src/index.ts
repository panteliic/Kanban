import "reflect-metadata";
const dotenv = require("dotenv")
import { AppDataSource } from "./data-source";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });