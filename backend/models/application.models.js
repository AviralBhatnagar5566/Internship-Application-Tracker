import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    CompanyName:{
        type:String,
        required:true,
        trim: true
    },
    roleposition:{
        type:String,
        required:true,
        trim: true
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Applied","Interview","Selected","Rejected","Pending"],
        required:true
    },
    applicationlink:{
        type:String
    },
    notes:{
        type:String,
        trim: true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

},{timestamps:true})

export const Application = mongoose.model("application",applicationSchema)
