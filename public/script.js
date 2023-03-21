"use strict";

const input_userInput = document.querySelector('#user-input');
const button_submit = document.querySelector('#submit');
const div_chatResponse = document.querySelector('.chat-response');
const div_userPrompt = document.querySelector('.user-prompt');

let userPrompt = '';
let chatResponse = '';

// SEND INITIAL PROMPT to ChatGPT - prompt with matrix movie plot and user/GPT character roles

// LISTEN for chatInitialResponse


// DELAY 1s with blank screen

// DISPLAY div_downloading with infinite css animation
// WHEN receive chatInitialResponse -> HIDE div_downloading


// DISPLAY h1 and footer with opacity 0 -> 1 transition


// DISPLAY chatInitialResponse in div_arena
// via typeChatResponse function

function typeChatResponse(chatResponseString) {
  const chatResponseArray = ['?'];

  for (const char of chatResponseArray) {
    console.log(char);
  }
  
}

// DISPLAY user input box


  /* REPEAT */

// LISTEN for userPrompt
button_submit.addEventListener('click', checkForInput);

function checkForInput() {
  if (input_userInput.value) displayUserPrompt();
}

// WHEN receive userPrompt
function displayUserPrompt() {
  div_chatResponse.textContent = '';
  
  userPrompt = input_userInput.value;
  div_userPrompt.textContent = userPrompt;
  input_userInput.value = '';
  // DEACTIVATE input field / submit button eventListener here

  fetchChatResponse();
}


function fetchChatResponse() {
  fetch('/fetchChatResponse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userPrompt })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // chatResponse = data.??
    updateChatResponse();
  })
  .catch(error => console.error(error));
}

function updateChatResponse() {
  // div_chatResponse.textContent = 
}


// DISPLAY div_downloading in div_arena
// LISTEN for chatResponse

// DISPLAY chatResponse in div_arena
// via typeChatResponse function

  /* REPEAT */


// on the third chatResponse, add "by the way - I can help you with coding topics - just click on a topic below!"


// track session tokens
// track all-time tokens in database
// display price for each



const body = document.querySelector('body');
body.addEventListener('click', logColor);

function logColor(e) {
  // console.log(e.target.style.color);
}

body.addEventListener('click', function (e) {
  // e.target.style.background = 'blue';
});

body.addEventListener('click', (e) => {
  // console.log(e);
  // console.dir(e);
});




