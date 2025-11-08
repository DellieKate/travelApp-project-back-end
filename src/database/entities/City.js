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

// Auto-populate
function autoPopulateCity (next) {
  this.populate(
    { path: "country", select: "name visaReq currency language -_id", 
        populate: { path: "vaxReq", select: "vaxReq -_id" }})
    .populate({ path: "activities", select: "name description -_id"})
    .populate({ path: "packingEssentials", select: "season items -_id" });
  next();
};

CitySchema.pre(/^find/, autoPopulateCity);

const CityModel = mongoose.model("City", CitySchema);

export { CitySchema, CityModel }