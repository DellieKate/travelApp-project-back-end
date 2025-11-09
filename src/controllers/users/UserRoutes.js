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

// POST /users/register
router.post("/register", async (req, res, next) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({
      message: "Congratulations! You are now registered!",
      user: newUser
    });
  } catch (error) {
    next(error);
  }
});

// POST /users/login
router.post("/login", async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({
      message: "Congratulations! You are now logged in!",
      user,
      token
    });
  } catch (error) {
    next(error);
  }
});

// GET /users/all
router.get("/all", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      message: "Users retrieved successfully!",
      users
    });
  } catch (error) {
    next(error);
  }
});

// GET /users/one/:userId
router.get("/one/:userId", async (req, res, next) => {
  try {
    const user = await getOneUserByID(req.params.userId);
    res.status(200).json({
      message: "User retrieved successfully!",
      user
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /users/one/:userId
router.patch("/one/:userId", async (req, res, next) => {
  try {
    const updatedUser = await updateOneUser(req.params.userId, req.body);
    res.status(200).json({
      message: "User updated successfully!",
      updatedUser
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /users/one/:userId
router.delete("/one/:userId", async (req, res, next) => {
  try {
    const deletedUser = await deleteOneUserByID(req.params.userId);
    res.status(200).json({
      message: "User deleted successfully!",
      deletedUser
    });
  } catch (error) {
    next(error);
  }
});

export default router;
