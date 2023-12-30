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
const div_tokenInfo = document.querySelector('.token-info');

const sessionId = Date.now().toString();

// DELAY with blank screen
h1.classList.add('display-none');
div_arena.classList.add('display-none');
div_downloading.classList.add('display-none');
div_footer.classList.add('display-none');

const displayDownloading = () => {
  div_marginAutoCont.classList.add('justify-center');
  div_downloading.classList.remove('display-none');
  setTimeout(hideDownloading, 6000);
};

const hideDownloading = () => {
  div_downloading.classList.add('display-none');
  div_marginAutoCont.classList.remove('justify-center');
  displayAll();
  setTimeout(displayWakeUp, 2000);
};

const displayAll = () => {
  h1.classList.remove('display-none');
  div_arena.classList.remove('display-none');
  div_footer.classList.remove('display-none');
};

const displayWakeUp = () => {
  typeWrite('Wake up, Neo...', div_chatResponse);
  setTimeout(appearAll, 2000);
};

const appearAll = () => {
  h1.classList.add('opacity1');
  div_userInputContainer.classList.add('opacity1');
  div_footer.classList.add('opacity1');
  input_userInput.focus();
};

document.addEventListener('click', () => input_userInput.focus());

input_userInput.addEventListener('focus', () => setTimeout(scroll2view, 50)); // wait for keyboard before scrolling 

const scroll2view = () => {
  input_userInput.scrollIntoView({ behavior: "smooth" });
};

input_userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkForInput();
});

const checkForInput = () => {
  if (input_userInput.value) {
    removeKeyboardFocus();
    resetChatResponse();
    displayUserPrompt();
  }
};

const removeKeyboardFocus = () => input_userInput.blur();
const resetChatResponse = () => div_chatResponse.innerHTML = '';

const displayUserPrompt = () => {
  const userPrompt = input_userInput.value;
  const typingDelay = typeWrite(userPrompt, div_userPrompt);
  disableUserInput();
  resetUserInput();
  hideCursor();
  setTimeout(fetchChatResponse, typingDelay, userPrompt);
};

const disableUserInput = () => input_userInput.disabled = true;
const resetUserInput = () => input_userInput.value = '';
const hideCursor = () => div_cursor.classList.add('hidden');

const displayTokenInfo = (usage) => {
  div_tokenInfo.innerHTML = 
  `Session ID: ${sessionId}<br>
  Prompt Tokens: ${usage.prompt_tokens}<br>
  Completion Tokens: ${usage.completion_tokens}<br>
  Total Tokens: ${usage.total_tokens}<br>
  Max Total Tokens: 4,096`;
  div_tokenInfo.classList.add('opacity1');
};

const fetchChatResponse = (userPrompt) => {
  fetch('/fetchChatResponse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userPrompt, sessionId })
  })
  .then(response => response.json())
  .then(data => {
    const chatResponse = data.text;
    const typingDelay = typeWrite(chatResponse, div_chatResponse);
    displayTokenInfo(data.usage);
    setTimeout(allowInput, typingDelay);
  })
  .catch(error => console.error(error));
};

window.addEventListener('beforeunload', () => {
  fetch('/clearSession', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ sessionId })
  });
});

const allowInput = () => {
  resizeInput.call(input_userInput);
  div_cursor.classList.remove('hidden');
  input_userInput.disabled = false;
  input_userInput.focus();
};

/* continually resize userInput width to match its content */
const resizeInput = () => {
  input_userInput.style.width = input_userInput.value.length + "ch";
};
resizeInput();
input_userInput.addEventListener('input', resizeInput);

/* typewriter function */
const typeWrite = (string, container) => {
  container.innerHTML = '';
  const delayInterval = 50; // milliseconds
  const arr = string.split('');
  for (let i = 0; i < arr.length; i++) {
    doSetTimeout(i, arr, delayInterval, container);
  }
  const delayTotal = delayInterval * (arr.length - 1);
  return delayTotal;
};

const doSetTimeout = (i, arr, delayInterval, container) => {
  setTimeout(() => {
    const span = document.createElement('span');
    span.textContent = arr[i];
    container.appendChild(span);
  }, i * delayInterval);
};

setTimeout(displayDownloading, 2000);
