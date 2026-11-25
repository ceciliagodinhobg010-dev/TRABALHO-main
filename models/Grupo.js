import conexao from '../config/conexao.js';

const grupoSchema = new conexao.Schema({
    nome: String,
    ano: Number,
    dia: String,
    primeiroEncontro: String,
    confissaoData: String,
    confissaoHorario: String
});

const Grupo = conexao.model('Grupo', grupoSchema);

export default Grupo;