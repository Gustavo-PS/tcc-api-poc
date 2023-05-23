require('dotenv').config();
const { response } = require('express');

function mapearPerfil(respostas) {
   
    const perfilKey = respostas.join('_');
    
    if (perfilKey.includes('1_1') || perfilKey.includes('2_2')) {
        perfil = 'iniciante';
    } else if (perfilKey.includes('3_3') || perfilKey.includes('4_4')) {
        perfil = 'avançado';
    } else {
        perfil = 'intermediário';
    }
    return perfil;
}

class perfilService {

    async postPerfil(respostas) {

        if (!respostas || !Array.isArray(respostas)) {
            return { texto: 'Respostas inválidas.', status: 400 };
        }

        const perfil = mapearPerfil(respostas);

        if (!perfil) {
            return { texto: 'Respostas inválidas.', status: 400 };
        }

        return { perfilMapeado: perfil, status: 200 };
    }
}
module.exports = new perfilService();