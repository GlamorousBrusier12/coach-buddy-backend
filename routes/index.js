import express from "express";
import { User } from "../models/User.js";
export const router = express.Router();
import { postRouter } from "./course.js";

router.use("/course", postRouter);

// router.get("/", (req, res) => {
//   res.status(200).json({
//     message: "OK",
//     type: "api",
//   });
// });

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
    res.status(404).end();
  }
});
