import express from "express";
import { User } from "../models/User.js";
export const router = express.Router();
import { courseRouter } from "./course.js";

router.use("/course", courseRouter);
router.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to the api",
  });
});
router.get("/users", async (req, res) => {
  const users = await User.find({}).exec();
  res.status(200).json({
    message: "OK",
    data: users,
  });
});
router.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email })
    .populate({ path: "enrolledCourses" })
    .exec();
  res.status(200).json({
    message: "OK",
    data: user,
  });
});
router.post("/createuser", async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const newUser = await User.create(req.body);
    if (!newUser) {
      return res.status(404).end();
    }
    res.status(200).json({ user: newUser });
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
});
