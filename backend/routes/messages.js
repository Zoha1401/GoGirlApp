const express = require("express");
const Message = require("../models/Message");
const router = express.Router();
var fetchuser=require('../middleware/fetchuser')

//add
router.post("/addnewmessage/:conversationId", fetchuser, async(req,res)=>{
    
    success=false
    const newMessage= new Message(
        { text:req.body.text,
          conversationId:req.params.conversationId,
          sender:req.user.id
})

    try{
         const savedMessage=await newMessage.save()
         success=true
         return res.status(200).json({success, savedMessage})
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})


//get

router.get("/:conversationId",  async(req,res)=>{
    try{
       const messages = await Message.find({
       })
       return res.status(200).json(messages)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports=router