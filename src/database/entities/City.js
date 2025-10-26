import mongoose from "mongoose";
import { PackingEssentialsSchema } from "./PackingEssentials.js";
import { ActivitiesSchema } from "./Activities.js";
import { CountrySchema } from "./Country.js";

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bestMonths: {
        type: String,
    },
    bestWeather: {
        type: String,
    },
    country: {
        type: [CountrySchema],
        required: true
    },
    activities: {
        type: [ActivitiesSchema],
        required: true
    },
    packingEssentials: {
        type: [PackingEssentialsSchema],
        required: true
    }
});

const CityModel = mongoose.model("City", CitySchema);

export {
    CitySchema, CityModel
}