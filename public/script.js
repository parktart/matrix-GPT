"use strict";

const input_userInput = document.querySelector('#user-input');
const div_userPrompt = document.querySelector('.user-prompt');
const div_chatResponse = document.querySelector('.chat-response');
const div_downloading = document.querySelector('.downloading');
const div_marginAutoCont = document.querySelector('.margin-auto-container');
const h1 = document.querySelector('h1');
const div_arena = document.querySelector('.arena');
const div_footer = document.querySelector('.footer');
const div_userInputContainer = document.querySelector('.user-input-container');
const div_cursor = document.querySelector('.cursor');


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
  h1.classList.add('opacity1');
  div_userInputContainer.classList.add('opacity1');
  div_footer.classList.add('opacity1');
  input_userInput.focus();
}

document.addEventListener('click', () => input_userInput.focus());

input_userInput.addEventListener('focus', () => setTimeout(scroll2view, 50)); // wait for keyboard before scrolling 

function scroll2view() {
  input_userInput.scrollIntoView({behavior: "smooth"});
}

input_userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkForInput();
})

function checkForInput() {
  if (input_userInput.value) {
    removeKeyboardFocus();
    resetChatResponse();
    displayUserPrompt();
  }
}

function removeKeyboardFocus() {
  input_userInput.blur();
}

function resetChatResponse() {
  div_chatResponse.innerHTML = '';
}

function displayUserPrompt() {
  const userPrompt = input_userInput.value;
  const typingDelay = typeWrite(userPrompt, div_userPrompt);
  disableUserInput();
  resetUserInput();
  hideCursor();
  setTimeout(fetchChatResponse, typingDelay, userPrompt);
}

function disableUserInput() {
  input_userInput.disabled = true;
}

function resetUserInput() {
  input_userInput.value = '';
}

function hideCursor() {
  div_cursor.classList.add('hidden');
}

function fetchChatResponse(userPrompt) {
  fetch('/fetchChatResponse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userPrompt })
  })
  .then(response => response.json())
  .then(data => {
    const chatResponse = data.text;
    const typingDelay = typeWrite(chatResponse, div_chatResponse);
    setTimeout(allowInput, typingDelay);
  })
  .catch(error => console.error(error));
}

function allowInput() {
  resizeInput.call(input_userInput);
  div_cursor.classList.remove('hidden');
  input_userInput.disabled = false;
  input_userInput.focus();
}


/* continually resize userInput width to match its content */
input_userInput.addEventListener('input', resizeInput);

function resizeInput() {
  this.style.width = this.value.length + "ch";
}

resizeInput.call(input_userInput);


/* typewriter function */
function typeWrite(string, container) {
  container.innerHTML = '';
  const delayInterval = 50; // milliseconds
  const arr = string.split('');
  for (let i = 0; i < arr.length; i++) {
    doSetTimeout(i, arr, delayInterval, container);
  }
  const delayTotal = delayInterval * (arr.length - 1);
  return delayTotal;
}

function doSetTimeout(i, arr, delayInterval, container) {
  setTimeout(function() {
    const span = document.createElement('span');
    span.textContent = arr[i];
    container.appendChild(span);
  }, i * delayInterval);
}


// track session tokens
// track user tokens
// track all-time tokens
// display price for each