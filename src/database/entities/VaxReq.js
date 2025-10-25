import mongoose from "mongoose";

const VaxReqSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true, 
        unique: true
    },
    vaxReq: [{
        type: String,
    }],
    // Foreign key relation
    //country: {
     //   type: mongoose.Types.ObjectId,
     //   ref: "Country"
    //}

});

//const VaxReqModel = mongoose.model("VaxReq", VaxReqSchema);

export {
    VaxReqSchema, 
    //VaxReqModel
}