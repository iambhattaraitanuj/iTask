import express from "express";
import jwt from "jsonwebtoken";
import Task from "../database/db.js";
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token provided.");
    return res.json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "mysecretkey");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.json({ error: "Unauthorized" });
  }
};

router.get("/tasks", authenticate, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.post("/add", authenticate, async (req, res) => {
  const { message } = req.body;
  try {
    if (message === "") {
      console.log("Title is empty");
    } else {
      await Task.create({ title: message, userId: req.userId });
    }
    let data = await Task.find();
    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/delete", authenticate, async (req, res) => {
  const { deleteList } = req.body;
  try {
    if (deleteList === "") {
      console.log("There is no list to delete");
    } else {
      await Task.deleteOne({ title: deleteList, userId: req.userId });
      res.send("Task deleted");
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/edit", authenticate, async (req, res) => {
  const { editList } = req.body;
  try {
    if (editList === "") {
      console.log("There is no list to edit");
    } else {
      await Task.deleteOne({ title: editList, userId: req.userId });
      res.send("Task edited");
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/clear", authenticate, async (req, res) => {
  try {
    await Task.deleteMany({ userId: req.userId });
    res.send("Task cleared");
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
