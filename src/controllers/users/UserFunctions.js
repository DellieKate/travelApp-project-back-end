import { UserModel } from "../../database/entities/User.js";
import { generateJwt } from "../../utils/jwtUtils.js";


// Register User
async function registerUser (user) {
  // Checking for existing email
  if (await UserModel.findOne ({ email: user.email })) {
    const error = new Error("Email already in use. Try another one.");
    error.status = 409;
    throw error;
    }

  // Checking for existing username
  if (await UserModel.findOne ({ username: user.username })) {
    const error = new Error("Username already in use. Try another one.");
    error.status = 409;
    throw error;
    }

  //Create new user
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
};

// Login a user 
async function loginUser ({email, password }) {
  // Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email!");
    error.status = 401;
    throw error;
  };

  // Compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = new Error("Invalid password!");
    error.status = 401;
    throw error;
  };

  // Generate JWT
  const token = generateJwt({ id: user._id });

  // Return user data with token
  return {user, token };
};

// Get all users 
async function getAllUsers() {
  return await UserModel.find();
};

// Get one user by ID
async function getOneUserById(userId) {
  const user = await UserModel.findById(userId);
  if (!user) {
    const error = new Error ("User not found.");
    error.status = 404;
    throw error;
  }
  return user;
};

// Update one user
async function updateOneUserById(userId, newData) {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, {new: true});
  if (!updatedUser) {
    const error = new Error ("User not found.");
    error.status = 404;
    throw error;
  }
  return updatedUser;
};

// Delete one user
async function deleteOneUserById(userId) {
  const deletedUser = await UserModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    const error = new Error ("User not found.");
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