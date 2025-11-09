import mongoose from "mongoose";

const PackingEssentialsSchema = new mongoose.Schema({
    season: {
        type: String,
        unique: true
    },
    items: [{
        type: String,
    }],
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City"
    }
});

const PackingEssentialsModel = mongoose.model("PackingEssentials", PackingEssentialsSchema);

export {
    PackingEssentialsSchema, 
    PackingEssentialsModel
}