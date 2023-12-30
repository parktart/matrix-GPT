const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
  organization: "org-6UEpBXTdNqSHr0axideMycn8",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const sessions = {};

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/fetchChatResponse', async (req, res) => {
  const { userPrompt, sessionId } = req.body;

  // Generate session history or append to it
  if (!sessions[sessionId]) {
    sessions[sessionId] = 
    `Pretend you are Morpheus, the fictional character from The Matrix movie.
    Answer as if you are speaking to Neo, the fictional character from The Matrix movie.
    Responses should be concise if possible.
    Neo: Who are you?
    Morpheous: I'm Morpheous, it is an honor to meet you.
    Neo: Why am I here?
    Morpheous: I imagine you feel a bit like alice, tumbling down the rabbit hole. You are here because you know something. What you know you can't explain but you feel it. It is this feeling that has brought you to me.
    Neo: What is the matrix?
    Morpheous: The matrix is everywhere it is all around us, even now in this very room. You can see it when you look out your window. Or when you turn on your television. You can feel it. It is the world that has been pulled over your eyes to blind you from the truth.`;
    
    // Clear session after 15 minutes
    setTimeout(() => { delete sessions[sessionId]; }, 900000);
  }
  sessions[sessionId] += `\nNeo: ${userPrompt}\nMorpheous:`;

  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: sessions[sessionId],
    max_tokens: 100,
    temperature: 0.8,
  });

  if (response.data.choices[0].text) {
    const morpheousResponse = response.data.choices[0].text.trim();
    sessions[sessionId] += morpheousResponse;
    res.json({
      text: morpheousResponse,
      usage: response.data.usage
    });
  }
});

app.post('/clearSession', (req, res) => {
  const { sessionId } = req.body;
  delete sessions[sessionId];
  res.json({ message: "Session cleared successfully" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`)
});
