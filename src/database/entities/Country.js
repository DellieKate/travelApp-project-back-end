import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        visa_req: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        language: {
            type: String,
        },
        vaxReq: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VaxReq"
        }
    });

const CountryModel = mongoose.model("Country", CountrySchema);

export { CountrySchema, CountryModel }