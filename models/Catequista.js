import conexao from '../config/conexao.js';

const CatequistaSchema = new conexao.Schema({

    usuarioId: { 
        type: conexao.Schema.Types.ObjectId, 
        ref: "Usuario", 
        required: true 
    },
    nome: String,
    telefone: String,
    cidade: String,
    paroquia: String,
    idade: Number

});

export default conexao.model("Catequista", CatequistaSchema);