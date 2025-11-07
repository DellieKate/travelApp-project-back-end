import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bestMonths: String,
    bestWeather: String,
    
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true
    },

    activities: [{
        type: mongoose. Schema.Types.ObjectId,
        ref: "Activities"
    }],

    packingEssentials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PackingEssentials"
    }]
});

const CityModel = mongoose.model("City", CitySchema);

export { CitySchema, CityModel }