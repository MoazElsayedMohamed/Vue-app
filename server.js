import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
const app = express();
import { nanoid } from "nanoid";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

// Get All jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// Create Job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "please provide company and position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
