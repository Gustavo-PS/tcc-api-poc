const axios = require('axios');

class makerApiCall {
    async makeApiCall(url, data, headers) {
        try {
            const response = await axios.post(url, data, { headers });
            return {
                status: response.status,
                data: response.data,
            };
        } catch (error) {
            if (error.response) {
                return {
                    status: error.response.status,
                    data: error.response.data,
                };
            }
            console.error('Error making API call:', error.message);
            throw error;
        }
    }

    async head(url) {
        try {
            const response = await axios.head(url);
            return {
                status: response.status,
                headers: response.headers,
            };
        } catch (error) {
            console.error('Erro na solicitação HEAD:', error.message);
            throw error;
        }
    }
    
}

module.exports = makerApiCall;
