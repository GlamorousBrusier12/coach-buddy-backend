import express from "express";
import mongoose from "mongoose";
import { Course } from "../models/Course.js";
import { User } from "../models/User.js";
export const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const courses = await Course.find({}).exec();
  res.status(200).json({ data: courses });
});

postRouter.get("/create", async (req, res) => {
  const courses = [
    {
      name: "GK",
      description: "General knowledge is information",
      maxCapacity: 60,
      startsOn: {
        date: Date.now(),
        time: "04:45",
      },
      enrolledStudents: [],
      waitingList: [],
      duration: 120,
    },
    // ];
    {
      name: "Maths",
      description: "General knowledge is information",
      maxCapacity: 60,
      startsOn: {
        date: Date.now(),
        time: "04:45",
      },
      enrolledStudents: [],
      waitingList: [],
      duration: 120,
    },
    {
      name: "Physics",
      description: "General knowledge is information",
      maxCapacity: 60,
      startsOn: {
        date: Date.now(),
        time: "04:45",
      },
      enrolledStudents: [],
      waitingList: [],
      duration: 120,
    },
    {
      name: "Yoga",
      description: "General knowledge is information",
      maxCapacity: 60,
      startsOn: {
        date: Date.now(),
        time: "04:45",
      },
      enrolledStudents: [],
      waitingList: [],
      duration: 120,
    },
    {
      name: "Gymnastics",
      description: "General knowledge is information",
      maxCapacity: 60,
      startsOn: {
        date: Date.now(),
        time: "04:45",
      },
      enrolledStudents: [],
      waitingList: [],
      duration: 120,
    },
  ];
  try {
    const newCreatedCourses = await Course.create(courses);
    res
      .status(200)
      .json({ message: "Courses created", data: newCreatedCourses });
  } catch (e) {
    res.status(400).end();
  }
});
postRouter.post("/enroll/:id", async (req, res) => {
  const courseId = req.params.id;
  const user = { name: req.body.name, email: req.body.email };
  try {
    const courseDetails = await Course.findById(courseId);
    const userDetails = await User.findOne({ email: user.email }).exec();
    let alreadyRegistered = false;
    courseDetails.enrolledStudents.forEach((u) => {
      if (u._id.toString() === userDetails._id.toString()) {
        alreadyRegistered = true;
        return;
      }
    });
    if (alreadyRegistered) {
      return res.status(400).json({
        message: "already registered for the course",
        status: "already registered",
      });
    }
    if (courseDetails.maxCapacity === courseDetails.enrolledStudents.length) {
      courseDetails.waitingList.forEach((u) => {
        if (u._id.toString() === userDetails._id.toString()) {
          alreadyRegistered = true;
          return;
        }
      });
      if (alreadyRegistered) {
        return res.status(400).json({
          message: "already in the waiting list for the course",
          status: "already in waiting list",
        });
      }
      courseDetails.waitingList.push(userDetails._id);
      await courseDetails.save();
      res.status(200).json({
        message: "max capacity reached, entered into waiting list",
        status: "added to waiting list",
      });
    } else {
      courseDetails.enrolledStudents.push(userDetails._id);
      await courseDetails.save();
      res
        .status(200)
        .json({ message: "sucessfully enrolled", status: "enrolled" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
});
