
const translate = require('node-google-translate-skidz');

class googleService {
    // Função para traduzir texto
    async traduzirTexto(texto) {
        try {
            const resultado = await translate({
                text: texto,
                source: 'pt',
                target: 'en'
            });
            return resultado.translation;
        } catch (erro) {
            console.error(erro);
            return texto; // Retorna o texto original em caso de erro
        }
    }
}
module.exports = googleService;