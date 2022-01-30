import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/course-buddy");

export const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, `error in connecting to the dabase`)
);

db.once("open", () => {
  console.log("connected to the database successfully");
});
