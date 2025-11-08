import express from "express";
import {
    getAllWishLists,
    getOneWishListById,
    createWishList,
    updateWishList,
    deleteWishListByID
} from "./WishListFunctions.js";

const router = express.Router();

/* wishList ROUTER ENDPOINTS:
GET/READ all
GET/READ one
CREATE one
UPDATE one
DELETE one
*/

// GET all
router.get("/", async (request, response, next) => {
    try {
        const wishlist = await getAllWishLists();
        response.status(200).json({ message: "WishLists retrieved successfully!", wishlist });
    } catch (error) { next (error); }
});

// GET one
router.get("/:targetWishListId", async (request, response, next) => {
    try {
        const wishlist = await getOneWishListById(request.params.targetWishListId);
        response.status(200).json({ message: "WishList retrieved successfully!", wishlist });
    } catch (error) { next (error); }
});

// CREATE one
router.post("/", async (request, response, next) => {
    try {
        const wishlist = await createWishList(request.body);
        response.status(201).json({ message: "WishList created successfully!", wishlist });
    } catch (error) { next (error); }
});

// UPDATE one
router.patch("/:targetWishListId", async (request, response, next) => {
    try {
        const wishlist = await updateWishList(request.params.targetWishListId, request.body);
        response.status(200).json({ message: "WishList updated successfully!", wishlist });
    } catch (error) { next (error); }
});

// DELETE one
router.delete("/:targetWishListId", async (request, response, next) => {
    try {
        const wishlist = await deleteWishListByID(request.params.targetWishListId);
        response.status(200).json({ message: "WishLists deleted successfully!", wishlist });
    } catch (error) { next (error); }
});

export default router;