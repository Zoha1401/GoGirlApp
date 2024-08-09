const express = require("express");
const router = express.Router();
const Mentee = require("../models/Mentee");
const Mentor = require("../models/Mentor");
const Connect = require("../models/Connect");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "zohasurti2004";
var fetchuser=require('../middleware/fetchuser');
const User = require("../models/User");
const Request = require("../models/Requests");




// ROUTE:1 Create a mentor using: POST "/api/mentee/savementee". 
router.post(
  "/savementee", 
  fetchuser,
  async (req, res) => {
      try {
          let success = false;
          console.log(req.body);

          // Check if mentee is already registered
          let userId = await Mentee.findOne({ menteeId: req.user.id });
          if (userId) {
              return res.status(409).json({ success, error: "Mentee already registered" });
          }

          // If there are errors, return bad requests with the errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          let user = await User.findById(req.user.id)
         
  
          user.menteeship=1
          await user.save()
          
          // Create mentee
          let mentee = await Mentee.create({
              menteeId: req.user.id,
              skill:req.body.skill,
              menteeName:user.name
          });

          await mentee.save()

          success = true;
         return res.json({ success });
      } catch (error) {
          console.log(error.message);
          res.status(500).send("Internal server error has occurred");
      }
  }
);


//   router.get("/fetchallmentors", fetchmentor,fetchmentee, async (req, res) => {
//     try {
//       const mentors = await Mentor.findAll(req.mentee.id);
//       res.json(mentors);
//     } 
//     catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal server error has occured");
//     }
//   });

  


  router.post("/connectmentor/:mentorId", fetchuser, async (req, res) => {
    try {
        const mentorId = req.params.mentorId;
        const menteeId = req.user.id;
        console.log(mentorId)
        // Find the Connect document where the mentorId matches
        let request = await Request.findOne({ mentorId });
       
        if (!request) {
          request = new Request({ mentorId, mentees_requested: [] }); // Initialize members array
      }
      
      console.log(request)

    if (request.mentees_requested.includes(menteeId)) {
      return res.status(400).json({ error: "Mentee already requested mentor" });
  }
      console.log(menteeId)
        // Add the menteeId to the members array of the Connect document
        request.mentees_requested.push(menteeId);

        // Save the updated Connect document
        await request.save();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error has occurred");
    }
});


// get all mentees

router.get("/getallmentees",  async (req, res) => {
    try {
        const mentees=await Mentee.find()
        console.log(mentees)

        if (mentees.length === 0) {
           
            return res.status(404).send("No mentees found");
          }

        return res.status(200).json(mentees)
    }
    catch(err)
    {
        console.log(err.message)
    }
   
});


// get your mentors

router.get("/fetchyourmentors", fetchuser, async (req, res) => {
    try {
        // Fetch mentors where the members array contains the user's ID
        const mentors = await Mentor.find({ mentees: req.user.id });

        // Return the mentors
        return res.status(200).json(mentors);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal server error");
    }
});

router.get("/fetchothermentors", fetchuser, async (req, res) => {
    try {
        // Fetch mentors where the members array contains the user's ID
        const mentors = await Mentor.find({ mentorId: {$ne:req.user.id}, mentees: { $ne: req.user.id } });

        // Return the mentors
        return res.status(200).json(mentors);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal server error");
    }
});







  module.exports=router;