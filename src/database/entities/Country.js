import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        visaReq: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },

    });

const CountryModel = mongoose.model("Country", CountrySchema);

export { CountrySchema, CountryModel };