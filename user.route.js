var express = require('express');

var route = express.Router();

var shortid = require('shortid');

var db = require('./db.js');

var users = db.get('users').value();

// code for users
route.get('/', (req, res) => {
  var q = req.query.q;
  var matchedUsers;    
  if (q === undefined) {
    matchedUsers = users;
  } else {
    matchedUsers = users.filter((user) => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  }  
  res.render("users.pug", {users: matchedUsers});
});

route.get('/:id/delete', (req, res) => {   
    var id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect('/users');
});

route.get("/add", (req, res) => {
  res.render("addUser.pug");
});

route.post('/add', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

route.get('/:id/view', (req, res) => {   
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    if (user) {
        res.render('./viewUser.pug', {user: user});
    }    
});

route.get("/:id/edit", (req, res) => {
  var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    if (user) {
        res.render('./editUser.pug', {user: user});
    }
});

route.post('/:id/edit', (req, res) => {
  var id = req.params.id;
  db.get('users')
    .find({id: id})
    .assign({name: req.body.name, phone: req.body.phone })
    .write();
    res.redirect('/');
});


module.exports = route;  