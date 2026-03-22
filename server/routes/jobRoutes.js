import express from "express";
import {
    getJobById,
    getJobs,
    updateJob,
    deleteJob
} from "../controllers/jobController.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/:id", protectCompany, updateJob);
router.delete("/:id", protectCompany, deleteJob);

export default router;