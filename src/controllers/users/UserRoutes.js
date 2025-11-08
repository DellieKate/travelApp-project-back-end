import express from "express";
import { 
  registerUser, 
  loginUser,
  getAllUsers, 
  getOneUserByID,
  updateOneUser, 
  deleteOneUserByID 
} from "./UserFunctions.js";

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


// Register
router.post("/register", async (request, response, next) => {
  try {
    const newUser = await registerUser( req.body);
    response.status(201).json({
        message: "Congratulations! You are now registered!"
    });
  } catch (error) { next (error); }
});


// Login
router.post("/login", async (request, response, next) => {
  try {
    const { user , token } = await loginUser(request.body);
    response.status(200).json({
        message: "Congratulations! You are now logged in!", user, token 
    });
  } catch (error) { next (error); }
});

// Get all users
router.get("/all", async (request, response, next) => {
  try {
    const users = await getAllUsers();
    response.status(200).json({ message: "Users retrieved successfully!", users });
  } catch (error) { next (error); }
});


// Get one user
router.get("/one/:userId", async (request, response, next) => {
  try {
    const user = await getOneUserByID(req.params.userId);
    response.status(200).json({ message: "User retrieved successfully!", user });
  } catch (error) { next (error); }
});


// Update one user
router.patch("/one/:userId", async (request, response, next) => {
  try {
    const updatedUser = await updateOneUser(req.params.userId, req.body);
    response.status(200).json({ message: "User updated successfully!", updatedUser });
  } catch (error) { next (error); }
});


// Delete one user
router.delete("/one/:userId", async (request, response, next) => {
  try {
    const deletedUser = await deleteOneUserByID(req.params.userId);
    response.status(200).json({ message: "User deleted successfully!", deletedUser });
  } catch (error) { next (error); }
});

export default router;