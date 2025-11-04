import express from "express";
import {
  createVaxReq,
  getVaxReqs,
  getVaxReqById,
  updateVaxReq,
  deleteVaxReq
} from "./VaxReqFunctions.js";

const router = express.Router();

router.post("/", createVaxReq);
router.get("/", getVaxReqs);
router.get("/:id", getVaxReqById);
router.put("/:id", updateVaxReq);
router.delete("/:id", deleteVaxReq);

export default router;
