import express from "express";

import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivityById,
  deleteActivityById
} from "./ActivitiesFunctions.js";

const router = express.Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.get("/:id", getActivityById);
router.patch("/:id", updateActivityById);
router.delete("/:id", deleteActivityById);

export default router;
