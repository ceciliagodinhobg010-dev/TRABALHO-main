import conexao from '../config/conexao.js';

const CatequizandoSchema = new conexao.Schema({
    id: Number,
    nome: String,
    telefone: String,
    responsavel: String,
    foto: String,

    situacao: {
        type: String,
        default: 'Ativo'
    },
    fichaPreenchida: {
        type: Boolean,
        default: false
    },
    batismo: String,
    jaConfessou: {
        type: Boolean,
        default: false
    },

    // Campos usados em caso de Desistência ou Transferência
    data: String,
    frequencia: Number,
    etapa: String,
    motivo: String,
    ritos: String,
    paroquia: String,

    grupo: {
        type: conexao.Schema.Types.ObjectId,
        ref: "Grupo"
    }
});

export default conexao.model(
    "Catequizando",
    CatequizandoSchema
);