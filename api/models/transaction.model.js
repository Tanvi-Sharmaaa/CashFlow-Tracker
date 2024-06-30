import mongoose,{ Schema } from "mongoose";

const transactionSchema= new Schema({
    price:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    datetime:{
        type:Date,
        required:true
    }
},{timestamps:true})

export const transactionModel = mongoose.model("Transaction",transactionSchema)