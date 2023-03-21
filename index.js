const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
  organization: "org-6UEpBXTdNqSHr0axideMycn8",
  apiKey: process.env.OPENAI_API_KEY, // UNCOMMENT BEFORE PUSHING TO GITHUB
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/initialChatResponse', async (req, res) => {
  
})


app.post('/fetchChatResponse', async (req, res) => {
  const userResponse = req.body.userResponse;
 
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${userResponse}`,
    max_tokens: 10,
    temperature: 0,
  });

  if (response.data.choices[0].text) {
    res.json({ text: response.data.choices[0].text });
  }
})


app.listen(port, () => {
  console.log(`Server running on port ${port}...`)
});

