var express = require('express');

var route = express.Router();

var controller = require('../controllers/auth.controller.js');

route.get('/login', controller.login);

route.post('/login', controller.postLogin);

module.exports = route;  