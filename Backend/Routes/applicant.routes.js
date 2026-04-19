import {applyJob,getAppliedJobs,getApplicants,updateStauts} from "../controllers/applicant.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import isRecruiter from "../middlewares/isRecruiter.js"
import express from "express"

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,isRecruiter,getApplicants);
router.route("/status/:id/update").put(isAuthenticated,isRecruiter,updateStauts);

export default router; 