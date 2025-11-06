import express from "express";
import {
    getAllEssentials,
    getOneEssentialByID,
    createEssential,
    updateOneEssential,
    deleteOneEssentialByID
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
router.get("/", async (request, response) => {
    let result = await getAllEssentials();
    
    response.json({ 
        result: result
    });
});

// GET one
router.get("/:targetEssentialId", async (request, response) => {
    let result = await getOneEssentialByID(request.params.targetEssentialId);
    
    response.json({ 
        result: result
    });
});

// CREATE one
router.post("/", async (request, response) => {
    let result = await createEssential(request.body);
    
    response.json({ 
        result: result
    });
});

// UPDATE one
router.patch("/:targetEssentialId", async (request, response) => {
    let result = await updateOneEssential(request.params.targetEssentialId, request.body);

    response.json({ 
        result: result
    });
});

// DELETE one
router.delete("/:targetEssentialId", async(request, response) => {
    let result = await deleteOneEssentialByID(request.params.targetEssentialId);
    
    response.json({ 
        result: result
    });
});

export default router;