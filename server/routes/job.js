import express from "express";
import job from "../controllers/jobsController"
import passport from "passport";

const router = express.Router();

router.post("/newJob", job.createJob)
router.get("/getJobs", job.findAll)
router.get("/listing/:id", job.findId)
router.get("/getBookmarks/", job.getBookmarks)

export default router;