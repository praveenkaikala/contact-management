const express=require("express")
const router=express.Router()
const {ListContacts,AddContacts,EditContacts,DeleteContacts}=require('../controllers/contactController')
const  protect  = require("../middlewares/authMiddleware")

router.get('/contacts',protect,ListContacts)
router.post('/contacts',protect,AddContacts)
router.put('/contacts/:id',protect,EditContacts)
router.delete('/contacts/:id',protect,DeleteContacts)
module.exports=router