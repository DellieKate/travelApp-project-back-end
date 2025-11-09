import { PackingEssentialsModel } from "../../database/entities/PackingEssentials.js";

// Get all essentials
async function getAllEssentials() {
  let getAllResult = await PackingEssentialsModel.find();
  return getAllResult;
};

// Get one essential
async function getOneEssentialById(targetEssentialId) {
  let getOneResult = await PackingEssentialsModel.findById(targetEssentialId);
  return getOneResult;
};

// Create essential
async function createEssential(targetEssential) {
  let createResult = await PackingEssentialsModel.create(targetEssential);
  return createResult;
};

// Update essential
async function updateOneEssentialById(targetEssentialId, newData) {
  let updateResult = await PackingEssentialsModel.findByIdAndUpdate(targetEssentialId, newData, { new: true });
  return updateResult;
};

// Delete essential
async function deleteOneEssentialById(targetEssentialId) {
  let deleteResult = await PackingEssentialsModel.findByIdAndDelete(targetEssentialId);
  return deleteResult;
};

export {
  getAllEssentials, 
  getOneEssentialById, 
  createEssential, 
  updateOneEssentialById, 
  deleteOneEssentialById
};