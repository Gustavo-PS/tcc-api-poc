class OuputError {
    constructor(status, error, message) {
        this.status = status;
        this.error = error;
        this.message = message;
    };
}

module.exports = OuputError;