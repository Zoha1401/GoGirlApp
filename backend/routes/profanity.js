
const OpenAI =require("openai");
const express = require("express");
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});


// Route to analyze user-generated content for abusive language
router.post('/analyze-content', async (req, res) => {
  const { content } = req.body;

  try {
    // Send user-generated content to OpenAI for analysis
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Return true if there are any abusive words else return false' },
        { role: 'user', content }
      ],
      model: 'gpt-3.5-turbo',
    });

    // Extract analysis result from OpenAI response
    const isAbusive = completion.choices[0].message.content.toLowerCase().includes('true');

    // Return analysis result to the client
   return res.status(200).json({ isAbusive });
  } catch (error) {
    console.error('Error analyzing content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
