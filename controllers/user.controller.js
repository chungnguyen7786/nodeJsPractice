var shortid = require('shortid');

var db = require('../db.js');

var users = db.get('users').value();

module.exports.index = (req, res) => {
  var q = req.query.q;
  var matchedUsers;    
  if (q === undefined) {
    matchedUsers = users;
  } else {
    matchedUsers = users.filter((user) => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  }  
  res.render("./users/users.pug", {users: matchedUsers});
};

module.exports.delete = (req, res) => {   
    var id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect('/users');
};

module.exports.create = (req, res) => {
  res.render("./users/addUser.pug");
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    var errors = [];
    if(!req.body.name) {
      errors.push('Name is required.');
    } else if (req.body.name.length > 30) {      
      errors.push("Name's length must be smaller than or equal to 30.");
    }
    
    if(!req.body.phone) {
      errors.push('Phone is required.');
    }
    
    if(errors.length) {
      res.render('users/addUser.pug', {
        errors: errors,
        values: req.body
      });
      return;
     }
  
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.view = (req, res) => {   
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    if (user) {
        res.render('./users/viewUser.pug', {user: user});
    }    
};

module.exports.edit = (req, res) => {
  var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    if (user) {
        res.render('./users/editUser.pug', {user: user});
    }
};

module.exports.postEdit =(req, res) => {
  var id = req.params.id;
  db.get('users')
    .find({id: id})
    .assign({name: req.body.name, phone: req.body.phone })
    .write();
    res.redirect('/users');
};
