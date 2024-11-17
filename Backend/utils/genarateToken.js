require('dotenv').config()
const jwt=require('jsonwebtoken')
const genarateToken=(user)=>{
    try {
        const tokenPayload = { id: user._id, email: user.email };
        const tokenSecret = process.env.JWT_SECRET;
        const tokenOptions = { expiresIn: '2d' };

        const token = jwt.sign(tokenPayload, tokenSecret, tokenOptions);
        console.log(token)
        return token;
    } catch (error) {
        console.log(error)
    }
}

module.exports=genarateToken    