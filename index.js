import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { db } from "./config/mongoose.js";
import { router } from "./routes/index.js";
const app = express();

const PORT = 3000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// redirects all the routes related to api to index.js inrouter
app.use("/api", router);

// server listens to the given port
app.listen(PORT, (e) => {
  if (e) {
    return console.log("error in starting the router", e);
  }
  console.log(`your server is up and running on port ${PORT}`);
});
