import express from "express";
import {
  getAllEssentials,
  getOneEssentialById,
  createEssential,
  updateOneEssentialById,
  deleteOneEssentialById
} from "./PackingEssentialsFunctions.js";

const router = express.Router();

/* PACKING ESSENTIALS ROUTER ENDPOINTS:
GET all
GET one
CREATE one
UPDATE one
DELETE one
*/

// GET all
router.get("/", async (request, response, next) => {
  try {
      const packessent = await getAllEssentials();
      response.status(200).json({ message: "Packing Essentials retrieved successfully!", packessent });
  } catch (error) { next (error); }
});

// GET one
router.get("/:targetEssentialId", async (request, response, next) => {
  try {
      const packessent = await getOneEssentialById(request.params.targetEssentialId);
      response.status(200).json({ message: "Packing Essential retrieved successfully!", packessent });
  } catch (error) { next (error); }
});

// CREATE one
router.post("/", async (request, response, next) => {
  try {
      const packessent = await createEssential(request.body);
      response.status(201).json({ message: "Packing Essential created successfully!", packessent });
  } catch (error) { next (error); }
});

// UPDATE one
router.patch("/:targetEssentialId", async (request, response, next) => {
  try {
      const packessent = await updateOneEssentialById(request.params.targetEssentialId, request.body);
      response.status(200).json({ message: "Packing Essential updated successfully!", packessent });
  } catch (error) { next (error); }
});

// DELETE one
router.delete("/:targetEssentialId", async(request, response, next) => {
  try {
      const packessent = await deleteOneEssentialById(request.params.targetEssentialId);
      response.status(200).json({ message: "Packing Essential deleted successfully!", packessent });
  } catch (error) { next (error); }
});

export default router;