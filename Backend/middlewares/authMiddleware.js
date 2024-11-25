const jwt=require("jsonwebtoken")
const env=require("dotenv")
const User=require("../models/userModel")
env.config()
const protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") )
    {
        try{
            
            token=req.headers.authorization.split(" ")[1];
            
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.id).select("-password")
            next()
        }
        catch(err)
        {
            res.status(401).json({"message":"invalid token"})
           
        }
    }
    else{
            res.status(401).json({"message":"invalid token"})
          
    }
}
module.exports=protect