import mongoose from "mongoose";
import { Course } from "../models/Course.js";
import { User } from "../models/User.js";
mongoose.connect("mongodb://localhost:27017/course-buddy");

export const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, `error in connecting to the dabase`)
);

db.once("open", async () => {
  console.log("connected to the database successfully");
  const user = [
    {
      name: "naveen",
      email: "abc@gmail.com",
    },
    {
      name: "rajesh",
      email: "test1@gmail.com",
    },
    {
      name: "ramesh",
      email: "test2@gmail.com",
    },
    {
      name: "suresh",
      email: "test3@gmail.com",
    },
    {
      name: "umesh",
      email: "test4@gmail.com",
    },
  ];
  const courses = [
    {
      name: "GK",
      description: "General knowledge is information",
      maxCapacity: 2,
      startsOn: {
        date: "2021-09-19",
        time: "04:45",
      },
      enrolledStudents: [],
      waitingList: [],
      duration: 120,
    },
    {
      name: "Maths",
      description: "General knowledge is information",
      maxCapacity: 3,
      startsOn: {
        date: "2021-02-02",
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
        date: "2022-09-19",
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
        date: "2022-09-19",
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
        date: "2022-09-19",
        time: "04:45",
      },
      enrolledStudents: [],
      waitingList: [],
      duration: 120,
    },
  ];
  try {
    const defaultCourses = await Course.create(courses);
    console.log("created new corses");
    // res

    //   .status(200)
    //   .json({ message: "Courses created", data: newCreatedCourses });
  } catch (e) {
    console.log("notcreated new corses");
    // console.log(e);
    // res.status(400).end();
  }
  try {
    const defaultUsers = await User.create(user);
    console.log("created new users");
    // res

    //   .status(200)
    //   .json({ message: "Courses created", data: newCreatedCourses });
  } catch (e) {
    console.log("notcreated new users");
    // console.log(e);
    // res.status(400).end();
  }
});
