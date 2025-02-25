import mongoose from "mongoose";

const connectionToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to db")
        
    } catch (error) {
        console.error(error)
    }
}

export default connectionToDatabase