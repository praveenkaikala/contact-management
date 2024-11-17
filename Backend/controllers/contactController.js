const Contact=require("../models/contactModal")
const jwt=require("jsonwebtoken")
const  genarateToken = require("../utils/genarateToken")
const { compare } = require("bcryptjs")
require("dotenv").config()

const ListContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find({userId:req.user.id})
        if(contacts)
        {

            return res.status(200).json(contacts)
        }
        return res.status(404).json({"message":'no data found'})
    } catch (error) {
        
        console.log(error)
        return  res.status(400)
    }
}
const AddContacts=async(req,res)=>{
    try {
        const {firstName,lastName,email,phone,jobTitle,company}=req.body;
        const contacts=await Contact.create({
            userId:req.user.id,
            firstName,
            lastName,email,company,phone,jobTitle
        })
        return res.status(201).json({"message":"contact created"})
    } catch (error) {
        
        console.log(error)
        return  res.status(400)
    }
}
const EditContacts=async(req,res)=>{
    try {
        const {id}=req.params
        const {firstName,lastName,email,phone,jobTitle,company}=req.body;
        const contacts=await Contact.updateOne({
           _id:id
        },{
            firstName,lastName,email,phone,jobTitle,company
        })
        return res.status(200).json({"message":"updated"})
    } catch (error) {
        
        console.log(error)
        return  res.status(400)
    }
}
const DeleteContacts=async(req,res)=>{
    try {
        const {id}=req.params
        const {firstName,lastName,email,phone,jobTitle,company}=req.body;
        const contacts=await Contact.deleteOne({
           _id:id
        })
        return res.status(200).json({"message":"deleted"})
    } catch (error) {
        
        console.log(error)
        return  res.status(400)
    }
}


module.exports={ListContacts,AddContacts,EditContacts,DeleteContacts}