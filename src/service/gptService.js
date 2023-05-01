require('dotenv').config();
const { response } = require('express');
const { RequiredError } = require('openai/dist/base');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const model = 'text-davinci-003';
const limiteTexto = "Eu gostaria de saber informações sobre aparelhos eletrônicos."

class gptService {

    async getChat(promptReq) {

        try {
            const response = await openai.createCompletion({
                model: model,
                prompt: limiteTexto + "\n\nUsuário:" + promptReq,
                temperature: 0,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
                stop: "."
            });
            return { texto: response.data.choices[0].text, status: response.status, statusText: response.statusText };
        }
        catch (error) {
            return { texto: error.message, status: error.response.status, statusText: error.response.statusText }
        }
    }
}
module.exports = new gptService();