import Catequizando from '../models/Catequizando.js';
import Grupo from '../models/Grupo.js';

export default class CatequizandoController {

    // Listar todos os catequizandos
    async listar(req, res) {
        const catequizandos = await Catequizando.find().populate('grupo');
        res.render("catequizandos/lst", {
            catequizandos: catequizandos
        });
    }

    // Abrir página de cadastro
    async abrirAdd(req, res) {
        const grupos = await Grupo.find();
        res.render("catequizandos/add", {
            grupos: grupos
        });
    }

    // Criar novo catequizando
    async criar(req, res) {
        const catequizando = new Catequizando({
            nome: req.body.nome,
            telefone: req.body.telefone,
            responsavel: req.body.responsavel,
            situacao: req.body.situacao || 'Ativo',
            batismo: req.body.batismo,
            fichaPreenchida: req.body.fichaPreenchida === 'true',
            grupo: req.body.grupo
        });

        await catequizando.save();
        res.redirect("/catequizandos/lst");
    }

    // Abrir página de edição
    async editar(req, res) {
        const catequizando = await Catequizando.findById(req.params.id);
        const grupos = await Grupo.find();

        res.render("catequizandos/edt", {
            catequizando: catequizando,
            grupos: grupos
        });
    }

    // Atualizar catequizando
    async atualizar(req, res) {
        const ritos = Array.isArray(req.body.ritos)
            ? req.body.ritos.join(', ')
            : (req.body.ritos || '');

        await Catequizando.findByIdAndUpdate(req.params.id, {
            nome: req.body.nome,
            telefone: req.body.telefone,
            responsavel: req.body.responsavel,
            situacao: req.body.situacao,
            batismo: req.body.batismo,
            fichaPreenchida: req.body.fichaPreenchida === 'true',
            jaConfessou: req.body.jaConfessou === 'true',
            data: req.body.data,
            frequencia: req.body.frequencia,
            etapa: req.body.etapa,
            motivo: req.body.motivo,
            ritos: ritos,
            paroquia: req.body.paroquia,
            grupo: req.body.grupo
        });

        res.redirect("/catequizandos/lst");
    }

    // Abrir página de confirmação de exclusão
    async excluirForm(req, res) {
        const catequizando = await Catequizando.findById(req.params.id);
        res.render("catequizandos/del", {
            catequizando: catequizando
        });
    }

    // Excluir catequizando
    async excluir(req, res) {
        await Catequizando.findByIdAndDelete(req.params.id);
        res.redirect("/catequizandos/lst");
    }

}