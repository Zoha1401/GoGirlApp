const User=require("../models/User")
const router=require("express").Router()
const bcrypt=require("bcrypt")
var fetchuser=require('../middleware/fetchuser')
//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json({ error: "Error hashing password" });
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json({ message: "Account has been updated" }); // Send JSON response
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(403).json({ error: "You can update only your account" });
    }
});

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Account has been deleted" }); // Send JSON response
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(403).json({ error: "You can delete only your account" });
    }
});

//get a user

router.get("/getUser/:userId", async(req,res)=>{
    try{
        const user=await User.findById(req.params.userId)
        const {password,updatedAt, ...other}=user._doc
        res.status(200).json(user)
    }
    catch(err){
        res.status(200).send(err)
    } 
})


router.get("/getUserbyauthtoken", fetchuser, async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        const {password,updatedAt, ...other}=user._doc
        res.status(200).json(user)
    }
    catch(err){
        res.status(200).send(err)
    } 
})

module.exports = router;


