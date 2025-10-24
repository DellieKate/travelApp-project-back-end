import mongoose from "mongoose";

const CityWishListSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true, 
        unique: true
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City"
    },
    wishlist: {
        type: mongoose.Types.ObjectId,
        ref: "WishList"
    }

})

const CityWishListModel = mongoose.model("CityWishList", CityWishListSchema);

export {
    CityWishListSchema, CityWishListModel
}