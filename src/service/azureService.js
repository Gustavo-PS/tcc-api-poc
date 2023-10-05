const { BlobServiceClient, generateBlobSASQueryParameters, StorageSharedKeyCredential } = require("@azure/storage-blob");
const MakerApiCall = require('./makerApiCall');
require('dotenv').config();

class AzureService {
    constructor() {
        this.accountName = process.env.ACCOUNT_NAME;
        this.accountKey = process.env.BLOB_KEY;
        this.containerName = process.env.CONTAINER_NAME;
        this.makerApi = new MakerApiCall();
    }

    async get3DModel(modelName) {
        try {
            const sharedKeyCredential = new StorageSharedKeyCredential(this.accountName, this.accountKey);
            const blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net`, sharedKeyCredential);
            const containerClient = blobServiceClient.getContainerClient(this.containerName);
            const blobClient = containerClient.getBlobClient(modelName);

            const blobExists = await blobClient.exists();

            if (!blobExists) {
                var urlDefault = await this.get3DModel('Phone_1x1x1.glb');
                return urlDefault
            }

            else {

                // Define as permissões e a duração de validade do SAS
                const permissions = "r"; // r = Leitura
                const expiryTime = new Date();
                expiryTime.setMinutes(expiryTime.getMinutes() + 2); // Define a validade do SAS para 2 minutosf

                // Gera o token SAS
                const sasToken = generateBlobSASQueryParameters({
                    containerName: this.containerName,
                    blobName: modelName,
                    permissions,
                    expiresOn: expiryTime,
                }, sharedKeyCredential).toString();

                // Gera a URL assinada
                const blobUrl = blobClient.url + "?" + sasToken;
                const headResponse = await this.makerApi.head(blobUrl);

                if (headResponse.status === 200) {
                    return blobUrl
                } else {
                    throw new Error("Erro ao obter URL do arquivo")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AzureService;
