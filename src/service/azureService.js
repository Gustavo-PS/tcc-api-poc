const { BlobServiceClient, generateBlobSASQueryParameters, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { response } = require("express");
require('dotenv').config();


class azureService {

    async get3DModel(modelName) {
        try {
            const accountName = process.env.ACCOUNT_NAME;
            const accountKey = process.env.BLOB_KEY;
            const containerName = process.env.CONTAINER_NAME;

            const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
            const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobClient = containerClient.getBlobClient(modelName);

            // Define as permissões e a duração de validade do SAS
            const permissions = "r"; // r = Leitura
            const expiryTime = new Date();
            expiryTime.setMinutes(expiryTime.getMinutes() + 2); // Define a validade do SAS para 2 minutosf

            // Gera o token SAS
            const sasToken = generateBlobSASQueryParameters({
                containerName,
                modelName,
                permissions,
                expiresOn: expiryTime,
            }, sharedKeyCredential).toString();

            // Gera a URL assinada
            const blobUrl = blobClient.url + "?" + sasToken;
            const response = await fetch(blobUrl, { method: "HEAD" });

            if (response.ok)
                return { urlArquivo: blobUrl, status: response.status };
            else {
                const errorData = { message: "A resposta não foi bem-sucedida.", status: response.status}
                throw new Error(JSON.stringify(errorData));
            }
        }
        catch (error) {
            error = JSON.parse(error.message);
            return { texto: error.message, status: error.status }
        }
    }

}
module.exports = new azureService();