import express from "express";
import { updateOneUser } from "./UserFunctions.js";
const router = express.Router();

/* USER ROUTER ENDPOINTS:
POST login
POST register
GET all
GET one
CREATE one
UPDATE one
DELETE one
*/

router.post("/login", async (request, response) => {

    response.json({
        message: "Congratulations! You are now logged in!"
    });
});

router.post("/register", async (request, response) => {

    response.json({
        message: "Congratulations! You are now registered!"
    });
});
router.get("/all", async (request, response) => {

    response.json({
        message: "Displayed all data!"
    });
});

router.get("/one", async (request, response) => {

    response.json({
        message: "Displayed one data!"
    });
});
router.post("/one", async (request, response) => {

    response.json({
        message: "Empty!"
    });
});

router.patch("/one/:targetUserID", async (request, response) => {
    let result = await updateOneUser(request.params.targetUserId, request.body);

    response.json({
        result: result
    });
});

router.delete("/one", async (request, response) => {

    response.json({
        message: "Deleted!"
    });
});

export default router;