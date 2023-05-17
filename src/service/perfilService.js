require('dotenv').config();
const { response } = require('express');

const graphlib = require('graphlib');
const graph = new graphlib.Graph({ directed: true });


function criarGrafo() {
    graph.setNode(0, { pergunta: 'Quanto tempo gasta utilizando o aparelho?' });
    graph.setNode(1, { resposta: 'Uma hora' });
    graph.setNode(2, { resposta: 'Duas horas' });
    graph.setNode(3, { resposta: 'Cinco horas' });
    graph.setNode(4, { resposta: 'Sim' });
    graph.setNode(5, { resposta: 'Não' });
    graph.setNode(6, { resposta: 'Indiferente' });
    graph.setNode(7, { resposta: 'Redes sociais' });
    graph.setNode(8, { resposta: 'Jogos' });
    graph.setNode(9, { resposta: 'Trabalho corporativo' });

    graph.setEdge(0, 1);
    graph.setEdge(0, 2);
    graph.setEdge(0, 3);
    graph.setEdge(1, 4);
    graph.setEdge(1, 5);
    graph.setEdge(1, 6);
    graph.setEdge(2, 7);
    graph.setEdge(2, 8);
    graph.setEdge(2, 9);
    graph.setEdge(3, 7);
    graph.setEdge(3, 8);
    graph.setEdge(3, 9);
    graph.setEdge(4, 7);
    graph.setEdge(4, 8);
    graph.setEdge(4, 9);
    graph.setEdge(5, 7);
    graph.setEdge(5, 8);
    graph.setEdge(5, 9);
    graph.setEdge(6, 7);
    graph.setEdge(6, 8);
    graph.setEdge(6, 9);
}

function mapearPerfil(respostas) {
    const perfilMap = {
        '1_4_7': 'Iniciante',
        '1_5_7': 'Casual',
        '1_5_8': 'Intermediário',
        '2_3_1': 'Gamer',
        '2_4_7': 'Intermediário',
        '2_5_7': 'Casual',
        '2_5_8': 'Intermediário',
        '2_6_7': 'Intermediário',
        '2_6_8': 'Gamer',
        '3_4_7': 'Avançado',
        '3_4_8': 'Avançado',
        '3_4_9': 'Avançado',
        '3_6_7': 'Gamer',
        '3_6_8': 'Gamer',
        '3_6_9': 'Avançado'
    };



    const perfilKey = respostas.join('_');

    if (perfilMap.hasOwnProperty(perfilKey)) {
        return perfilMap[perfilKey];
    } else {
        console.log('Respostas inválidas.');
        return null;
    }
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