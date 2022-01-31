import express from "express";
import mongoose from "mongoose";
import { Course } from "../models/Course.js";
import { User } from "../models/User.js";
export const courseRouter = express.Router();

courseRouter.get("/", async (req, res) => {
  const courses = await Course.find({}).exec();
  res.status(200).json({ data: courses });
});

courseRouter.get("/create", async (req, res) => {
  const courses = [
    {
      name: "GK",
      description: "General knowledge is information",
      maxCapacity: 60,
      startsOn: {
        date: "2021-09-19",
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
        date: "2021-09-19",
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
        date: "2021-09-19",
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
        date: "2021-09-19",
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
        date: "2021-09-19",
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
    console.log(e);
    res.status(400).end();
  }
});
courseRouter.post("/enroll/:id", async (req, res) => {
  const courseId = req.params.id;
  const user = { name: req.body.name, email: req.body.email };
  try {
    const courseDetails = await Course.findById(courseId)
      .populate("enrolledStudents")
      .exec();
    //console.log("populated CourseDetails ", courseDetails);
    let userDetails = await User.findOne({ email: user.email }).exec();
    if (!userDetails) {
      const newUser = await User.create(user);
      userDetails = newUser;
    }
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
      await userDetails.enrolledCourses.push(courseDetails._id);
      await userDetails.save();
      res.status(200).json({
        message: "max capacity reached, entered into waiting list",
        status: "added to waiting list",
      });
    } else {
      courseDetails.enrolledStudents.push(userDetails._id);
      await courseDetails.save();
      await userDetails.enrolledCourses.push(courseDetails._id);
      await userDetails.save();
      res
        .status(200)
        .json({ message: "sucessfully enrolled", status: "enrolled" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
});

function checkEligibility(courseDetails) {
  const hrs = parseInt(courseDetails.time.slice(0, 2));
  const min = parseInt(courseDetails.time.slice(3));
  const today = new Date();
  let deadline = new Date(courseDetails.date);
  let date1 = new Date().toISOString().slice(0, 10);
  deadline = deadline.toISOString().slice(0, 10);
  // console.log(date1);
  // console.log(deadline);
  if (date1 < deadline) {
    return true;
  } else if (date1 > deadline) {
    return false;
  }
  // console.log("comp time");
  const currentTime = today.getHours() * 60 + today.getMinutes();
  const deadlinetime = hrs * 60 + min;
  if (deadlinetime - currentTime <= 30) {
    return false;
  }
  return true;
}
// unenroll from the course
courseRouter.post("/unenroll/:id", async (req, res) => {
  const courseId = req.params.id;
  const user = { name: req.body.name, email: req.body.email };
  try {
    const courseDetails = await Course.findById(courseId);
    let userDetails = await User.findOne({ email: user.email }).exec();
    if (!userDetails) {
      res.status(400).json({ message: "not registered to any course" });
    }
    if (!checkEligibility(courseDetails.startsOn)) {
      return res.status(400).json({
        message: "cannot unenroll in last minute",
        status: "unenroll failed",
      });
    }

    let inEnrolledList = false;
    courseDetails.enrolledStudents.forEach((u, index) => {
      if (u._id.toString() === userDetails._id.toString()) {
        courseDetails.enrolledStudents.splice(index, 1);
        inEnrolledList = true;
        if (courseDetails.waitingList.length !== 0) {
          let newCandidate = courseDetails.waitingList.shift();
          courseDetails.enrolledStudents.push(newCandidate);
        }
        courseDetails.save();
        return;
      }
    });
    userDetails.enrolledCourses.forEach((c, index) => {
      if (c._id.toString() === courseDetails._id.toString()) {
        userDetails.enrolledCourses.splice(index, 1);
        userDetails.save();
        //console.log("removed");
        return;
      }
    });
    if (!inEnrolledList) {
      courseDetails.waitingList.forEach((u, index) => {
        if (u._id.toString() === userDetails._id.toString()) {
          //console.log("true", index);
          courseDetails.waitingList.splice(index, 1);
          inEnrolledList = true;
          courseDetails.save();
          return;
        }
      });
    }
    if (!inEnrolledList) {
      return res.status(400).json({ message: "not registered to any course" });
    }
    res.status(200).json({ status: "unenrolled" });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});
