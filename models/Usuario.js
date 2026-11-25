import conexao from '../config/conexao.js'

const UsuarioSchema = new conexao.Schema({
    usuario: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true
    },
    senha: { 
        type: String, 
        required: true 
    },
    perfil: { 
        type: String, 
        enum: ["catequista", "coordenadora"], 
        required: true 
    }
});

export default conexao.model("Usuario", UsuarioSchema);