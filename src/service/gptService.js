require('dotenv').config();
const makerApiCall = require('./makerApiCall');
const googleService = require('./googleService');
const smartphoneService = require('./smartphoneService');
const apiKey = process.env.OPENAI_API_KEY;
const urlBase = process.env.ENDPOINT_BASE;

const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey,
};

class gptService {
    
    constructor() {
        this.makerApiCall = new makerApiCall();
        this.googleService = new googleService();
    }

    async getChat(chatHistorico) {

        try {
            const promptAppend = "\n\nAfter this conversation with the chatbot, the user needs 5 models of real cell phones, with the following information:\nName (String), Brand (String), Operating System (String), Screen (Size (Number), Resolution (String) and Technology (String)), Processor (String), Memory (Ram (Number) and Storage (Number) in Giga), Camera (Quantity front (Number) Megapixel of each front (Number), Quantity Rear (Number) and Megapixel of each rear (Number)), Battery in MaH (Number), Connectivity, Price in Brazilian Real (Number), Dimensions in Meters (Height, Width, Thickness) (Number), 3dmodel (null)\nAnswer me only with the json code based on the template provided below, all fields being mandatory.\nJSON template\n\"{\r\n\"type\": \"array\",\r\n\"items\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"name\": {\r\n\"type\": \"string\"\r\n},\r\n\"brand\": {\r\n\"type\": \"string\"\r\n},\r\n\"operational_system\": {\r\n\"type\": \"string\"\r\n},\r\n\"screen\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"size\": {\r\n\"type\": \"number\"\r\n},\r\n\"resolution\": {\r\n\"type\": \"string\"\r\n},\r\n\"technology\": {\r\n\"type\": \"string\"\r\n}\r\n},\r\n\"required\": [\r\n\"size\",\r\n\"resolution\",\r\n\"technology\"\r\n]\r\n},\r\n\"processor\": {\r\n\"type\": \"string\"\r\n},\r\n\"memory\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"ram\": {\r\n\"type\": \"number\"\r\n},\r\n\"storage\": {\r\n\"type\": \"number\"\r\n}\r\n},\r\n\"required\": [\r\n\"ram\",\r\n\"storage\"\r\n]\r\n},\r\n\"camera\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"front_amount\": {\r\n\"type\": \"number\"\r\n},\r\n\"front_megapixel\": {\r\n\"type\": \"number\"\r\n},\r\n\"rear_amount\": {\r\n\"type\": \"number\"\r\n},\r\n\"rear_megapixel\": {\r\n\"type\": \"array\",\r\n\"items\": {\r\n\"type\": \"number\"\r\n}\r\n}\r\n},\r\n\"required\": [\r\n\"front_amount\",\r\n\"front_megapixel\",\r\n\"rear_amount\",\r\n\"rear_megapixel\"\r\n]\r\n},\r\n\"battery\": {\r\n\"type\": \"number\"\r\n},\r\n\"connectivity\": {\r\n\"type\": \"array\",\r\n\"items\": {\r\n\"type\": \"string\"\r\n}\r\n},\r\n\"value\": {\r\n\"type\": \"number\"\r\n},\r\n\"dimensions\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"height\": {\r\n\"type\": \"number\"\r\n},\r\n\"width\": {\r\n\"type\": \"number\"\r\n},\r\n\"thickness\": {\r\n\"type\": \"number\"\r\n}\r\n},\r\n\"required\": [\r\n\"height\",\r\n\"width\",\r\n\"thickness\"\r\n]\r\n},\r\n\"3dmodel\": null\r\n},\r\n\"required\": [\r\n\"name\",\r\n\"brand\",\r\n\"operational_system\",\r\n\"screen\",\r\n\"processor\",\r\n\"memory\",\r\n\"camera\",\r\n\"battery\",\r\n\"connectivity\",\r\n\"value\",\r\n\"dimensions\",\r\n\"3dmodel\"\r\n]\r\n}\r\n}";

            const promptTraduzido = await this.googleService.traduzirTexto(chatHistorico);
            var promptChat = promptTraduzido + promptAppend;

            const messages = [
                {
                    role: 'system',
                    content: promptChat,
                },
            ];

            const requestOptions = {
                messages,
                temperature: 0.1,
                top_p: 0.95,
                frequency_penalty: 0,
                presence_penalty: 0,
                max_tokens: 1600,
                stop: null,
            };

            const responseOpenAI = await this.makerApiCall.makeApiCall(urlBase, requestOptions, headers);
            // const jsonDataJson = [
            //     {
            //         name: "iPhone 12",
            //         brand: "Apple",
            //         operational_system: "iOS",
            //         screen: {
            //             size: 6.1,
            //             resolution: "1170 x 2532 pixels",
            //             technology: "Super Retina XDR OLED",
            //         },
            //         processor: "Apple A14 Bionic",
            //         memory: {
            //             ram: 4,
            //             storage: 64,
            //         },
            //         camera: {
            //             front_amount: 1,
            //             front_megapixel: 12,
            //             rear_amount: 2,
            //             rear_megapixel: [
            //                 12,
            //                 12,
            //             ],
            //         },
            //         battery: 2815,
            //         connectivity: [
            //             "Wi-Fi",
            //             "Bluetooth",
            //             "NFC",
            //         ],
            //         value: 4999,
            //         dimensions: {
            //             height: 14.67,
            //             width: 7.14,
            //             thickness: 0.74,
            //         },
            //         "3dmodel": null,
            //     },
            //     {
            //         name: "Samsung Galaxy S21",
            //         brand: "Samsung",
            //         operational_system: "Android",
            //         screen: {
            //             size: 6.2,
            //             resolution: "1080 x 2400 pixels",
            //             technology: "Dynamic AMOLED 2X",
            //         },
            //         processor: "Exynos 2100",
            //         memory: {
            //             ram: 8,
            //             storage: 128,
            //         },
            //         camera: {
            //             front_amount: 1,
            //             front_megapixel: 10,
            //             rear_amount: 3,
            //             rear_megapixel: [
            //                 12,
            //                 12,
            //                 64,
            //             ],
            //         },
            //         battery: 4000,
            //         connectivity: [
            //             "Wi-Fi",
            //             "Bluetooth",
            //             "NFC",
            //         ],
            //         value: 4999,
            //         dimensions: {
            //             height: 0.1517,
            //             width: 0.0712,
            //             thickness: 0.0079,
            //         },
            //         "3dmodel": null,
            //     },
            //     {
            //         name: "Google Pixel 5",
            //         brand: "Google",
            //         operational_system: "Android",
            //         screen: {
            //             size: 6,
            //             resolution: "1080 x 2340 pixels",
            //             technology: "OLED",
            //         },
            //         processor: "Qualcomm Snapdragon 765G",
            //         memory: {
            //             ram: 8,
            //             storage: 128,
            //         },
            //         camera: {
            //             front_amount: 1,
            //             front_megapixel: 8,
            //             rear_amount: 2,
            //             rear_megapixel: [
            //                 12.2,
            //                 16,
            //             ],
            //         },
            //         battery: 4080,
            //         connectivity: [
            //             "Wi-Fi",
            //             "Bluetooth",
            //             "NFC",
            //         ],
            //         value: 4999,
            //         dimensions: {
            //             height: 0.1447,
            //             width: 0.0704,
            //             thickness: 0.008,
            //         },
            //         "3dmodel": null,
            //     },
            //     {
            //         name: "OnePlus 9",
            //         brand: "OnePlus",
            //         operational_system: "Android",
            //         screen: {
            //             size: 6.55,
            //             resolution: "1080 x 2400 pixels",
            //             technology: "Fluid AMOLED",
            //         },
            //         processor: "Qualcomm Snapdragon 888",
            //         memory: {
            //             ram: 8,
            //             storage: 128,
            //         },
            //         camera: {
            //             front_amount: 1,
            //             front_megapixel: 16,
            //             rear_amount: 3,
            //             rear_megapixel: [
            //                 48,
            //                 50,
            //                 2,
            //             ],
            //         },
            //         battery: 4500,
            //         connectivity: [
            //             "Wi-Fi",
            //             "Bluetooth",
            //             "NFC",
            //         ],
            //         value: 4999,
            //         dimensions: {
            //             height: 16.01,
            //             width: 7.39,
            //             thickness: 0.88,
            //         },
            //         "3dmodel": null,
            //     },
            //     {
            //         name: "Xiaomi Mi 11",
            //         brand: "Xiaomi",
            //         operational_system: "Android",
            //         screen: {
            //             size: 6.81,
            //             resolution: "1440 x 3200 pixels",
            //             technology: "AMOLED",
            //         },
            //         processor: "Qualcomm Snapdragon 888",
            //         memory: {
            //             ram: 8,
            //             storage: 128,
            //         },
            //         camera: {
            //             front_amount: 1,
            //             front_megapixel: 20,
            //             rear_amount: 3,
            //             rear_megapixel: [
            //                 108,
            //                 13,
            //                 5,
            //             ],
            //         },
            //         battery: 4600,
            //         connectivity: [
            //             "Wi-Fi",
            //             "Bluetooth",
            //             "NFC",
            //         ],
            //         value: 4999,
            //         dimensions: {
            //             height: 0.1643,
            //             width: 0.0746,
            //             thickness: 0.0084,
            //         },
            //         "3dmodel": null,
            //     },
            // ]
            //var jsonArrayReturnawait = smartphoneService.createMobilePhones(jsonDataJson);
            if (responseOpenAI.status === 200) {
                var json_Celulares = responseOpenAI.data.choices[0].message.content;
                var jsonArrayReturnawait = smartphoneService.createMobilePhones(JSON.parse(json_Celulares));
                return { texto: JSON.parse(jsonArrayReturnawait), status: responseOpenAI.status, usage: responseOpenAI.data.usage };
            }
            else {
                return { texto: responseOpenAI.data, status: responseOpenAI.status };
            }

        } catch (error) {
            return { texto: error.message };
        }
    }

    async getChatDistinto(chatHistorico, arrayCelulares) {

        try {
            const promptAppend = "\n\nAfter this conversation with the chatbot, the user needs 5 models of real cell phones, with the following information:\nName (String), Brand (String), Operating System (String), Screen (Size (Number), Resolution (String) and Technology (String)), Processor (String), Memory (Ram (Number) and Storage (Number) in Giga), Camera (Quantity front (Number) Megapixel of each front (Number), Quantity Rear (Number) and Megapixel of each rear (Number)), Battery in MaH (Number), Connectivity, Price in Brazilian Real (Number), Dimensions in Meters (Height, Width, Thickness) (Number), 3dmodel (null)\nAnswer me only with the json code based on the template provided below, all fields being mandatory.\nJSON template\n\"{\r\n\"type\": \"array\",\r\n\"items\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"name\": {\r\n\"type\": \"string\"\r\n},\r\n\"brand\": {\r\n\"type\": \"string\"\r\n},\r\n\"operational_system\": {\r\n\"type\": \"string\"\r\n},\r\n\"screen\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"size\": {\r\n\"type\": \"number\"\r\n},\r\n\"resolution\": {\r\n\"type\": \"string\"\r\n},\r\n\"technology\": {\r\n\"type\": \"string\"\r\n}\r\n},\r\n\"required\": [\r\n\"size\",\r\n\"resolution\",\r\n\"technology\"\r\n]\r\n},\r\n\"processor\": {\r\n\"type\": \"string\"\r\n},\r\n\"memory\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"ram\": {\r\n\"type\": \"number\"\r\n},\r\n\"storage\": {\r\n\"type\": \"number\"\r\n}\r\n},\r\n\"required\": [\r\n\"ram\",\r\n\"storage\"\r\n]\r\n},\r\n\"camera\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"front_amount\": {\r\n\"type\": \"number\"\r\n},\r\n\"front_megapixel\": {\r\n\"type\": \"number\"\r\n},\r\n\"rear_amount\": {\r\n\"type\": \"number\"\r\n},\r\n\"rear_megapixel\": {\r\n\"type\": \"array\",\r\n\"items\": {\r\n\"type\": \"number\"\r\n}\r\n}\r\n},\r\n\"required\": [\r\n\"front_amount\",\r\n\"front_megapixel\",\r\n\"rear_amount\",\r\n\"rear_megapixel\"\r\n]\r\n},\r\n\"battery\": {\r\n\"type\": \"number\"\r\n},\r\n\"connectivity\": {\r\n\"type\": \"array\",\r\n\"items\": {\r\n\"type\": \"string\"\r\n}\r\n},\r\n\"value\": {\r\n\"type\": \"number\"\r\n},\r\n\"dimensions\": {\r\n\"type\": \"object\",\r\n\"properties\": {\r\n\"height\": {\r\n\"type\": \"number\"\r\n},\r\n\"width\": {\r\n\"type\": \"number\"\r\n},\r\n\"thickness\": {\r\n\"type\": \"number\"\r\n}\r\n},\r\n\"required\": [\r\n\"height\",\r\n\"width\",\r\n\"thickness\"\r\n]\r\n},\r\n\"3dmodel\": null\r\n},\r\n\"required\": [\r\n\"name\",\r\n\"brand\",\r\n\"operational_system\",\r\n\"screen\",\r\n\"processor\",\r\n\"memory\",\r\n\"camera\",\r\n\"battery\",\r\n\"connectivity\",\r\n\"value\",\r\n\"dimensions\",\r\n\"3dmodel\"\r\n]\r\n}\r\n}\r\nIt is worth mentioning that the chosen models cannot be: ";

            const promptTraduzido = await this.googleService.traduzirTexto(chatHistorico);
            var promptChat = promptTraduzido + promptAppend + arrayCelulares.join(', ');;

            const messages = [
                {
                    role: 'system',
                    content: promptChat,
                },
            ];

            const requestOptions = {
                messages,
                temperature: 0.1,
                top_p: 0.95,
                frequency_penalty: 0,
                presence_penalty: 0,
                max_tokens: 1600,
                stop: null,
            };

            const responseOpenAIDistinto = await this.makerApiCall.makeApiCall(urlBase, requestOptions, headers);

            if (responseOpenAIDistinto.status === 200) {
                var json_Celulares = responseOpenAIDistinto.data.choices[0].message.content;
                var jsonArrayReturnawait = smartphoneService.createMobilePhones(json_Celulares);
                return { texto: JSON.parse(json_Celulares), status: responseOpenAIDistinto.status, usage: responseOpenAIDistinto.data.usage };
            }
            else {
                return { texto: responseOpenAIDistinto.data, status: responseOpenAIDistinto.status };
            }

        } catch (error) {
            return { texto: error.message };
        }
    }
}

module.exports = new gptService();