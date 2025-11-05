import { WishListModel } from "../../database/entities/WishList.js";

// Get all WishLists
async function getAllWishLists() {
    let getAllResult = await WishListModel.find();
    return getAllResult;
}

// Get one WishList
async function getOneWishListById(targetWishListId) {
    let getOneResult = await WishListModel.findById(targetWishListId);
    return getOneResult;
}

// Create WishList
async function createWishList(targetWishList) {
    let createResult = await WishListModel.create(targetWishList);
    return createResult;
}

// Update WishList
async function updateWishList(targetWishListId, newData) {
    let updateResult = await WishListModel.findByIdAndUpdate(targetWishListId, newData, { new: true});
    return updateResult;
}

// Delete essential
async function deleteWishListByID(targetWishListId) {
    let deleteResult = await WishListModel.findByIdAndDelete(targetWishListId);
    return deleteResult;
}

export {
    getAllWishLists,
    getOneWishListById,
    createWishList,
    updateWishList,
    deleteWishListByID
}