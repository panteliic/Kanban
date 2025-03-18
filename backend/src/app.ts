import passport from "./config/passport";

const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");

import authRoutes from "./routes/authRoutes";
import boardRoutes from "./routes/boardRoutes";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello, World! TypeORM is connected.");
});

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);

export default app;
