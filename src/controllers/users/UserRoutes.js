import express from "express";
import { 
  registerUser, 
  loginUser,
  getAllUsers, 
  getOneUserById,
  updateOneUserById, 
  deleteOneUserById
} from "./UserFunctions.js";

const router = express.Router();

// POST /users/register
router.post("/register", async (request, response, next) => {
  try {
    const newUser = await registerUser(request.body);
    response.status(201).json({
      message: "Congratulations! You are now registered!",
      user: newUser
    });
  } catch (error) {
    next(error);
  }
});

// POST /users/login
router.post("/login", async (request, response, next) => {
  console.log("testing 123");

  try {
    const { user, token } = await loginUser(request.body);
    response.status(200).json({
      message: "Congratulations! You are now logged in!",
      user,
      token
    });
  } catch (error) {
    next(error);
  }
});

// GET /users/all
router.get("/", async (request, response, next) => {
  try {
    const users = await getAllUsers();
    response.status(200).json({
      message: "Users retrieved successfully!",
      users
    });
  } catch (error) {
    next(error);
  }
});

// GET /users/:userId
router.get("/:userId", async (request, response, next) => {
  try {
    const user = await getOneUserById(request.params.userId);
    response.status(200).json({
      message: "User retrieved successfully!",
      user
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /users/:userId
router.patch("/:userId", async (request, response, next) => {
  try {
    const updatedUser = await updateOneUserById(request.params.userId, request.body);
    response.status(200).json({
      message: "User updated successfully!",
      updatedUser
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:userId
router.delete("/:userId", async (request, response, next) => {
  try {
    const deletedUser = await deleteOneUserById(request.params.userId);
    response.status(200).json({
      message: "User deleted successfully!",
      deletedUser
    });
  } catch (error) {
    next(error);
  }
});

export default router;
