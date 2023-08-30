require('dotenv').config();
const { response } = require('express');
const makerApiCall = require('./makerApiCall');
const apiKey = process.env.OPENAI_API_KEY;
const urlBase = process.env.ENDPOINT_BASE;

const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey,
};

class gptService {
    constructor() {
        this.makerApiCall = new makerApiCall();
    }

    async getChat(chatHistorico) {

        try {
            const promptAppend = "\n\nApós esta conversa com o chatbot, o usuário necessita de 5 modelos de aparelhos celulares reais, com as seguintes informações:\nNome (String), Marca (String), Sistema Operacional (String), Tela (Tamanho (Number), Resolução (String) e Tecnologia (String)), Processador (String), Memória (Ram (Number) e Armazenamento (Number) em Giga), Câmera (Quantidade frontal (Number) Megapixel de cada frontal (Number), Quantidade Traseiro (Number) e Megapixel de cada traseira (Number)), Bateria em MaH (Number), Conectividade, Valor em Real (Number), Dimensões em Metros (Altura, Largura, Espessura) (Number), 3dmodel (null)\nMe responda somente com o código json, sendo todos os campos obrigatórios.";

            var promptChat = chatHistorico + promptAppend;
            const messages = [
                {
                    role: 'system',
                    content: promptChat,
                },
            ];

            const requestOptions = {
                messages,
                temperature: 0.7,
                top_p: 0.95,
                frequency_penalty: 0,
                presence_penalty: 0,
                max_tokens: 1600,
                stop: null,
            };

            const responseOpenAI = await this.makerApiCall.makeApiCall(urlBase, requestOptions, headers);

            if (responseOpenAI.status === 200) {
                var json_Celulares = responseOpenAI.data.choices[0].message.content;
                return { texto: JSON.parse(json_Celulares), status: responseOpenAI.status };
            }
            else {
                return { texto: responseOpenAI.data, status: responseOpenAI.status };
            }

        } catch (error) {
            return { texto: error.message };
        }
    }
}

module.exports = new gptService();