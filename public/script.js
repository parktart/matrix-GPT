"use strict";


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

// ACTIVATE input field
// LISTEN for user input (userResponse)


// WHEN receive userResponse
// RESET chatResponse = ""

// REMOVE userResponse from input field
// DEACTIVATE input field
// DISPLAY userResponse in div_arena

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




let chatResponse;

function fetchChatResponse() {
  fetch('./chatResponse.json', { method: 'GET' })
  .then(response => response.json())
  .then(responseData => {
    console.log(responseData);
    // chatResponse = responseData.??
    updateChatResponse();
  })
  .catch(error => console.error(error));
}

function updateChatResponse() {
  // chatResponse.textContent
}