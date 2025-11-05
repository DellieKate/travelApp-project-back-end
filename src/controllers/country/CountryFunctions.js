import { CountryModel } from "../../database/entities/Country.js";

// CREATE Country
export const createCountry = async (req, res) => {
  try {
    const country = new CountryModel(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all Countries
export const getCountries = async (req, res) => {
  try {
    const countries = await CountryModel.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ one Country
export const getCountryById = async (req, res) => {
  try {
    const country = await CountryModel.findById(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Country
export const updateCountry = async (req, res) => {
  try {
    const country = await CountryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE Country
export const deleteCountry = async (req, res) => {
  try {
    const country = await CountryModel.findByIdAndDelete(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
