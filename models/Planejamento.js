import conexao from '../config/conexao.js';

const encontroSchema = conexao.Schema({
    numero: Number,
    data: String,
    tema: String,
    status: {
        type: String,
        default: 'Pendente'
    },
    observacao: String
});

const planejamentoSchema = new conexao.Schema({
    grupo: {
        type: conexao.Schema.Types.ObjectId,
        ref: 'Grupo',
        required: true
    },
    encontros: [encontroSchema]
});

const Planejamento = conexao.model('Planejamento', planejamentoSchema);

export default Planejamento;
