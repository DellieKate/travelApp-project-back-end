import express from "express";
const router = express.Router();

/* USER ROUTER ENDPOINTS:
POST login
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

router.patch("/one", async (request, response) => {

    response.json({
        message: "Empty!"
    });
});

router.delete("/one", async (request, response) => {

    response.json({
        message: "Deleted!"
    });
});

export default router;