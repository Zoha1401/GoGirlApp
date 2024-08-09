const mongoose = require("mongoose");
const {Schema}=mongoose;

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      require:true
    },
    sender: {
      type:Schema.Types.ObjectId,
      require:true
    },
    text: {
      type: String,
      require:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);