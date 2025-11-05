import express from "express";
import {
    getAllCities, 
    getOneCityByID, 
    createCity, 
    updateOneCity, 
    deleteOneCityByID
} from "./CItyFunctions.js";

const router = express.Router();

/* City ROUTER ENDPOINTS:
GET/READ all
GET/READ one
CREATE one
UPDATE one
DELETE one
*/

// GET all
router.get("/", async (request, response) => {
    let result = await getAllCities();

    response.json({
        result: result
    });
});

// GET one
router.get("/:targetCityId", async (request, response) => {
    let result = await getOneCityByID(request.params.targetCityId);

    response.json({
        result: result
    });
});

// CREATE one
router.post("/", async (request, response) => {
    let result = await createCity(request.body);

    response.json({
        result: result
    });
});

// UPDATE one
router.patch("/:targetCityId", async (request, response) => {
    let result = await updateOneCity(request.params.targetCityId, request.body);

    response.json({
        result: result
    });
});

// DELETE one
router.delete("/:targetCityId", async (request, response) => {
    let result = await deleteOneCityByID(request.params.targetCityId);

    response.json({
        result: result
    });
});

export default router;