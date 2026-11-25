import Usuario from "../models/Usuario.js";
import Catequista from "../models/Catequista.js";

export default class UsuarioController {

    escolherPerfil(req, res) {
        res.render("usuario/escolherPerfil");
    }

    login(req, res) {
        const perfil = req.query.perfil || "catequista";

        res.render("usuario/login", {
            perfil: perfil,
            erro: ""
        });
    }

    async entrar(req, res) {
        const { usuario, senha, perfil } = req.body;

        const conta = await Usuario.findOne({
            usuario: usuario,
            senha: senha,
            perfil: perfil
        });

        if (!conta) {
            return res.render("usuario/login", {
                perfil: perfil,
                erro: `Usuário, senha ou acesso de ${perfil} inválido!`
            });
        }

        if (conta.perfil === "catequista") {
            return res.redirect(`/catequista/perfil?usuarioId=${conta._id}`);
        }

        if (conta.perfil === "coordenadora") {
            return res.redirect(`/coordenadora/painel?usuarioId=${conta._id}`);
        }
    }

    telaUsuarioESenha(req, res) {
        res.render("usuario/UsuarioESenha", {
            perfil: req.body.perfil,
            nome: req.body.nome,
            telefone: req.body.telefone,
            cidade: req.body.cidade || "",
            paroquia: req.body.paroquia,
            idade: req.body.idade
        });
    }

    async cadastrar(req, res) {
        const { perfil, nome, telefone, cidade, paroquia, idade, usuario, senha, confirmar } = req.body;

        if (senha !== confirmar) {
            return res.send("As senhas não coincidem!");
        }

        const usuarioExistente = await Usuario.findOne({ usuario });
        if (usuarioExistente) {
            return res.send("Este nome de usuário já está em uso!");
        }

        const novoUsuario = new Usuario({
            usuario,
            senha,
            perfil
        });
        await novoUsuario.save();

        if (perfil === "catequista") {
            const novoCatequista = new Catequista({
                usuarioId: novoUsuario._id,
                nome,
                telefone,
                cidade,
                paroquia,
                idade
            });
            await novoCatequista.save();
        }

        res.redirect(`/login?perfil=${perfil}`);
    }

    sair(req, res) {
        res.redirect("/");
    }
}