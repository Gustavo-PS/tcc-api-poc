require('dotenv').config();
const { response } = require('express');
const { RequiredError } = require('openai/dist/base');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const model = 'text-davinci-003';
const limiteTexto = "Eu gostaria de saber informações sobre aparelhos celulares.";

class gptService {

    async getChat(perfilReq) {

        try {
            var promptChat = "Eu necessito de um aparelho celular para um perfil " + perfilReq + ", me reponda somente com um array JSON contendo 5 opções com as seguintes específicações de cada um deles, nome do aparelho, marca, tamanho de tela, resolução de tela, dimensões do aparelho, memória ram, armazenamento, processador e câmera";
            const response = await openai.createCompletion({
                model: model,
                prompt: limiteTexto + "\n\nUsuário:" + promptChat,
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0
            });
            
            const inicio = response.data.choices[0].text.indexOf("[");
            const json_string = response.data.choices[0].text.substring(inicio);
            
            return { texto: JSON.parse(json_string), status: response.status, statusText: response.statusText };
        }
        catch (error) {
            return { texto: error.message, status: error.response.status, statusText: error.response.statusText }
        }
    }
}
module.exports = new gptService();