const jwtController = require('../controller/jwtController');
const gptController = require('../controller/gptController');

const express = require('express');
const route = express.Router();

//Rota de JWT
route.post('/api/v1/login', jwtController.login);

//Rota API-GPT
route.post('/api/v1/chat', gptController.getChat);

module.exports = route;