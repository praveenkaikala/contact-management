const User=require("../models/userModel")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const  genarateToken = require("../utils/genarateToken")
require("dotenv").config()
const Register=async (req,res)=>{
    try{
    const {name,email,password}=req.body
    if(!name || !email || !password)
        {
            return res.status(401).json({
                message:"invalid data",
                success:"false"
            })
        }
    const data = await User.findOne({email})
    if(data)
        {
            return res.status(401).json({
                message:"email already exists",
                success:"false" 
        })
    }
    await User.create({name,email,password})
    return res.status(201).json({
        message:"user registered successfully",
        success:"true" 
})

    }
catch(err)
{
    console.log(err)
}
}
const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password)
            {
                return res.status(401).json({
                    message:"invalid data",
                    success:"false"
                })
            }
        const user=await User.findOne({email})
        if(!user)
            {
                return res.status(404).json({
                    message:"user does not exist",
                    success:"false"
                })
            }
        const ismatch=await bcryptjs.compare(password,user.password)
        if(!ismatch)
            {
                return res.status(401).json({
                    message:"invalid email or password",
                    success:"false"
                })
            }

            return res.json({
                userId:user._id,
                token:genarateToken(user)
            })


    } catch (error) {
        console.log(error)
    }
}
module.exports={Register,Login}