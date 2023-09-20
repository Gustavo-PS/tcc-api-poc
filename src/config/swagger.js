const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Especificação do OpenAPI
    info: {
      title: 'TCC - EC10', // Título da sua API
      version: '1.0.0', // Versão da API
      description: 'Canal de Atendimento de lojas eletrônicas com base em Realidade Aumentada e ChatGPT',
    },
  },
  apis: [`${__dirname}/routes.js`], // Caminho para os arquivos que contêm suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
