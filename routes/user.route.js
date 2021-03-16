var express = require('express');

var route = express.Router();

var controller = require('../controllers/user.controller.js')

route.get('/', controller.index);

route.get('/:id/delete', controller.delete);

route.get("/add", controller.create);

route.post('/add', controller.postCreate);

route.get('/:id/view', controller.view);

route.get("/:id/edit", controller.edit);

route.post('/:id/edit', controller.postEdit);

module.exports = route;  