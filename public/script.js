"use strict";

const input_userInput = document.querySelector('#user-input');
const button_submit = document.querySelector('#submit');
const div_userPrompt = document.querySelector('.user-prompt');
const div_chatResponse = document.querySelector('.chat-response');

let userPrompt = '';
let chatResponse = '';


// DELAY 1s with blank screen

// DISPLAY div_downloading with infinite css animation - for 5 seconds

// HIDE div_downloading

// DELAY 1s with blank screen

// DISPLAY wakeUp
typeWrite('Wake up, Neo...', div_chatResponse);

// DISPLAY everything else with opacity 0 -> 1 transition



  /* REPEAT */

// LISTEN for userPrompt
button_submit.addEventListener('click', checkForInput);

function checkForInput() {
  if (input_userInput.value) {
    hideChatResponse();
    displayUserPrompt();
  }
}

// WHEN receive userPrompt
function hideChatResponse() {
  div_chatResponse.innerHTML = '';
}

function displayUserPrompt() {
  userPrompt = input_userInput.value;
  typeWrite(userPrompt, div_userPrompt);
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
    chatResponse = data.text;
    // displayChatResponse();
    typeWrite(chatResponse, div_chatResponse);
  })
  .catch(error => console.error(error));
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




function typeWrite(string, container) {
  container.innerHTML = '';
  const delayInterval = 50; // milliseconds
  const arr = string.split('');
  for (let i = 0; i < arr.length; i++) {
    doSetTimeout(i, arr, delayInterval, container);
  }
  const delayTotal = delayInterval * (arr.length - 1);
  // delay next step until array has fully appeared + 500ms
  // setTimeout(NEXTFUNCTION, delayTotal + 500);
}

function doSetTimeout(i, arr, delayInterval, container) {
  setTimeout(function() {
    const span = document.createElement('span');
    span.textContent = arr[i];
    container.appendChild(span);
  }, i * delayInterval);
}