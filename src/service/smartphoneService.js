const MobilePhone = require('../model/smartphones');
const AzureService = require('./azureService');

class MobilePhoneService {
    constructor() {
        this.azureService = new AzureService();
    }

    async createMobilePhones(jsonData) {
        const mobilePhones = [];
        const roundToFourDecimals = (value) => Number(value.toFixed(4));

        for (const jsonDataItem of jsonData) {
            var modelName = jsonDataItem.name.replace(/ /g, '_');
            modelName += '.glb';
            const resultGLB = await this.azureService.get3DModel(modelName);
            const modelUrl = resultGLB; // Certifique-se de obter a URL do resultado GLB corretamente.

            const mobilePhone = new MobilePhone({
                name: jsonDataItem.name,
                brand: jsonDataItem.brand,
                operational_system: jsonDataItem.operational_system,
                screen: {
                    size: roundToFourDecimals(jsonDataItem.screen.size),
                    resolution: jsonDataItem.screen.resolution,
                    technology: jsonDataItem.screen.technology,
                },
                processor: jsonDataItem.processor,
                memory: {
                    ram: jsonDataItem.memory.ram,
                    storage: jsonDataItem.memory.storage,
                },
                camera: {
                    front_amount: jsonDataItem.camera.front_amount,
                    front_megapixel: jsonDataItem.camera.front_megapixel,
                    rear_amount: jsonDataItem.camera.rear_amount,
                    rear_megapixel: jsonDataItem.camera.rear_megapixel,
                },
                battery: jsonDataItem.battery,
                connectivity: jsonDataItem.connectivity,
                value: jsonDataItem.value,
                dimensions: {
                    height: roundToFourDecimals(jsonDataItem.dimensions.height > 1 ? jsonDataItem.dimensions.height / 100 : jsonDataItem.dimensions.height),
                    width: roundToFourDecimals(jsonDataItem.dimensions.width > 1 ? jsonDataItem.dimensions.width / 100 : jsonDataItem.dimensions.width),
                    thickness: roundToFourDecimals(jsonDataItem.dimensions.thickness > 1 ? jsonDataItem.dimensions.thickness / 100 : jsonDataItem.dimensions.thickness),
                },
                _3dmodel: modelUrl,
            });

            mobilePhones.push(mobilePhone);
        }
        return mobilePhones;
    }
}

module.exports = MobilePhoneService;
