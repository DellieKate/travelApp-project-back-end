import { CityWishListModel } from "../../database/entities/CityWishList.js";

// Get all CityWishLists
async function getAllCityWishLists() {
  let getAllResult = await CityWishListModel.find();
  return getAllResult;
};

// Get one CityWishList
async function getOneCityWishListByID(targetCityWishListId) {
    let getOneResult = await CityWishListModel.findById(targetCityWishListId);
    return getOneResult;
}

// Create CityWishList
async function createCityWishList(targetCityWishList) {
  let createResult = await CityWishListModel.create(targetCityWishList);
  return createResult;
};

// Update CityWishList
async function updateOneCityWishList(targetCityWishListId, newData) {
  let updateResult = await CityWishListModel.findByIdAndUpdate(targetCityWishListId, newData, { new: true});
  return updateResult;
};

// Delete CityWishList
async function deleteOneCityWishListByID(targetCityWishListId) {
  let deleteResult = await CityWishListModel.findByIdAndDelete(targetCityWishListId);
  return deleteResult;
};

export {
  getAllCityWishLists,
  getOneCityWishListByID,
  createCityWishList,
  updateOneCityWishList,
  deleteOneCityWishListByID
};