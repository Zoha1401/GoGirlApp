const mongoose=require("mongoose")
const {Schema}=mongoose;
const User = require('./User')
const Community = require('./Community')


const PostSchema= new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    communityId:{
        type:Schema.Types.ObjectId,
        // ref:'User',
        
    },

    desc:{
        type:String,
        max:500
    },
    img:{
        type:String,
        // required:true,
        // unique:true
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:[{
       type:String
    }]
    





}, {timestamps:true})

const Post= new mongoose.model("posts", PostSchema)

module.exports= Post;