import mongoose from "mongoose";
import { VaxReqSchema } from "./VaxReq.js";


const CountrySchema = new mongoose.Schema({
        id: {
            type: String,
            required: true, 
            unique: true
        },
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
        vax_req: {
            type: [VaxReqSchema],
            required: true
        }
    });

const CountryModel = mongoose.model("Country", CountrySchema);

export {
    CountrySchema, CountryModel
}