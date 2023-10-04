const MobilePhone = require('../model/smartphones');
const azureService = require('./azureService')

async function createMobilePhones(jsonData) {
    const mobilePhones = [];
    const roundToFourDecimals = (value) => Number(value.toFixed(4));
    jsonData.forEach(async (jsonData) => {
        const resultGLB = await azureService.get3DModel(jsonData.name.replace(/ /g, '_'));
        const mobilePhone = new MobilePhone({
            name: jsonData.name,
            brand: jsonData.brand,
            operational_system: jsonData.operational_system,
            screen: {
                size: roundToFourDecimals(jsonData.screen.size),
                resolution: jsonData.screen.resolution,
                technology: jsonData.screen.technology,
            },
            processor: jsonData.processor,
            memory: {
                ram: jsonData.memory.ram,
                storage: jsonData.memory.storage,
            },
            camera: {
                front_amount: jsonData.camera.front_amount,
                front_megapixel: jsonData.camera.front_megapixel,
                rear_amount: jsonData.camera.rear_amount,
                rear_megapixel: jsonData.camera.rear_megapixel,
            },
            battery: jsonData.battery,
            connectivity: jsonData.connectivity,
            value: jsonData.value,
            dimensions: {
                height: roundToFourDecimals(jsonData.dimensions.height > 1 ? jsonData.dimensions.height / 100 : jsonData.dimensions.height),
                width: jroundToFourDecimals(sonData.dimensions.width > 1 ? jsonData.dimensions.width / 100 : jsonData.dimensions.width),
                thickness: roundToFourDecimals(jsonData.dimensions.thickness > 1 ? jsonData.dimensions.thickness / 100 : jsonData.dimensions.thickness),
            },
            _3dmodel: modelUrl
        });

        mobilePhones.push(mobilePhone);
    });

    return mobilePhones;
}

module.exports = {
    createMobilePhones,
};