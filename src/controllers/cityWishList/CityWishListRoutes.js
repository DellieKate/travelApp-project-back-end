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
router.get("/", async (request, response, next) => {
    try {
        const citywshl = await getAllCityWishLists();
        response.status(200).json({ message: "City WishLists retrieved successfully!", citywshl })
    } catch (error) { next (error); }
});

// GET one
router.get("/:targetCityWishListId", async (request, response, next) => {
    try {
        const citywshl = await getOneCityWishListByID(request.params.targetCityWishListId);
        response.status(200).json({ message: "City WishList retrieved successfully!", citywshl });
    } catch (error) { next (error); }
});

// CREATE one
router.post("/", async (request, response, next) => {
    try {
        const citywshl = await createCityWishList(request.body);
        response.status(201).json({ message: "City WishList created successfully!", citywshl });
    } catch (error) { next (error); }
});

// UPDATE one
router.patch("/:targetCityWishListId", async (request, response, next) => {
    try {
        const citywshl = await updateOneCityWishList(request.params.targetCityWishListId, request.body);
        response.status(200).json({ message: "City WishList updated successfully!", citywshl });
    } catch (error) { next (error); }
});

// DELETE one
router.delete("/:targetCityWishListId", async(request, response, next) => {
    try {
        const citywshl = await deleteOneCityWishListByID(request.params.targetCityWishListId);
        response.status(200).json({ message: "City WishList deleted successfully!", citywshl });
    } catch (error) { next (error); }
});

export default router;