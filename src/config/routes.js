const jwtController = require('../controller/jwtController');
const gptController = require('../controller/gptController');
const azureController = require('../controller/azureController');
const express = require('express');
const route = express.Router();

//Tags Swagger
/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Operações relacionadas a autenticação
 *   - name: ChatGPT
 *     description: Operações de armazenamento em blob do Azure
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Autenticação do usuário
 *     description: Rota para autenticar um usuário e obter um token JWT.
 *     tags:
 *       - Autenticação 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               auth: true
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               Erro: "Login não realizado"
 */
route.post('/api/v1/login', jwtController.login);

/**
 * @swagger
 * /api/v1/chat:
 *   post:
 *     summary: Solicitar modelos para o ChatGPT
 *     description: Rota para obter 5 modelos de celulares com base em um questionário com o ChatGPT
 *     tags:
 *       - ChatGPT 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               strChat:
 *                 type: string
 *                 description: Mensagem para o chat.
 *               arrayCelulares:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array de celulares.
 *     headers:
 *       Content-Type:
 *         description: Tipo de conteúdo da solicitação.
 *         schema:
 *           type: string
 *           example: application/json
 *       access-token:
 *         description: Token de acesso.
 *         schema:
 *           type: string
 *           example: {{token-tcc-local}}
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               chatResponse:
 *                 - name: "iPhone 12"
 *                   brand: "Apple"
 *                   operational_system: "iOS"
 *                   screen:
 *                     size: 6.1
 *                     resolution: "1170 x 2532 pixels"
 *                     technology: "Super Retina XDR OLED"
 *                   processor: "Apple A14 Bionic"
 *                   memory:
 *                     ram: 4
 *                     storage: 64
 *                   camera:
 *                     front_amount: 1
 *                     front_megapixel: 12
 *                     rear_amount: 2
 *                     rear_megapixel:
 *                       - 12
 *                       - 12
 *                   battery: 2815
 *                   connectivity:
 *                     - "Wi-Fi"
 *                     - "Bluetooth"
 *                     - "NFC"
 *                   value: 4999
 *                   dimensions:
 *                     height: 0.1467
 *                     width: 0.0714
 *                     thickness: 0.0074
 *                   3dmodel: null
 *                 - name: "Samsung Galaxy S21"
 *                   brand: "Samsung"
 *                   operational_system: "Android"
 *                   screen:
 *                     size: 6.2
 *                     resolution: "1080 x 2400 pixels"
 *                     technology: "Dynamic AMOLED 2X"
 *                   processor: "Exynos 2100"
 *                   memory:
 *                     ram: 8
 *                     storage: 128
 *                   camera:
 *                     front_amount: 1
 *                     front_megapixel: 10
 *                     rear_amount: 3
 *                     rear_megapixel:
 *                       - 12
 *                       - 12
 *                       - 64
 *                   battery: 4000
 *                   connectivity:
 *                     - "Wi-Fi"
 *                     - "Bluetooth"
 *                     - "NFC"
 *                   value: 4999
 *                   dimensions:
 *                     height: 0.1517
 *                     width: 0.0712
 *                     thickness: 0.0079
 *                   3dmodel: null
 *                 # Adicione os outros modelos aqui
 *       429:
 *         description: Too Many Requests
 *         content:
 *           application/json:
 *             example:
 *               errorMessage:
 *                 error:
 *                   code: "429"
 *                   message: "Requests to the ChatCompletions_Create Operation under Azure OpenAI API version 2023-07-01-preview have exceeded token rate limit of your current OpenAI S0 pricing tier. Please retry after 18 seconds. Please go here: https://aka.ms/oai/quotaincrease if you would like to further increase the default rate limit."
 */
route.post('/api/v1/chat', gptController.getChat);

/**
 * @swagger
 * /api/v1/chatDistinto:
 *   post:
 *     summary: Solicitar modelos para o ChatGPT
 *     description: Rota para obter 5 modelos de celulares distintos do endpoint Chat com base em um questionário com o ChatGPT
 *     tags:
 *       - ChatGPT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               strChat:
 *                 type: string
 *                 description: Mensagem para o chat.
 *               arrayCelulares:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array de celulares.
 *     headers:
 *       Content-Type:
 *         description: Tipo de conteúdo da solicitação.
 *         schema:
 *           type: string
 *           example: application/json
 *       access-token:
 *         description: Token de acesso.
 *         schema:
 *           type: string
 *           example: {{token-tcc-local}}
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               chatResponse:
 *                 - name: "iPhone 12"
 *                   brand: "Apple"
 *                   operational_system: "iOS"
 *                   screen:
 *                     size: 6.1
 *                     resolution: "1170 x 2532 pixels"
 *                     technology: "Super Retina XDR OLED"
 *                   processor: "Apple A14 Bionic"
 *                   memory:
 *                     ram: 4
 *                     storage: 64
 *                   camera:
 *                     front_amount: 1
 *                     front_megapixel: 12
 *                     rear_amount: 2
 *                     rear_megapixel:
 *                       - 12
 *                       - 12
 *                   battery: 2815
 *                   connectivity:
 *                     - "Wi-Fi"
 *                     - "Bluetooth"
 *                     - "NFC"
 *                   value: 4999
 *                   dimensions:
 *                     height: 0.1467
 *                     width: 0.0714
 *                     thickness: 0.0074
 *                   3dmodel: null
 *                 - name: "Samsung Galaxy S21"
 *                   brand: "Samsung"
 *                   operational_system: "Android"
 *                   screen:
 *                     size: 6.2
 *                     resolution: "1080 x 2400 pixels"
 *                     technology: "Dynamic AMOLED 2X"
 *                   processor: "Exynos 2100"
 *                   memory:
 *                     ram: 8
 *                     storage: 128
 *                   camera:
 *                     front_amount: 1
 *                     front_megapixel: 10
 *                     rear_amount: 3
 *                     rear_megapixel:
 *                       - 12
 *                       - 12
 *                       - 64
 *                   battery: 4000
 *                   connectivity:
 *                     - "Wi-Fi"
 *                     - "Bluetooth"
 *                     - "NFC"
 *                   value: 4999
 *                   dimensions:
 *                     height: 0.1517
 *                     width: 0.0712
 *                     thickness: 0.0079
 *                   3dmodel: null
 *                 # Adicione os outros modelos aqui
 *       429:
 *         description: Too Many Requests
 *         content:
 *           application/json:
 *             example:
 *               errorMessage:
 *                 error:
 *                   code: "429"
 *                   message: "Requests to the ChatCompletions_Create Operation under Azure OpenAI API version 2023-07-01-preview have exceeded token rate limit of your current OpenAI S0 pricing tier. Please retry after 18 seconds. Please go here: https://aka.ms/oai/quotaincrease if you would like to further increase the default rate limit."
 */
route.post('/api/v1/chatdistinto', gptController.getChatDistinto);

// /**
//  * @swagger
//  * /api/v1/azure/storageblob:
//  *   post:
//  *     summary: Enviar modelo 3D para armazenamento em blob
//  *     description: Rota para enviar um modelo 3D para armazenamento em blob do Azure.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               modelName:
//  *                 type: string
//  *                 description: Nome do modelo 3D.
//  *     headers:
//  *       Content-Type:
//  *         description: Tipo de conteúdo da solicitação.
//  *         schema:
//  *           type: string
//  *           example: application/json
//  *       access-token:
//  *         description: Token de acesso.
//  *         schema:
//  *           type: string
//  *           example: {{token-tcc-local}}
//  *     responses:
//  *       200:
//  *         description: Resposta bem-sucedida
//  *         content:
//  *           application/json:
//  *             example:
//  *               perfil: "Phone"
//  *       401:
//  *         description: Falha na autenticação
//  *         content:
//  *           application/json:
//  *             example:
//  *               Erro: "Login não realizado"
//  */
route.post('/api/v1/azure/storageblob', azureController.get3DModel);

module.exports = route;