//  import required modules from nodejs and build the server
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// Express Middleware
app.use(express.json());

const dbFilePath = path.join(__dirname, '..', 'db.json');
const dataJSON = fs.readFileSync(dbFilePath);
const data = JSON.parse(dataJSON);

// Routs :
app.route('/').get(getTodos).post(createTodo);
app.route('/:id').put(updateTodo).delete(deleteTodo);

// Functions :
function getTodos(req, res) {
  return res.status(200).json(data.todos);
}

function createTodo(req, res) {
  data.todos.push(req.body);
  fs.writeFile(
    dbFilePath,
    JSON.stringify(data),
    function (err) {
      return res.status(200).json(data.todos);
    }
  );
}

function updateTodo(req, res) {
  const todoID = req.params.id * 1;
  const todoIndex = findTodoIndex(todoID, data.todos);
  if (todoIndex === null) {
    res.status(400);
    res.end('Invalid argument');
  }
  data.todos[todoIndex] = req.body;
  fs.writeFile(
    dbFilePath,
    JSON.stringify(data),
    function (err) {
      return res.status(200).json(data.todos);
    }
  );
}

function findTodoIndex(id, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }
  return null;
}

function deleteTodo(req, res) {
  const delTodoId = Number(req.params.id);
  let todoPresent = false;
  data.todos = data.todos.filter(function (todo) {
    if (todo.id === delTodoId) {
      todoPresent = true;
      return false;
    }
    return true;
  });

  if (!todoPresent) {
    res.writeHead(400, { 'content-type': 'text/plain' });
    res.end('Invalid argument');
    return;
  }

  fs.writeFile(
    dbFilePath,
    JSON.stringify(data),
    function (err) {
      return res.status(200).json(data.todos);
    }
  );
}

const port = 4000;
app.listen(port, function () {
  console.log(`App running on port ${port}`);
});

// export the server
module.exports = app;
