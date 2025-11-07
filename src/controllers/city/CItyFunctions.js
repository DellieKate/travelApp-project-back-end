import { CityModel } from "../../database/entities/City.js";

// Get all cities
async function getAllCities() {
    let getAllResult = await CityModel.find();
    return getAllResult;
}

// Get one city
async function getOneCityByID(targetCityId) {
    let getOneResult = await CityModel.findById(targetCityId);
    return getOneResult;
}

// Create city
async function createCity(targetCity) {
    let createResult = await CityModel.create(targetCity);
    return createResult;
}

// Update one city
async function updateOneCity(targetCityId, newData) {
    let updateResult = await CityModel.findByIdAndUpdate(targetCityId, newData, { new: true });
    return updateResult;
}

// Delete one city
async function deleteOneCityByID(targetCityId) {
    let deleteResult = await CityModel.findByIdAndDelete(targetCityId);
    return deleteResult;
}

export {
    getAllCities, 
    getOneCityByID, 
    createCity, 
    updateOneCity, 
    deleteOneCityByID
};