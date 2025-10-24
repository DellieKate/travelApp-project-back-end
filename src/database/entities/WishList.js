import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true, 
        unique: true
    },
    listName: [{
        type: String,
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    } 

})

const WishListModel = mongoose.model("WishList", WishListSchema);

export {
    WishListSchema, WishListModel
};