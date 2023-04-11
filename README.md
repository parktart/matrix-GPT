# matrix-GPT

## About

My goal with this little app was to learn about APIs by connecting chatGPT on a single page application. I ended up learning much more than I originally thought this project would require including JSON, HTTP, Node, Express, and APIs. That's the beauty of learning through building! My personal notes on these new-to-me subjects can be found below.

[LIVE PAGE](https://matrix-gpt-render.onrender.com/)

[Wake Up, Neo scene on YouTube](https://www.youtube.com/watch?v=sjoad6gcRzs)
 <br> 

## JSON

JSON - JavaScript Object Notation

Lightweight data-interchange format

Used to send data to/from a server as text

has mostly replaced XML for the use case of dealing with REST APIs

and is often used with AJAX (ajax is used to send data to/from the server without having to refresh the page)

JSON can be parsed by most modern programming languages

file type is `.json`

MIME type is `application/json`
 <br> 
Similar to syntax for JavaScript object literals - for example here is a JavaScript object literal..

```javascript
var myObject = {name: 'parker', age: 26, weight: '170 lbs'};
```

and here is a line of JSON..

```json
{
    "name":"parker",
    "age":26,
    "weight":"170 lbs"
}
```

NOTE you must use **double quotes** in JSON whereas in JavaScript they are interchangable

and actually you can convert a **JavaScript Object** to **JSON** using JavaScript..

```javascript
// javascript
var myObject = {name: 'parker', age: 26, weight: '170 lbs'};
myObject = JSON.stringify(myObject);

console.log(myObject) // {"name":"parker","age":26,"weight":"170 lbs"}
```

but note `myObject` will no longer be a JavaScript object..

```javascript
console.log(myObject.name) // undefined
typeof myObject // string
```

but we can convert it back!

```javascript
myObject = JSON.parse(myObject)
```
 <br> 
JSON accepts the **data types**: **Number, String, Boolean, Array, Object, Null**

```json
{
    "name":"parker",
    "age":26,
    "address":{
        "street":"327 Central Pl",
        "city":"Saint Louis"
    },
    "hobbies":["cooking","gardening"]
}
```

and we can access in JavaScript, for example, "cooking" with..

```javascript
var theObject = // some code that imports the JSON from the database
theObject = JSON.parse(theObject);

console.log(theObject.hobbies[0])
```
 <br> 

## HTTP and JavaScript

To use HTTP with Vanilla JaVascript

you can use the `XMLHttpRequest()` object

or the newer `fetch()` method which is preffered for it's simplicity - but may not be able to hand more complex scenarios

Both allow you to send HTTP requests and receive responses asynchronously using JavaScript
 <br> 

### XMLHttpRequest()

`GET` request:

note it is common to make a variable `xhr` for 'XML Http Request'

```javascript
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) { // if the response has been fully received/loaded
    if (xhr.status === 200) {
      const theResponse = JSON.parse(xhr.responseText);
      console.log(theResponse);
    } else {
      console.error('Request failed.  Returned status of ' + xhr.status);
    }
  }
};
xhr.open("GET", "./people.json", true);
xhr.send();
```

here we used the event handler `onreadystatechange` which is pretty general 

where the `readyState` property indicates the state of the request

and `onreadystatechange` will fire on changes to the request including to `readyState`, `status`, and `statusText`
 <br> 
or we can be more specific and utilize the `onload` event handler instead of using logic..

```javascript
const xhr = new XMLHttpRequest();
xhr.onload = function() { 				// onload means when the response has been fully received/loaded
  if (xhr.status === 200) {
    const theResponse = JSON.parse(xhr.responseText);
    console.log(theResponse);
  } else {
    console.error('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.open("GET", "./people.json", true);
xhr.send();
```
 <br> 
for example we might use this to update the names rendered on a page when a button is pressed..

```json
{
  "people":[
    {
      "name":"parker",
      "age":26
    },
    {
      "name":"jack",
      "age":28
    },
    {
      "name":"joe",
      "age":30
    }
  ]
}
```

```javascript
const button = document.querySelector('button');
const div_namesContainer = document.querySelector('div');

button.addEventListener('click', updateNames);

function updateNames() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status === 200) {
      const theResponse = JSON.parse(xhr.responseText);
      const peopleArr = theResponse.people

      for (let i = 0; i < peopleArr.length; i++) {
        const name = document.createElement('p');
        name.textContent = peopleArr[i].name;
        div_namesContainer.appendChild(name);
      }
    } else {
      console.error('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.open("GET", "./people.json", true);
  xhr.send();
}
```
 <br> 

### fetch()

The newer method `fetch()` is preferred by many developers..

`GET` request:

```javascript
fetch('./people.json', { method: 'GET' })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
 <br> 
and so to achieve the same as the above function using fetch()..

```javascript
function updateNames() {
  fetch('./people.json', { method: 'GET' })
  .then(response => response.json())
  .then(responseData => {
    const peopleArr = responseData.people

    for (let i = 0; i < peopleArr.length; i++) {
      const name = document.createElement('p');
      name.textContent = peopleArr[i].name;
      div_namesContainer.appendChild(name);
    }
  })
  .catch(error => console.error(error));
}
```
 <br> 
One advantage of the `fetch()` method is that it provides a simpler and more streamlined way to make HTTP requests. The `fetch()` function returns a Promise that resolves to the response from the server, making it easier to handle asynchronous code and avoid callback hell. The `fetch()` method also has a cleaner syntax and can be easier to read and understand.

Another advantage of the `fetch()` API is that it supports modern features like Promises, async/await, and the `ReadableStream` interface, which allows you to process response data as a stream. Additionally, the `fetch()` API provides built-in support for the `JSON` data type, so you can easily handle JSON response data without having to manually parse it.

However, the `XMLHttpRequest()` object still has its uses, especially for more complex scenarios where you need fine-grained control over the request and response handling. For example, `XMLHttpRequest()` allows you to track the progress of a long-running request, whereas `fetch()` does not provide built-in support for tracking request progress. `XMLHttpRequest()` also allows you to cancel a request mid-flight, whereas with `fetch()` you must wait for the request to complete before handling it.
 <br> 
`POST` request

```javascript
const addThis = { name: 'charlie', age: 88 };

fetch('./people.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(addThis)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

`PUT` reqeust

`DELETE` request
 <br> 

## Node.js

Node.js is a JavaScript runtime environment that allows you to run JavaScript outside of your web browser

often used for web servers, REST APIs, and microservices
 <br> 
a **runtime environment** is where your program will be executed

this determines which global objects your program can access

and can impact how your program runs
 <br> 
there are **two** JavaScript runtime environments..

- the **browser** runtime environment (Chrome, Firefox, etc)
- the **Node** runtime environment
 <br> 

#### Browser Runtime Environment

is the most common place JavaScript code is executed

when you use a browser to open a local `html` file containing a `<script>`..

that script will execute in the browser's runtime environment

which means your program will have access to the `window` object and all of its methods - like `alert` `prompt` etc

applications created for and executed in the browser are known as **front-end applications**

for a long time JavaScript code could only be executed in a browser and was used exclusively for creating front-end applications

in order to create back-end applications that could run on a computer WITHOUT a browser you would need to use other languages such as Java or PHP
 <br> 

#### Node Runtime Environment

in 2009, the Node runtime environment was created for the purpose of executing JavaScript code without a browser, thus enabling programmers to create full-stack (front-end and back-end) applications using only the JavaScript language
 <br> 
Node is open-source

Node executes JavaScript using the V8 JavaScript engine (same as Google Chrome)

Node is an entirely different runtime environment though

meaning that browser-environment data values and functions - like `alert()` - can’t be used

instead the Node runtime environment gives back-end applications access to a variety of features unavailable in a browser

such as access to the server’s file system, database, and network
 <br> 
the Node runtime is commonly used to create **command line tools** and **web servers**
 <br> 

#### Installing Node

`nvm` - Node Version Manager - used to change Node versions and upgrade Node

`npm` - Node Package Manager - used to install various libraries and tools used in JavaScript environments

for example we will use **Jest**, a testing software, to test our code with the command..

`npm test <test-file.spec.js>`
 <br> 
`nvm ls` for details on nvm

[install](https://www.theodinproject.com/lessons/foundations-installing-node-js) (odin)

[docs](https://github.com/nvm-sh/nvm) (github readme)

`npm version` for details on npm
 <br> 
to tell `nvm` which version of Node to use when we run the `node` command, use..

```bash
nvm use --lts
```

which in this case tells `nvm` to use the most recent LTS version of Node installed on our computer
 <br> 

#### Using Node

Node provides an interactive console which lets you run and edit your javascript code right in your terminal

```bash
node  # opens the Node terminal console
```
 <br> 

#### Node Project

`npm` is used to install 3rd party packages - all dependencies required to run a node project are listed in a `package.json` file

`npm init` generates the `package.json` file

`npm install express` installs express (or any package) locally and will update the `package.json` file automatically

`npm install -g express` installs express globally
 <br> 
And so node is so useful because you can utilize all of these modules (also called packages) in building your project

and there are three basic types of modules..

1. The "core" node modules - including `path`, `fs`, `http`, etc - do not need to be installed

2. Third-party modules - created by others - installed via npm (like `express`)

3. Custom modules - created by you - used to store functions, variables, objects, classes, etc - created locally
 <br> 
 to use any of these module types in our main file we would need to import them using..

```javascript
const path = require('path'); // path is one of the "core" node modules
const myModule = require('./myModule.js'); // a custom module
```
 <br>

#### Creating A Node Project

so the first thing you do to make it a node project is, inside your project folder..

`npm init`

this will walk you through setting up the project and create the `packages.json` file

now if you `npm install <package>` in your project directory - that dependency will automatically be added to `packages.json`

Note you can declare a module to be a `devDependencies` with the `-D` flag which just distinguishes them from dependencies needed to run the project vs work on it (for developers)

`npm install -D <package>`

for example `nodemon` is a package that allows us to not have to reload the server each time ??

note the `node_modules` folder holds all the project dependencies and *their* dependencies and so it gets rather large

and if we were going to deploy our project to a host, we wouldn't want to send this huge folder, and so

we can delete the entire `node_modules` folder before we deploy our project

in fact you can do this locally for fun and then just run `npm install` in the project directory to get it back!
 <br> 
also probably a good idea to add a `.gitignore` file that contains `node_modules`

so the `node_modules` folder wont be pushed to git! 
 <br> 

#### Simple deployment to Render.com

the free trial of Render.com offers very little storage - so APIs will have to be small

build a new web service - select the git repo

Runtime `Node`

Build Command `npm install`

Start Command `node index.js`
 <br> 
ELSE try..

and if you need a database: Railway, Planetscale, CockroachDB

AWS/GCP is the hard mode option for everything
 <br> 

#### Custom Modules

Now we have a main `js` file usually called `index.js` `app.js` or `main.js` and then many other `js` files which are the 'modules'

And we can create custom modules so that our main code doesn't get bloated for example if we wanted to store an object that may get really big we can store it in a seperate `js` file like..

```javascript
// person.js
const person = {
  name: 'John Doe',
  age: 30
}

module.exports = person;
```

and we use `module.exports` so that when `person.js` file is imported into our `index.js` file we will have access to the `person` object

which we import using..

```javascript
// index.js
const person = require('./person.js');
```
 <br> 
note that when a module file like `person.js` is processed by node,

node actually wraps the code in the 'Module Wrapper Function'

```javascript
function (exports, require, module, __filename, __dirname) {
    // person.js
}
```

and so we have access to these parametes in the module file!

which we can see with..

```javascript
// person.js
console.log(__filename) // /home/parker/repos/test/person.js
```
 <br> 

#### Core Modules

to use a node "core" module (see Node docs for info on each one) we simply require them in our file..

```java
// index.js
const path = require('path');
    
console.log(path); // to view all methods that come with the path object
```

path, for example, is used to **manipulate path strings** like `/home/parker/repos/test/script.js`

for example we can extract just the filename..

```javascript
console.log(path.basename(__filename)) // script.js
```
 <br> 
lets **make a new directory** called `test` in the current directory utilizing the file-system `fs` "core" module

```javascript
const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'test'), {}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Directory created successfully!');
});

```
 <br> 
then **create and write to a file**..

```javascript
const fs = require('fs');
const path = require('path');

const content = 'This will be the content';

fs.writeFile(path.join(__dirname, 'test', 'newFile.txt'), content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File created and written successfully!');
});
```

Note that if the file already exists, the `writeFile` method will overwrite its content

If you want to append content to an existing file, use the `fs.appendFile` method instead
 <br> 
and then **read the file**..

```javascript
const fs = require('fs');

fs.readFile('/path/to/newFile.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```
 <br> 
and **work with URLs** - with the first step usually being to take a URL string and make

a URL object so that it's easy to access the indiviual properties..

```javascript
const url = require('url');

const myUrl = url.parse('http://mywebsite.com:5500/hello.html?id=100&status=active');
console.log(myUrl);
```

from this `console.log` you can see the different properties of he URL you can work with
 <br> 
however, since Node v10, a newer method was introduced that does not require the url module

and instead utilizes a URL class to construct your URL object..

```javascript
const url = require('url'); // imports all methods, functions, and classes from the url module

const myURL = new URL('http://mywebsite.com:5500/hello.html?id=100&status=active');
console.log(myURL);
```

this has the added advantage of extracting the search parameters..

```javascript
console.log(myURL.searchParams); // URLSearchParams { 'id' => '100', 'status' => 'active' }
console.log(myURL.searchParams.get('id')); // 100
```
 <br> 

#### Events

**events** is maybe the most important "core" module of Node

side note - a **class**, in JavaScript, is just a template for creating objects that have similar properties and methods

Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause `Function` objects ("listeners") to be called.

All objects that emit events are instances of the `EventEmitter` class. These objects use a `.on()` function that allows one or more functions to be attached to named events emitted by the object. 

When the `EventEmitter` object emits an event, all of the functions attached to that specific event are called *synchronously*. Any values returned by the called listeners are *ignored* and discarded.

The following example shows a simple `EventEmitter` instance with a single listener. The `.on()` method is used to register listeners, while the `.emit()` method is used to trigger the event.

```javascript
const EventEmitter = require('events'); // here we import the EventEmitter class

// Init object
const myEmitter = new EventEmitter(); // myEmitter is an object of the EventEmitter class

// Event listener
myEmitter.on('event', () => console.log('event fired!'));

// Init event
myEmitter.emit('event');
```
 <br> 
sometimes developers create a class that "extends" the `EventEmitter` class so that they can add

custom methods and properties to the class before using it to make their emitter objects..

```javascript
// Create class
class MyEmitter extends EventEmitter { }; // and then customize this MyEmitter class as desired

// Init object
const myEmitter = new MyEmitter(); // myEmitter is an object of class MyEmitter
```

when an object is created from the `MyEmitter` class, it will have access to all of the properties and methods defined in the `MyEmitter` class, as well as any properties and methods inherited from the `EventEmitter` class
 <br> 

#### Third-Party Modules

you just install them and use them