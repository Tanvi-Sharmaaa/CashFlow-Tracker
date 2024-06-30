import mongoose from "mongoose";
import 'dotenv/config.js'

const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`\n MONGODB connected`);
    } catch(err){
        console.log("MONGODB connection error",err);
    }
}

export default connectDB