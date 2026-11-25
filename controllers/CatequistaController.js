import Catequista from "../models/Catequista.js";
import Usuario from "../models/Usuario.js";

export default class CatequistaController {

    inicio(req, res) {
        res.render("catequista/catequistaInicial");
    }

    criarConta(req, res) {
        res.render("catequista/criarConta", {
            perfil: req.query.perfil || "catequista"
        });
    }

    criar(req, res) {
        res.render("catequista/UsuarioESenha", {
            perfil: req.body.perfil || "catequista",
            nome: req.body.nome,
            telefone: req.body.telefone,
            cidade: req.body.cidade || "",
            paroquia: req.body.paroquia,
            idade: req.body.idade
        });
    }
    async perfil(req, res) {
        const { usuarioId } = req.query;

        const catequista = await Catequista.findOne({ usuarioId }).populate("usuarioId");

        if (!catequista) {
            return res.redirect("/login?perfil=catequista");
        }

        res.render("catequista/perfil", {
            id: catequista._id,
            nome: catequista.nome,
            telefone: catequista.telefone,
            cidade: catequista.cidade,
            paroquia: catequista.paroquia,
            idade: catequista.idade,
            usuario: catequista.usuarioId.usuario,
            foto: ""
        });
    }

    async edt(req, res) {
        const catequista = await Catequista.findById(req.params.id).populate("usuarioId");

        if (!catequista) {
            return res.redirect("/login?perfil=catequista");
        }

        res.render("catequista/edt", {
            id: catequista._id,
            nome: catequista.nome,
            telefone: catequista.telefone,
            cidade: catequista.cidade,
            paroquia: catequista.paroquia,
            idade: catequista.idade,
            usuario: catequista.usuarioId.usuario,
            foto: ""
        });
    }

    async salvarEdicao(req, res) {
        const { id, nome, telefone, cidade, paroquia, idade, usuario } = req.body;
        const catequista = await Catequista.findByIdAndUpdate(
            id,
            { nome, telefone, cidade, paroquia, idade },
            { new: true }
        );

        if (usuario && catequista) {
            await Usuario.findByIdAndUpdate(catequista.usuarioId, { usuario });
        }

        res.redirect(`/catequista/perfil?usuarioId=${catequista.usuarioId}`);
    }

    async del(req, res) {
        const catequista = await Catequista.findById(req.params.id);

        res.render("catequista/del", {
            id: catequista ? catequista._id : ""
        });
    }

    async excluir(req, res) {
        const id = req.params.id || req.body.id;
        const catequista = await Catequista.findById(id);

        if (catequista) {
            await Usuario.findByIdAndDelete(catequista.usuarioId);
            await Catequista.findByIdAndDelete(catequista._id);
        }

        res.redirect("/");
    }
}