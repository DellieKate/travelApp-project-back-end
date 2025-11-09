import express from "express";
import {
  createCountry,
  getCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById
} from "./CountryFunctions.js";

const router = express.Router();

router.post("/", createCountry);
router.get("/", getCountries);
router.get("/:id", getCountryById);
router.patch("/:id", updateCountryById);
router.delete("/:id", deleteCountryById);

export default router;
