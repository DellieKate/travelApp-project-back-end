import mongoose from "mongoose";

const PackingEssentialsSchema = new mongoose.Schema({
    items: [{
        type: String,
    }],
    // Foreign key relation
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