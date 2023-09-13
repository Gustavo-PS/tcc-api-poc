const service = require('../service/gptService');
const jwtValidate = require('../config/jwt')
require('dotenv').config();


class gptController {

    async getChat(req, res) {
        const chatHistorico = req.body.strChat;
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200)
            return;

        else {
            const respostaChat = await service.getChat(chatHistorico);
            if (respostaChat.status === 200)
                return res.status(respostaChat.status).json({ chatResponse: respostaChat.texto, usage: respostaChat.usage });
            else
                return res.status(respostaChat.status).json({errorMessage: respostaChat.texto })

        }
    }

    async getChatDistinto(req, res) {
        const chatHistorico = req.body.strChat;
        const distincaoArray = req.body.arrayCelulares;
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200)
            return;

        else {
            const respostaChat = await service.getChat(chatHistorico);
            if (respostaChat.status === 200)
                return res.status(respostaChat.status).json({ chatResponse: respostaChat.texto, usage: respostaChat.usage });
            else
                return res.status(respostaChat.status).json({errorMessage: respostaChat.texto })

        }
    }
}
module.exports = new gptController();

