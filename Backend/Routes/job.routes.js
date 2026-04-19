import { postJob, getAllJobs, getJobById, getAdminJobs, deleteJob, editJob } from "../controllers/job.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import isRecruiter from "../middlewares/isRecruiter.js"
import express from "express"

const router = express.Router();

router.route("/postJob").post(isAuthenticated, isRecruiter, postJob);
router.route("/getAllJobs").get(getAllJobs);
router.route("/getJob/:id").get(isAuthenticated, getJobById);
router.route("/getAdminJobs").get(isAuthenticated, isRecruiter, getAdminJobs);
router.route("/deleteJob/:jobId").delete(isAuthenticated, isRecruiter, deleteJob);
router.route("/edit/:jobId").put(isAuthenticated, isRecruiter, editJob);

export default router;