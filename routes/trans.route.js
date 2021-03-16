var express = require('express');

var route = express.Router();

var controller = require('../controllers/trans.controller.js')

route.get('/', controller.index);

route.get("/add", controller.create);

route.post('/add', controller.postCreate);

route.get("/:id/complete", controller.complete);

route.post("/:id/complete", controller.postComplete);

module.exports = route;  