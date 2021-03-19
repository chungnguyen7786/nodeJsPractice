var express = require('express');

var route = express.Router();

var controller = require('../controllers/book.controller.js');
var cookie = require('../cookies/count.cookie.js');

route.get('/', cookie.count, controller.index);

route.get('/:id/delete', cookie.count, controller.delete);

route.get("/add", cookie.count, controller.create);

route.post('/add', cookie.count, controller.postCreate);

module.exports = route;  