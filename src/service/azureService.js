const { BlobServiceClient, generateBlobSASQueryParameters, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { response } = require("express");
const axios = require('axios');
require('dotenv').config();

async function get3DModel(modelName) {
    try {
        const accountName = process.env.ACCOUNT_NAME;
        const accountKey = process.env.BLOB_KEY;
        const containerName = process.env.CONTAINER_NAME;

        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(modelName);

        const blobExists = await blobClient.exists();

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
        //const response = await axios.head(blobUrl);

        if (!blobExists) {
            var urlDefault = await this.get3DModel('Phone_1x1x1.glb')
            return urlDefault;
        }
        else {
            return blobUrl
        }
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = {
    get3DModel,
};