import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true,
  },
  bestMonths: String,
  bestWeather: String,
  
  country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country"
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
    if (this.country) {
        console.log('pre-populating city!')
        this.populate(
            { path: "country", select: "name visaReq currency language -_id", 
                populate: { path: "vaxReq", select: "vaxReq -_id" }})
            .populate({ path: "activities", select: "name description -_id"})
            .populate({ path: "packingEssentials", select: "season items -_id" });
    } else {
        console.log('Skipping pre-population of city fields')
    }
};

CitySchema.pre(/^find/, autoPopulateCity);

const CityModel = mongoose.model("City", CitySchema);

export { CitySchema, CityModel };