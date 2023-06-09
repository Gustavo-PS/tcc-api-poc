const jwtController = require('../controller/jwtController');
const gptController = require('../controller/gptController');
const perfilController = require('../controller/perfilController');
const azureController = require('../controller/azureController');
const express = require('express');
const route = express.Router();

//Rota de JWT
route.post('/api/v1/login', jwtController.login);

//Rota API-GPT
route.post('/api/v1/chat', gptController.getChat);

//Rota Mapeamento Perfil
route.post('/api/v1/mapeamento-perfil', perfilController.postPerfil);

//Rota Storage Blob
route.post('/api/v1/azure/storageblob', azureController.get3DModel);

module.exports = route;