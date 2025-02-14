import jwt from "jsonwebtoken";
import User from "../models/User.js"
import bcrypt from 'bcrypt'

const login = async (req,res) => { 
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if (!password) {
            return res.status(400).json({
                success: false,
                error: "Password is required"
            });
        }
        if(!user){
            return res.status(404).json({
                success:false,error:"user not found"
            })
        }
        if(user.password){
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(404).json({
                    success:false,error:"Incorrect password"
                })
            }
            const token = jwt.sign({_id: user._id, role:user.role},
                process.env.JWT,{expiresIn:"10d"}
            )
            return res.status(200)
            .json({
                success:true,
                token,
                user:{
                    _id:user._id,
                    name:user.name,
                    role:user.role
                }
            })
        }

    } catch (error) {
        // console.log(error) 
        res.status(500).json(
            {
                success:false,
                error:error.message
            })
    }
}

export {login}