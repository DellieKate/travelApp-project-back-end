import express from "express";
import {
  getAllCities, 
  getOneCityByID, 
  createCity, 
  updateOneCity, 
  deleteOneCityByID
} from "./CityFunctions.js";

const router = express.Router();

/* City ROUTER ENDPOINTS:
GET/READ all
GET/READ one
CREATE one
UPDATE one
DELETE one
*/

// GET all
router.get("/", async (request, response, next) => {
  try {
      const cities = await getAllCities();
      response.status(200).json({ message: "Cities retrieved successfully!", cities });
  } catch (error) { next (error); }
});

// GET one
router.get("/:targetCityId", async (request, response, next) => {
  try {
      const city = await getOneCityByID(request.params.targetCityId);
      response.status(200).json({ message: "City retrieved successfully!", city });
  } catch (error) { next (error); }
});

// CREATE one
router.post("/", async (request, response, next) => {
  try {
      const city = await createCity(request.body);
      response.status(201).json({ message: "City created successfully!", city });
  } catch (error) { next (error); }
});

// UPDATE one
router.patch("/:targetCityId", async (request, response, next) => {
  try {
      const city = await updateOneCity(request.params.targetCityId, request.body);
      response.status(200).json({ message: "City updated successfully!", city });
  } catch (error) { next (error); }
});

// DELETE one
router.delete("/:targetCityId", async (request, response, next) => {
  try {
      const city = await deleteOneCityByID(request.params.targetCityId);
      response.status(200).json({ message: "City deleted successfully!", city });
  } catch (error) { next (error); }
});

export default router;