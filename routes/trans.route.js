var express = require('express');

var route = express.Router();

var controller = require('../controllers/trans.controller.js');
var cookie = require('../cookies/count.cookie.js');

route.get('/', cookie.count, controller.index);

route.get("/add", cookie.count, controller.create);

route.post('/add', cookie.count, controller.postCreate);

route.get("/:id/complete", cookie.count, controller.complete);

route.post("/:id/complete", cookie.count, controller.postComplete);

module.exports = route;  