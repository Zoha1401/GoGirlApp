const Post = require("../models/Post")
const router = require("./conversations")
const User = require("../models/User")
const Community = require("../models/Community")
var fetchuser=require('../middleware/fetchuser')



//Get user's all posts

router.get("/profile/getpost/", fetchuser, async (req, res) => {
  console.log("1")
  console.log(23)
  try {
    console.log(req.user.id)
      const user = await User.findOne({ _id: req.user.id });

      if (!user) {
          // Send a 404 response if the user does not exist
          return res.status(404).send("User does not exist");
      }

      const posts = await Post.find({ userId: user._id });

      // if (!posts || posts.length === 0) {
      //     // Send a 404 response if the user has no posts
      //     return res.status(404).send("User does not have any posts");
      // }

      // Send the posts associated with the user
      res.status(200).json(posts);
  } catch (err) {
      // Handle any errors that occur
      console.error("Error fetching user posts:", err);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


//Add comment
router.post("/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const comment = req.body.comment;

        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        post.comments.push(comment);
        await post.save();

        res.status(200).json({ success: "Comment added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error has occurred" });
    }
});

//Delete and Update posts both in community side

//Left for thunder client
//update your post
// router.put("/:id", async(req,res)=>{
//     try{
//       const post= await Post.findById(req.params.id);
//       if(post.userId===req.body.userId){
//           await post.updateOne({$set:req.body})
//           res.status(200).json("The post has been updated")
//       }
//       else{
//         res.status(403).json("You can update only your post")
//       }
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })


//Delete post
// router.delete("/:id", async(req,res)=>{
//     try{
//       const post= await Post.findById(req.params.id);
//       if(post.userId===req.body.userId){
//           await post.deleteOne()
//           res.status(200).json("The post has been deleted")
//       }
//       else{
//         res.status(403).json("You can delete only your post")
//       }
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })

//like or unlike any post
router.put("/:id/like", fetchuser, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.user.id)) {
        await post.updateOne({ $push: { likes: req.user.id } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.user.id } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Delete Post
router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    let success=false
    const postId = req.params.id;
    
    // Find the post by ID and delete it
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
   success=true
    return res.status(200).json({ message: "Post deleted successfully", success });
  } catch (err) {
    console.error("Error deleting post:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});





//Get all posts based on timeline

router.get("/timeline/getallposts", fetchuser,  async (req, res) => {
  console.log("1")
  try {
    const userId = req.user.id;

    // Get all communities that the user is a member of
    const userCommunities = await Community.find({ members: userId });

    // Set to store unique post IDs
    const uniquePostIds = new Set();

    // Iterate over each community
    for (const community of userCommunities) {
        // Fetch posts from the community
        console.log("1")
        console.log(community)
        const posts = await Post.find({ userId: { $in: community.members } });
        console.log(posts)
        // Iterate over fetched posts
        for (const post of posts) {
            // Add post IDs to the set
            uniquePostIds.add(post._id.toString());
        }
    }

    // Convert set back to array of unique post IDs
    const uniquePostIdsArray = Array.from(uniquePostIds);

    // Fetch unique posts based on their IDs
    const communityPosts = await Post.find({ _id: { $in: uniquePostIdsArray } });

    res.status(200).json(communityPosts);
} 
catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal server error" });
}

});

//Get user's post by id

router.get("/profile/getpost/:userId", async (req, res) => {
  console.log("1")
  console.log(23)
  try {
    
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
          // Send a 404 response if the user does not exist
          return res.status(404).send("User does not exist");
      }

      const posts = await Post.find({ userId: user._id });

      // if (!posts || posts.length === 0) {
      //     // Send a 404 response if the user has no posts
      //     return res.status(404).send("User does not have any posts");
      // }

      // Send the posts associated with the user
      res.status(200).json(posts);
  } catch (err) {
      // Handle any errors that occur
      console.error("Error fetching user posts:", err);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


// router.get("/getallposts/newuser", fetchuser,  async (req, res) => {
//   console.log("1")
//   try {

//      const communityPosts= Post.find()
   
//     res.status(200).json(communityPosts);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });


// Add comment

module.exports=router