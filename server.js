import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
const app = express();
//routes
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/errorhandlerMiddleware.js";

import mongoose from "mongoose";
import { authenticateUser } from "./middleware/authMiddelware.js";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);

// // Get All jobs
// app.get("/api/v1/jobs");

// // Create Job
// app.post("/api/v1/jobs");

// // Get Single Job
// app.get("/api/v1/jobs/:id");

// // Edit Job
// app.patch("/api/v1/jobs/:id");

// // Delete Job
// app.delete("/api/v1/jobs/:id");

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
