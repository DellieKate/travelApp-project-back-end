import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema({
    listName: [{
        type: String,
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }, 
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City"
    } 
});

const WishListModel = mongoose.model("WishList", WishListSchema);

export {
    WishListSchema, WishListModel
}