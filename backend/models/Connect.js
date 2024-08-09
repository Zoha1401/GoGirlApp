const mongoose=require("mongoose")
const {Schema}=mongoose;

const ConnectSchema= new mongoose.Schema({
    //Fields of Interest of the Mentee
    mentorId:{
        type:Schema.Types.ObjectId,
        require:true
    },

    mentorName:{
        required:true,
        type:String
    },

    mentees:[{
        type:Schema.Types.ObjectId,
        required:true
    }]


})

const Connect= new mongoose.model("connnected", ConnectSchema)

module.exports= Connect;  