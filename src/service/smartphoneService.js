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
            const modelUrl = resultGLB.urlArquivo;
            var height, width, thickness;

            if (jsonDataItem.dimensions.height >= 100)
                height = jsonDataItem.dimensions.height / 1000;
            else if (jsonDataItem.dimensions.height >= 1)
                height = jsonDataItem.dimensions.height / 100;
            else
                height = json.dimensions.height;

            if (jsonDataItem.dimensions.width >= 15)
                width = jsonDataItem.dimensions.width / 1000;
            else if (jsonDataItem.dimensions.width >= 1)
                width = jsonDataItem.dimensions.width / 100;
            else
                width = json.dimensions.width;

            if (jsonDataItem.dimensions.thickness >= 1.5)
                thickness = jsonDataItem.dimensions.thickness / 1000;
            else if (jsonDataItem.dimensions.thickness >=0.1)
                thickness = jsonDataItem.dimensions.thickness / 100;
            else
                thickness = json.dimensions.thickness;


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
                    height: roundToFourDecimals(height),
                    width: roundToFourDecimals(width),
                    thickness: roundToFourDecimals(thickness),
                },
                _3dmodel: modelUrl,
            });

            mobilePhones.push(mobilePhone);
        }
        return mobilePhones;
    }
}

module.exports = MobilePhoneService;
