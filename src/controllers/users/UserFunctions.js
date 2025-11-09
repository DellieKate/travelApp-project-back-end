
import { UserModel } from "../../database/entities/User.js";
import { generateJwt } from "../../utils/jwtUtils.js";

// Register a new user
async function registerUser(userData) {
  // Check if email already exists
  if (await UserModel.findOne({ email: userData.email })) {
    const error = new Error("Email already in use. Try another one.");
    error.status = 409;
    throw error;
  }

  // Check if username already exists
  if (await UserModel.findOne({ username: userData.username })) {
    const error = new Error("Username already in use. Try another one.");
    error.status = 409;
    throw error;
  }

  // Create new user
  const newUser = new UserModel(userData);
  await newUser.save();
  return newUser;
};

// Login a user
async function loginUser({ email, password }) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email!");
    error.status = 401;
    throw error;
  };

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = new Error("Invalid password!");
    error.status = 401;
    throw error;
  };

  const token = generateJwt(user);
  return { user, token };
}

// Get all users
async function getAllUsers() {
  return await UserModel.find();
};

// Get a single user by ID
async function getOneUserById(userId) {
  const user = await UserModel.findById(userId);
  if (!user) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }
  return user;
};

// Update a user by ID
async function updateOneUserById(userId, newData) {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, { new: true });
  if (!updatedUser) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }
  return updatedUser;
};

// Delete a user by ID
async function deleteOneUserById(userId) {
  const deletedUser = await UserModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }
  return deletedUser;
};

export {
  registerUser,
  loginUser,
  getAllUsers,
  getOneUserById,
  updateOneUserById,
  deleteOneUserById
};
