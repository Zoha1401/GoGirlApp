const mongoose=require("mongoose")
const {Schema}=mongoose;
const Community=require('./Community')

const UserSchema= new mongoose.Schema({
    password:{
        type:String,
        required:true,
        min:6
    },
    name:{
        type:String,
        required:true,
        min: 3,
        max: 20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    profilePicture: {
        type: String,
        default: "",
      },
    date:{
        type:Date,
        default:Date.now
    },
    aadhar:{
         type:Number,
         required:true,
         unique:true,
        //  max:12,
        //  min:12
    },
    about:{
        type:String
    },
    mentorship:{
        type:Boolean
    },
    menteeship:{
        type:Boolean
    }
    
    // communities:[Community.Schema],

}, 
{timestamps:true})


const User= new mongoose.model("users", UserSchema)

module.exports= User;