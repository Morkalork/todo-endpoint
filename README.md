# todo-endpoint

This is a package that can be used to setup a basic todo-application. It provides a very basic backend where you can GET, POST and DELETE todo items. It will save all todos in a file under `/db/todos.json`. If you decide to use this package in production, please change profession.

## Installation

To install this package in your package you can fetch it from npm, like this:

```
npm install --save todo-endpoint
```

Then just run it by calling, either directly or in a script:

Directly, in your prompt:

```
./node_modules/.bin/todo-endpoint
```

Create a script for it:

```
{
  ...
  "scripts": {
    "start": "todo-endpoint"
  },
  "
}

npm start
```

## Options

The only real option is to set the port on which to run the server. It defaults to 3000, but the first and only argument can be another port:

```
./node_modules/.bin/todo-endpoint 5000
```

## API References:

The todo object looks like this:

```js
{
  id: 0,
  title: '',
  description: '',
  timeStamp: 0
}
```

**GET**

`/todo`

_Fetches all available todo items_

```js
fetch('http://localhost:3000/todo').then(todos => {
  // Do something with the todo items!
});
```

---

`/todo/:todoId`

_Fetches a todo item with a matching id_

```js
fetch('http://localhost:3000/todo/12').then(todo => {
  // Do something with the todo item!
});
```

---

**POST**

`/todo`

_Saves or updates a todo item. If the items "id" property is set, an update will be performed, otherwise a save._

```js
const newItem = {
  title: 'Test',
  description: 'This is clearly a test todo item'
};

fetch('http://localhost:3000/todo', {
  method: 'post',
  body: JSON.stringify(newItem)
}).then(() => {
  // Do something after the save...
});
```

---

**DELETE**

`/todo/:todoId`

_Deletes a todo item permanently_

```js
fetch('http://localhost:3000/todo/3', {
  method: 'delete'
}).then(() => {
  // Do something after the delete...
});
```

---

## Contribute

If you want to contribute to this repository just make a PR and I'll check it as soon as possible. If you want to help out with administrating it, just mess me and we'll set it up!
