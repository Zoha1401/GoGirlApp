const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");
const User = require("../models/User");
const Connect = require("../models/Connect");
const Request = require("../models/Requests");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "zohasurti2004";
var fetchuser=require('../middleware/fetchuser')
const Mentee=require("../models/Mentee");


         
//Fetch all connection requests

router.get("/fetchRequests", fetchuser, async (req, res) => {
  try {
    const mentorId=req.user.id
      const requests = await Request.find({mentorId:mentorId}).exec();
      const menteeIds = requests.reduce((acc, request) => acc.concat(request.mentees_requested), []);
      const mentees = await User.find({ _id: { $in: menteeIds } }).exec();
      console.log(mentees)
      res.status(200).json(mentees);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});


//Accept a mentee's request

router.post("/acceptRequests/:menteeId", fetchuser, async (req, res) => {
  try {
    // Find and update the Connect document
    const mentorId = req.user.id;
    const menteeId = req.params.menteeId;

    const query = { mentorId };
    const update = { $pull: { mentees_requested: menteeId } };
    const options = { new: true }; // Return the updated document
    const updatedRequest = await Request.findOneAndUpdate(query, update, options);

    // Check if Connect document exists
    if (!updatedRequest) {
      return res.status(404).json({ error: "Connect document not found" });
    }

    // Update the Mentor document
    const mentor = await Mentor.findOne({mentorId: mentorId});
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    
    mentor.mentees.push(menteeId);
    await mentor.save();

    

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//Get all mentors

router.get("/getallmentors", fetchuser, async (req, res) => {
  try {
    const mentors = await Mentor.find({ mentorId: { $ne: req.user.id } });
    if (mentors.length === 0) {
      // Return a 404 status code if no communities are found
      return res.status(404).send("No mentors found");
    }

    // Return a 200 status code along with the communities
    res.status(200).json(mentors);
  } catch (err) {
    // Handle database errors or other unexpected errors
    console.error("Error fetching mentors:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/savementor", fetchuser, async(req,res)=>{

  try{
  let success=false
  console.log(req.body)
  const userId=req.user.id;
  
  let mentorexists = await Mentor.findOne({ mentorId: userId});
  if (mentorexists) {
      return res.status(409).json({ success, error: "Mentor already registered" });
  }

  let connectexists = await Request.findOne({ mentorId: userId});
  if (connectexists) {
      return res.status(409).json({ success, error: "Mentor already exists in connect" });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  let user = await User.findById(userId)
  
  
  user.mentorship=1
  await user.save();
  let mentor = await Mentor.create({
    mentorId: req.user.id,
    skill: req.body.skill,
    mentorName:user.name
});

// Create mentor in Connect
let request = await Request.create({
    mentorId: req.user.id,
    mentorName:user.name
});


  await mentor.save()
  await request.save()

  return res.status(200).send("Mentor saved successfully")
  }
  catch(err)
  {
    return res.status(500).send(err.message)
  }
})



//fetch your mentees

router.get("/fetchmentees", fetchuser, async (req, res) => {
  try {
    const mentorId = req.user.id;

    // Find the mentor document by mentorId
    const mentor = await Mentor.findOne({ mentorId: mentorId }).exec();

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Ensure mentees is an array
    const menteeIds = mentor.mentees || [];

    // Fetch user details for each menteeId
    const mentees = await User.find({ _id: { $in: menteeIds } }).exec();
    
    return res.status(200).json(mentees);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});



module.exports=router;