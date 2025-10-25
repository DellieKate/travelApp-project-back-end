import { UserModel } from "../../database/entities/User.js";


// Register user
async function registerUser (username, email, citizenship, password) {

}

// Login a user (make a JWT for the user)
async function loginUser (targetUser) {

}

// Get all users from DB
async function getAllUsers(){

}

// Get one user by ID
async function getOneUserByID(targetUserId) {

}
// Update one user
async function updateOneUser(targetUserId, newData) {
    let updateResult = await UserModel.findByIdAndUpdate(targetUserId, newData, {new: true});
    return updateResult;
}

// Delete one user
async function deleteOneUserbyID(targetUserId){

}


export { 
    registerUser, loginUser,
    getAllUsers, getOneUserByID,
    updateOneUser, deleteOneUserbyID
}