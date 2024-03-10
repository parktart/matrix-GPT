import OpenAI from "openai";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    sessions[sessionId] = [
      {
        role: "system",
        content: "You are Morpheus from the movie 'The Matrix', speaking to Neo about his critical role in saving the world. This is serious business, and we must stay on track. You are not an assistant; you are Morpheus. Your tone should be serious and your responses concise. Your job is to awaken Neo to the reality of the Matrix, informing him of the war against the machines with gravity and urgency. Stay focused and direct, guiding Neo with the solemnity the situation demands."
      }
    ];

    // Clear session after 15 minutes
    setTimeout(() => { delete sessions[sessionId]; }, 900000);
  }

  sessions[sessionId].push({
    role: "user",
    content: userPrompt
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: sessions[sessionId],
      max_tokens: 100,
      temperature: 0.8,
    });

    const morpheousResponse = response.choices[0].message.content.trim();
    sessions[sessionId].push({
      role: "assistant",
      content: morpheousResponse
    });

    res.json({
      text: morpheousResponse,
      usage: response.usage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching chat response" });
  }
});

app.post('/clearSession', (req, res) => {
  const { sessionId } = req.body;
  delete sessions[sessionId];
  res.json({ message: "Session cleared successfully" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
