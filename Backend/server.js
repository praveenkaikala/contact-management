const express=require("express")
const { connectDatabase } = require("./utils/connectDb")
const app=express()
const cors=require('cors')
app.use(cors())
const userRoutes=require("./routes/userRoutes")
const contactRoutes=require("./routes/contactRoutes")
app.use(express.json())
connectDatabase()
app.use('/api/v1/user',userRoutes)
app.use('/api/v1',contactRoutes)
app.listen(5000,()=>{
    console.log("app is running")
})