import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import bodyParser from "body-parser";

const port = 3001;
mongoose.connect("mongodb://localhost:27017/todolist");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api", taskRoutes);

app.get("/", async (req, res) => {
  res.send("I am server");
});

app.listen(port, () => {
  console.log(`Server starting on http://localhost:${port}`);
});