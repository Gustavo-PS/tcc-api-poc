const service = require('../service/gptService');
const jwtValidate = require('../config/jwt')
require('dotenv').config();


class gptController {

    async getChat(req, res) {
        const perfilReq = req.body.perfil;
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200)
            return;

        else {
            const respostaChat = await service.getChat(perfilReq);
            if (respostaChat.status === 200)
                return res.status(respostaChat.status).json({ statusText: respostaChat.statusText, chatResponse: respostaChat.texto });
            else
                return res.status(respostaChat.status).json({ statusText: respostaChat.statusText, errorMessage: respostaChat.texto })

        }
    }
}
module.exports = new gptController();

