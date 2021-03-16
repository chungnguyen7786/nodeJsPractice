var express = require('express');

var route = express.Router();

var controller = require('../controllers/trans.controller.js')

route.get('/', controller.index);

route.get("/add", controller.create);

route.post('/add', controller.postCreate);

module.exports = route;  