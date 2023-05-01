const { response } = require('express');
const jwt = require('jsonwebtoken');

class JWTController {

    async login(req, res) {
        const password = req.body.password;
        
        if (password == "poc-tcc-api") {
            const token = jwt.sign({ password }, process.env.JWT_SECRET, {
                expiresIn: 7200 // expires in 2 hours
            });
            return res.status(201).json({ auth: true, token: token });
        }
        else
        return res.status(401).json({ Erro: 'Login não realizado' });       
    }
}

module.exports = new JWTController();