import { CountryModel } from "../../database/entities/Country.js";

// CREATE Country
export const createCountry = async (request, response) => {
  try {
    const country = new CountryModel(request.body);
    await country.save();
    response.status(201).json(country);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

// READ all Countries
export const getCountries = async (request, response) => {
  try {
    const countries = await CountryModel.find();
    response.json(countries);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// READ one Country
export const getCountryById = async (request, response) => {
  try {
    const country = await CountryModel.findById(request.params.id);
    if (!country) return response.status(404).json({ message: "Country not found" });
    response.json(country);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// UPDATE Country
export const updateCountryById = async (request, response) => {
  try {
    const country = await CountryModel.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!country) return response.status(404).json({ message: "Country not found" });
    response.json(country);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

// DELETE Country
export const deleteCountryById = async (request, response) => {
  try {
    const country = await CountryModel.findByIdAndDelete(request.params.id);
    if (!country) return response.status(404).json({ message: "Country not found" });
    response.json({ message: "Country deleted successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
