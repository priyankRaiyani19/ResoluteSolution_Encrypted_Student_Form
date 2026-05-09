const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: any, res: any) => {
  res.json({ status: "ok" });
});

app.use("/api", authRoutes);
app.use("/api", studentRoutes);

module.exports = app;