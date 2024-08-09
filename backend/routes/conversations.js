const express = require("express");
const router = express.Router()
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Mentor = require("../models/Mentor");
const Mentee=require("../models/Mentee");


//new conv using /api/conversation/
router.post("/:mentorId/:menteeId", async (req,res)=>{
    try{
    const mentorId=req.params.mentorId
    const menteeId=req.params.menteeId
    
    const mentor=await Mentor.findOne({mentorId:mentorId})
    if (!mentor) {
        return res.status(404).json({ error: "Mentor not found" });
    }
    const mentee=mentor.mentees.includes(menteeId)

    if(!mentee)
    {
        return res.status(500).json({error:"Not connected with mentor"})
    }
    const newConversation=new Conversation(
        {
            members:[mentorId, menteeId]
        }
    )

    
       const savedConversation=await newConversation.save()
       res.status(200).json(savedConversation)
}
    catch(err)
    {
        res.status(500).json(err)
    }
})

//get conv of user
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports=router;