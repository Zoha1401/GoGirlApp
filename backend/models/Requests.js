const mongoose=require("mongoose")
const {Schema}=mongoose;

const RequestSchema= new mongoose.Schema({
    //Fields of Interest of the Mentee
    mentorId:{
        type:Schema.Types.ObjectId,
        required:true
    },

    mentorName:{
        required:true,
        type:String
    },

    mentees_requested:[{
        type:Schema.Types.ObjectId,
        required:true
    }]


})

const Request= new mongoose.model("request", RequestSchema)
 
module.exports= Request;