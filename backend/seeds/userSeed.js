import User from "../models/User.js"
import bcrypt from 'bcrypt'
import connectionToDatabase from "../db/db.js"

const userRegister = async () => {
    connectionToDatabase()
    try{
        const hashedPassword = await bcrypt.hash("admin123",5)
        const newUser = new User({
            name:"Admin",
            email:"admin@ems.com",
            password : hashedPassword,
            role : "admin",

        })
        await newUser.save()
    } catch(error){
        console.error(error)
    }
}

userRegister();