const service = require('../service/azureService');
const jwtValidate = require('../config/jwt')
require('dotenv').config();


class azureController {

    async get3DModel(req, res) {

        const modelName = req.body.modelName;
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200)
            return;
        else if (modelName == null)
        return res.status(500).json({ message: "Arquivo não informado" });
        else {
            const repostaAzure = await service.get3DModel(modelName);
            if (repostaAzure.status === 200)
                return res.status(repostaAzure.status).json({ urlArquivo: repostaAzure.urlArquivo });
            else
                return res.status(repostaAzure.status).json({ errorMessage: repostaAzure.texto })

        }
    }
}
module.exports = new azureController();