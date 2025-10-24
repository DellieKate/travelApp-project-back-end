import mongoose from "mongoose";

const ActivitiesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true, 
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City"
    }

})

const ActivitiesModel = mongoose.model("Activities", ActivitiesSchema);

export {
    ActivitiesSchema, ActivitiesModel
}