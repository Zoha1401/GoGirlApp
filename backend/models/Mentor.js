const mongoose=require("mongoose")
const {Schema}=mongoose;

const MentorSchema= new mongoose.Schema({
    //Foreign key from user table

    mentorId:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
   mentorName:{
    type:"String",
    required:true
   },
   skill:{
    type:String,
    required:true
   },
   mentees:[{
     type:Schema.Types.ObjectId
   }]

})

const Mentor= new mongoose.model("mentors", MentorSchema)

module.exports= Mentor;
