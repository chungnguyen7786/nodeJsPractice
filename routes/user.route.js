var express = require('express');

var route = express.Router();

var controller = require('../controllers/user.controller.js');
var validate = require('../validate/user.validate.js');
var cookie = require('../cookies/count.cookie.js');

route.get('/', cookie.count, controller.index);

route.get('/:id/delete', cookie.count, controller.delete);

route.get("/add", cookie.count, controller.create);

route.post('/add', cookie.count, validate.postCreate, controller.postCreate);

route.get('/:id/view', cookie.count, controller.view);

route.get("/:id/edit", cookie.count, controller.edit);

route.post('/:id/edit', cookie.count, controller.postEdit);

module.exports = route;  