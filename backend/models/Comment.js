const mongoose=require("mongoose")
const {Schema}=mongoose;

const CommentSchema= new mongoose.Schema({
   comment:{
    type:String
   }

})

const Comment= new mongoose.model("comment", CommentSchema)

module.exports= FormNotes;