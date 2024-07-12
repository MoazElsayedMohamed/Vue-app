import { Router } from "express";
const router = Router();
import {
  validateJobInput,
  validateIdParams,
} from "../middleware/validationMiddleware.js";

import {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
} from "../controllers/jobController.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParams, getJob)
  .patch(validateIdParams, updateJob)
  .delete(validateIdParams, deleteJob);

export default router;
