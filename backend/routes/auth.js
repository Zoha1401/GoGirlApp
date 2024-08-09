const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "zohasurti2004";
var fetchuser=require('../middleware/fetchuser')


// ROUTE:1 Create a user using: POST "/api/auth/createUser". Doesnt require auth
router.post(
    "/createUser",
  
    async (req, res) => {
      let success=false;
      console.log(req.body);
      console.log("1")
      //  const user=User(req.body);
      //  user.save()
  
      // If there are errors, return bad requests with the errors. Also unique email is now automatically handled my mongoose and express validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("2")
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        //Hashing password after adding salt for security
        console.log("3")
        const salt = await bcrypt.genSalt(10);
        console.log("4")
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Check whether the user with same email exists or not

        console.log("5")

        // const user1=User.findOne({email:req.body.email})
        // console.log(user1)
        // if(user1)
        // {
        //   console.log("6")
        //   return user1
        // }

        //Creating a new User
        console.log("7")
        let user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
          aadhar:req.body.aadhar
        });
        // .then(user=>res.json(user))
        //   .catch(err=> {console.log(err)})
        //  res.json({error:'Please a unique email'})});
        console.log("8")
        //JWT token generation
        const data = {
          user: {
            id: user.id,
          },
        };
        console.log("9")
        const authtoken = jwt.sign(data, JWT_SECRET);
        //jwtData is the signed id of the user
        // console.log(jwtData)
        console.log("10")
        success=true;
        //Token is generated and sent to the user.
       return res.json( {success, authtoken} );
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error has occured");
      }
    }
  );

//ROUTE:2 Login a user using: POST "/api/auth/login". Doesnt require auth
router.post("/login", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ success: false, error: "Please try to login with correct credentials" });
    }
   
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(500).json({ success: false, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    return res.json( {authtoken} );
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error has occurred");
  }
});


//Forgot password

  module.exports = router;