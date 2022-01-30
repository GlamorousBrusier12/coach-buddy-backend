import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    maxlength: 1000,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  startsOn: {
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  waitingList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

export const Course = mongoose.model("course", courseSchema);
