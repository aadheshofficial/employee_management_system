import mongoose from "mongoose";

const connectionToDatabase = async () => {
    // const uri = "mongodb+srv://aadheshofficial:44pQIaK9H2aZiXGL@employeemanagementsyste.eolrt.mongodb.net/?retryWrites=true&w=majority&appName=employeeManagementSystem"
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        // await mongoose.connect(uri)
        console.log("connected to db")
        
    } catch (error) {
        console.error(error)
    }
}

export default connectionToDatabase