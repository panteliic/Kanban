import passport from "./config/passport";

const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");

import authRoutes from "./routes/authRoutes";

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport)

app.get("/", (req, res) => {
  res.send("Hello, World! TypeORM is connected.");
});

app.use(authRoutes);

export default app;
