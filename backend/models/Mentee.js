const mongoose=require("mongoose")
const {Schema}=mongoose;

const MenteeSchema= new mongoose.Schema({
    //Fields of Interest of the Mentee
    menteeId:{
      type:Schema.Types.ObjectId,
      required:true,
    },
    skill:{
      type:String,
      required:true
    },
    menteeName:{
      type:String,
      required:true
    }


})

const Mentee= new mongoose.model("mentees", MenteeSchema)

module.exports= Mentee;