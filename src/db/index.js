import mongoose from "mongoose";

export const connectDB =async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://ayush123:ayush123@cluster0.6ayflkm.mongodb.net/`)
        console.log("mongoDB is connected ");
        
    } catch (error) {
        console.log("error:",error);
        process.exit(1)
    }
}