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
router.get("/", async (request, response) => {
    let result = await getAllWishLists();

    response.json({
        result: result
    });
});

// GET one
router.get("/:targetWishListId", async (request, response) => {
    let result = await getOneWishListById(request.params.targetWishListId);

    response.json({
        result: result
    });
});

// CREATE one
router.post("/", async (request, response) => {
    let result = await createWishList(request.body);

    response.json({
        result: result
    });
});

// UPDATE one
router.patch("/:targetWishListId", async (request, response) => {
    let result = await updateWishList(request.params.targetWishListId, request.body);

    response.json({
        result: result
    });
});

// DELETE one
router.delete("/:targetWishListId", async (request, response) => {
    let result = await deleteWishListByID(request.params.targetWishListId);

    response.json({
        result: result
    });
});

export default router;