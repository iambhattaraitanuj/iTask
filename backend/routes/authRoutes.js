import express from "express";
import jwt from "jsonwebtoken";
import User from "../database/user.js";
import bcrypt from 'bcrypt'
const router = express.Router();
const JWT_SECRET = "mysecretkey";
const saltRounds  = 10;

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, saltRounds)
  console.log(hashedPassword)
  try {
    const includeUser = await User.findOne({ email });
    if (includeUser) {
      res.status(404).json({
        message: "user already exists",
      });
    } else {
      await User.create({ username, email, password: hashedPassword });
    }

    res.status(200).json({
      message: "user created",
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const includeUser = await User.findOne({ email });
    let comparePassword = await bcrypt.compare(password, includeUser.password)
    if (email === "" && password === "") {
      res.json({
        message: "empty email or password",
      });
    } else if (!includeUser) {
      res.status(404).json({
        message: "email didn't match",
      });
    } else if (!comparePassword) {
      res.status(404).json({
        message: "password didn't match",
      });
    } else {
      const token = jwt.sign({ userId: includeUser._id }, JWT_SECRET, {
        expiresIn: "1h",
      })
      res.status(200).json({ token });
    }
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
