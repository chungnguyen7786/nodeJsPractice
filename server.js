// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();

var todos = ['Đi chợ', 'Nấu cơm', 'Rửa bát', 'Học code tại CodersX'];

app.set('view engine', 'pug');
app.set('views', './');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get('/todos', (req, res) => {
  var q = req.query.q;
  var matchedTodos;
  if (q === undefined) {
    matchedTodos = todos;
  } else {
    matchedTodos = todos.filter((todo) => {
      return todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  }  
  res.render("todos.pug", {todos: matchedTodos});
});

app.post('/todos/create', (req, res) => {
    todos.push(req.body.todo);
    res.redirect('back');
});


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
