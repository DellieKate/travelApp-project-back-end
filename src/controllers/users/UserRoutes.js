import express from "express";
import { 
  registerUser, 
  loginUser,
  getAllUsers, 
  getOneUserById,
  updateOneUserById, 
  deleteOneUserById, 
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
    const newUser = await registerUser( request.body);
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
router.get("/", async (request, response, next) => {
  try {
    const users = await getAllUsers();
    response.status(200).json({ message: "Users retrieved successfully!", users });
  } catch (error) { next (error); }
});


// Get one user
router.get("/:userId", async (request, response, next) => {
  try {
    const user = await getOneUserById(request.params.userId);
    response.status(200).json({ message: "User retrieved successfully!", user });
  } catch (error) { next (error); }
});


// Update one user
router.patch("/:userId", async (request, response, next) => {
  try {
    const updatedUser = await updateOneUserById(request.params.userId, request.body);
    response.status(200).json({ message: "User updated successfully!", updatedUser });
  } catch (error) { next (error); }
});


// Delete one user
router.delete("/:userId", async (request, response, next) => {
  try {
    const deletedUser = await deleteOneUserById(request.params.userId);
    response.status(200).json({ message: "User deleted successfully!", deletedUser });
  } catch (error) { next (error); }
});

export default router;