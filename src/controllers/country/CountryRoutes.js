import express from "express";
import {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry
} from "./CountryFunctions.js";

const router = express.Router();

router.post("/", createCountry);
router.get("/", getCountries);
router.get("/:id", getCountryById);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);

export default router;
