const mongoose=require("mongoose")
const {Schema}=mongoose;


const CommunitySchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
   
    communityName:{
        type:String,
        required:true,
    },
    
    

}, {timestamps:true})

const Community= new mongoose.model("communities", CommunitySchema)

module.exports= Community;