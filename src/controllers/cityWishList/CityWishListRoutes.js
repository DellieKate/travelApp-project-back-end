import express from "express";
import {
    getAllCityWishLists,
    getOneCityWishListByID,
    createCityWishList,
    updateOneCityWishList,
    deleteOneCityWishListByID
} from "./CityWishListFunctions.js";

const router = express.Router();

/* CITY WISH LIST ROUTER ENDPOINTS:
GET all
GET one
CREATE one
UPDATE one
DELETE one
*/

// GET all
router.get("/", async (request, response) => {
    let result = await getAllCityWishLists();

    response.json({ 
        result: result
    });
});

// GET one
router.get("/:targetCityWishListId", async (request, response) => {
    let result = await getOneCityWishListByID(request.params.targetCityWishListId);

    response.json({
        result: result
    });
});

// CREATE one
router.post("/", async (request, response) => {
    let result = await createCityWishList(request.body);

    response.json({
        result: result
    });
});

// UPDATE one
router.patch("/:targetCityWishListId", async (request, response) => {
    let result = await updateOneCityWishList(request.params.targetCityWishListId, request.body);

    response.json({
        result: result
    });
});

// DELETE one
router.delete("/:targetCityWishListId", async(request, response) => {
    let result = await deleteOneCityWishListByID(request.params.targetCityWishListId);

    response.json({
        result: result
    });
});

export default router;