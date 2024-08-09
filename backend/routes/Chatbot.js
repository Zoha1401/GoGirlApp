const OpenAI =require("openai");
const express = require("express");
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});


router.post(
  "/chatbot",

  async (req, res) => {
    
    console.log("1")
    const {prompt}=req.body
    console.log(prompt)
    try{
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "assistant",
          "content": prompt
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response)
    const chatResponse = response.choices[0].message.content;
    return res.json({ response: chatResponse });
      
  }catch(err){
    console.log(err.message)
    return res.status(500).send("Internal server error has occurred");
  }
  }
);





module.exports = router;