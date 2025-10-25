import mongoose from "mongoose";

const PackingEssentialsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true, 
        unique: true
    },
    items: [{
        type: String,
    }],
    // Foreign key relation
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City"
    }
});

//const PackingEssentialsModel = mongoose.model("PackingEssentials", PackingEssentialsSchema);

export {
    PackingEssentialsSchema, 
    // PackingEssentialsModel
}