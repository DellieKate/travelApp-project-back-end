import express from "express";
import {
  createVaxReq,
  getVaxReqs,
  getVaxReqById,
  updateVaxReqById,
  deleteVaxReqById
} from "./VaxReqFunctions.js";

const router = express.Router();

router.post("/", createVaxReq);
router.get("/", getVaxReqs);
router.get("/:id", getVaxReqById);
router.patch("/:id", updateVaxReqById);
router.delete("/:id", deleteVaxReqById);

export default router;
