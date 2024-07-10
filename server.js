import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
const app = express();
//routes
import jobRouter from "./routes/jobRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

app.use("/api/v1/jobs", jobRouter);

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

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
