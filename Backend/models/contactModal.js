const mongoose=require("mongoose")
const messageModel=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      company: {
        type: String,
        trim: true,
      },
      jobTitle: {
        type: String,
        trim: true,
      }
    
    
},
{
    timeStamp:true,
})
const Contact=mongoose.model('contact',messageModel)
module.exports=Contact