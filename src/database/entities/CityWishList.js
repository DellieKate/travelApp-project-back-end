import mongoose from "mongoose";

const CityWishListSchema = new mongoose.Schema({
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
    CityWishListSchema, 
    CityWishListModel
}