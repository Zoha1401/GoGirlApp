const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "zohasurti2004";
var fetchuser=require('../middleware/fetchuser')
const Community= require("../models/Community")
const Post=require("../models/Post")
const { Op } = require('sequelize');
const uploadOnSystem = require('../middleware/multer.middleware');
const uploadOnCloudinary=require("../utils/cloudinary")


router.post(
  "/createCommunity", fetchuser,
  async (req, res) => {
      const userId = req.user.id;
      let success = false;  
      try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          
          const user = await User.findById(userId);
          if (!user) {
              return res.status(404).json({ error: "Creator user not found" });
          }

          let community = await Community.create({
              communityName: req.body.communityName,
              desc: req.body.desc,
              creatorId: userId
          });
          
          community.numOfPeople += 1;
          // Push the creator's userId into the members array
          community.members.push(userId);
          await community.save();


          success = true;
          res.json({ success });
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error has occurred");
      }
  }
);


    router.post(
      "/joinCommunity/:communityId",  fetchuser,
    
      async (req, res) => {
    
        const userId=req.user.id
        const communityId = req.params.communityId;
        let success=false;
          try{
          const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body)
        
    
       
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ error: "community not found" });
        }
    
        if (community.members.includes(userId)) {
          throw new Error("User is already a member of this community");
      }
      console.log(userId)
      community.members.push(userId);
            
      // Increment the numOfPeople count
      community.numOfPeople += 1;
    
      // Save the updated community
      await community.save();     
    
            success=true;
            res.json({ success });
          }
    
            catch (error) {
              console.error(error.message);
              res.status(500).send("Internal server error has occured");
            }
      }
    
)

//Add community post.
router.post("/:communityId", fetchuser, async (req, res) => {
  try {
    const community = await Community.findOne({ _id: req.params.communityId });

    if (!community) {
      return res.status(404).send("Community not found");
    }

    if (!community.members.includes(req.user.id)) {
      return res.status(403).send("Join Community to post");
    }

    // const uploading = await uploadOnCloudinary.uploadcloud(req.file.path);
    // console.log(uploading.secure_url);

    let newPost = await Post.create({
    
      desc: req.body.desc,
      userId: req.user.id,
      communityId: req.params.communityId
    });

    community.numOfPosts += 1;
    await community.save();

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Get all community posts.

router.get("/getallposts/:communityId", async(req,res)=>{
  
    try{
      const community=await Community.findById({_id:req.params.communityId})
   
      if(!community)
      {
       return res.status(500).send("Community not found")
      }
      
      const posts = await Post.find({ communityId: req.params.communityId });
   
        // Return the posts
      return res.status(200).json(posts);


  }
  catch(err){
    res.status(500).json(err)
  }
})


//Get all joined communities
router.get("/joinedCommunities", fetchuser, async (req, res) => {

  const userId=req.user.id
  try {
    const communities = await Community.find({ members: userId});

    if (!communities || communities.length === 0) {
      return res.status(404).send("No communities joined yet");
    }

    res.status(200).json(communities);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all created communities
router.get("/getallcreated/:creatorId", async(req,res)=>{
  
  try{
    const community=await Community.find({creatorId:req.params.creatorId})
 
    if(!community)
    {
     res.status(500).send("Community not found")
    }

    res.status(200).send(community)
    

}
catch(err){
  res.status(500).json(err)
}
})

//Get all communities 
router.get("/getallcommunities", async (req, res) => {
  try {
    const communities = await Community.find();

    if (communities.length === 0) {
      // Return a 404 status code if no communities are found
      return res.status(404).send("No communities found");
    }

    // Return a 200 status code along with the communities
    res.status(200).json(communities);
  } catch (err) {
    // Handle database errors or other unexpected errors
    console.error("Error fetching communities:", err);
    res.status(500).send("Internal Server Error");
  }
});

//Get all communities that the user has not joined


router.get("/notJoinedCommunities", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find communities where the user is not a member
    const notJoinedCommunities = await Community.find({ members: { $nin: [userId] } });

    if (!notJoinedCommunities || notJoinedCommunities.length === 0) {
      return res.status(404).send("No communities found that the user has not joined yet");
    }

    res.status(200).json(notJoinedCommunities);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get a single community

router.get("/getCommunity/:communityId", async(req,res)=>{
  try{
      const community=await Community.findById(req.params.communityId)
      res.status(200).json(community)
  }
  catch(err){
      res.status.send(err)
  } 
})

router.get("/getCommunitymembers/:communityId", async(req,res)=>{
  try{
      const community=await Community.findById(req.params.communityId)
      console.log(community)
      const members= await community.members
      console.log(members)
      const details=[]
      for (const member of members){
        console.log(member)
        const some= await User.findById(member)
        console.log(some)
        details.push(some)
      }
     

      return res.status(200).json(details)
  }
  catch(err){
      res.status(400).send(err)
  } 
})




//Delete and update community posts as a creator



router.get("/joinedCommunitiesbyId/:userId", async (req, res) => {

  const userId=req.params.userId
  try {
    const communities = await Community.find({ members: userId});

    if (!communities || communities.length === 0) {
      return res.status(404).send("No communities joined yet");
    }

    res.status(200).json(communities);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router;