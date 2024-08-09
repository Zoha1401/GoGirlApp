const mongoose=require("mongoose")
const {Schema}=mongoose;
const User= require('./User')

const CommunitySchema= new mongoose.Schema({

    //Reference from user
    creatorId:{
        type:Schema.Types.ObjectId,
         ref:'User', 
        required:true
    },

    desc:{
        type:String,
        max:500
    },
    communityName:{
        type:String,
        required:true,
        unique:true
    },
    numOfPeople:{
       type:Number,
       default:0
    },
    // communityProfile:{
    //     type:Image,
    // },
    numOfPosts:
    {
        type:Number,
        default:0
    },

    members:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]



}, {timestamps:true})

const Community= new mongoose.model("communities", CommunitySchema)

module.exports= Community;