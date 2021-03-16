var express = require('express');

var route = express.Router();

var controller = require('../controllers/book.controller.js')

route.get('/', controller.index);

route.get('/:id/delete', controller.delete);

route.get("/add", controller.create);

route.post('/add', controller.postCreate);

module.exports = route;  