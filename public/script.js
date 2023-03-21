"use strict";

const input_userInput = document.querySelector('#user-input');
const button_submit = document.querySelector('#submit');
const div_userPrompt = document.querySelector('.user-prompt');
const div_chatResponse = document.querySelector('.chat-response');
const div_downloading = document.querySelector('.downloading');
const div_marginAutoCont = document.querySelector('.margin-auto-container');
const h1 = document.querySelector('h1');
const div_arena = document.querySelector('.arena');
const div_footer = document.querySelector('.footer');
const div_userInputContainer = document.querySelector('.user-input-container');

let userPrompt = '';
let chatResponse = '';

// DELAY with blank screen
h1.classList.add('display-none');
div_arena.classList.add('display-none');
div_downloading.classList.add('display-none');
div_footer.classList.add('display-none');
setTimeout(displayDownloading, 2000);

function displayDownloading() {
  div_marginAutoCont.classList.add('justify-center');
  div_downloading.classList.remove('display-none');
  setTimeout(hideDownloading, 6000);
}

function hideDownloading() {
  div_downloading.classList.add('display-none');
  div_marginAutoCont.classList.remove('justify-center');
  displayAll();
  setTimeout(displayWakeUp, 2000);
}

function displayAll() {
  h1.classList.remove('display-none');
  div_arena.classList.remove('display-none');
  div_footer.classList.remove('display-none');
}

function displayWakeUp() {
  typeWrite('Wake up, Neo...', div_chatResponse);
  setTimeout(appearAll, 2000);
}

function appearAll() {
  h1.classList.add('appear');
  div_userInputContainer.classList.add('appear');
  div_footer.classList.add('appear');
}


button_submit.addEventListener('click', checkForInput);

function checkForInput() {
  if (input_userInput.value) {
    hideChatResponse();
    displayUserPrompt();
  }
}

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
    typeWrite(chatResponse, div_chatResponse);
  })
  .catch(error => console.error(error));
}


// track session tokens
// track user tokens
// track all-time tokens
// display price for each


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