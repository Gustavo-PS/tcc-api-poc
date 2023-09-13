const jwtController = require('../controller/jwtController');
const gptController = require('../controller/gptController');
const azureController = require('../controller/azureController');
const express = require('express');
const route = express.Router();

//Rota de JWT
route.post('/api/v1/login', jwtController.login);

//Rota API-GPT
route.post('/api/v1/chat', gptController.getChat);

//Rota API-GPT-CELULARES-DISTINTO
route.post('/api/v1/chatDistinto', gptController.getChat);

//Rota Storage Blob
route.post('/api/v1/azure/storageblob', azureController.get3DModel);

module.exports = route;