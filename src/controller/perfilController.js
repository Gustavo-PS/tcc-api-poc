const service = require('../service/perfilService');
const jwtValidate = require('../config/jwt');
require('dotenv').config();


class perfilController {

    async postPerfil(req, res) {
        const { respostas } = req.body;
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200)
            return;

        else {
            const perfilMapeado = await service.postPerfil(respostas);

            if (perfilMapeado.status === 200)
                return res.status(perfilMapeado.status).json({ perfil: perfilMapeado.perfilMapeado });
            else
                return res.status(perfilMapeado.status).json({ statusText: perfilMapeado.texto })
        }
    }
}
module.exports = new perfilController();

