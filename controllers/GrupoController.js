import Grupo from '../models/Grupo.js';
import Catequizando from '../models/Catequizando.js';

export default class GrupoController {

    // Listar grupos
    async listar(req, res) {
        const grupos = await Grupo.find();
        res.render("grupos/lst", {
            grupos: grupos
        });
    }

    // Criar grupo
    async criar(req, res) {
        const grupo = new Grupo({
            nome: req.body.nome,
            ano: req.body.ano,
            dia: req.body.dia,
            primeiroEncontro: req.body.primeiroEncontro
        });

        await grupo.save();
        res.redirect("/grupos/cadastroCatequizandos/" + grupo._id);
    }

    // Abrir página individual do grupo (catequizandos, status, confissões)
    async cadastroCatequizandos(req, res) {
        const grupo = await Grupo.findById(req.params.id);
        const catequizandos = await Catequizando.find({
            grupo: req.params.id
        });

        res.render("grupos/individual", {
            grupo: grupo,
            catequizandos: catequizandos
        });
    }

    // Cadastrar catequizando
    async cadastrarCatequizando(req, res) {
        const catequizando = new Catequizando({
            nome: req.body.nome,
            situacao: req.body.situacao || 'Ativo',
            batismo: req.body.batismo,
            fichaPreenchida: req.body.fichaPreenchida === 'true',
            grupo: req.params.id
        });

        await catequizando.save();
        res.redirect("/grupos/cadastroCatequizandos/" + req.params.id);
    }

    // Registrar Desistência
    async registrarDesistencia(req, res) {
        await Catequizando.findByIdAndUpdate(req.body.catequizandoId, {
            situacao: 'Desistente',
            data: req.body.data,
            frequencia: req.body.frequencia,
            etapa: req.body.etapa,
            motivo: req.body.motivo
        });

        res.redirect("/grupos/cadastroCatequizandos/" + req.params.id);
    }

    // Registrar Transferência
    async registrarTransferencia(req, res) {
        const ritos = Array.isArray(req.body.ritos)
            ? req.body.ritos.join(', ')
            : (req.body.ritos || 'Nenhum');

        await Catequizando.findByIdAndUpdate(req.body.catequizandoId, {
            situacao: 'Transferido',
            etapa: req.body.etapa,
            ritos: ritos,
            data: req.body.data,
            paroquia: req.body.paroquia
        });

        res.redirect("/grupos/cadastroCatequizandos/" + req.params.id);
    }

    // Agendar Data e Horário das Confissões
    async agendarConfissao(req, res) {
        await Grupo.findByIdAndUpdate(req.params.id, {
            confissaoData: req.body.data,
            confissaoHorario: req.body.horario
        });

        res.redirect("/grupos/cadastroCatequizandos/" + req.params.id);
    }

    // Salvar Checklist de Confissões
    async salvarConfissoes(req, res) {
        let confessados = req.body.confessados || [];
        if (!Array.isArray(confessados)) {
            confessados = [confessados];
        }

        // Marca todos do grupo como false primeiro, depois marca como true os selecionados
        await Catequizando.updateMany(
            { grupo: req.params.id },
            { jaConfessou: false }
        );

        if (confessados.length > 0) {
            await Catequizando.updateMany(
                { _id: { $in: confessados } },
                { jaConfessou: true }
            );
        }

        res.redirect("/grupos/cadastroCatequizandos/" + req.params.id);
    }
    async relatorio(req, res) {
    const grupo = await Grupo.findById(req.params.id);
    const catequizandos = await Catequizando.find({
        grupo: req.params.id
    });

    res.render("grupos/relatorio", {
        grupo: grupo,
        catequizandos: catequizandos
    });
}
    // Abrir página de edição
    async editar(req, res) {
        const grupo = await Grupo.findById(req.params.id);
        res.render("grupos/edt", {
            grupo: grupo
        });
    }

    // Atualizar grupo
    async atualizar(req, res) {
        await Grupo.findByIdAndUpdate(req.params.id, {
            nome: req.body.nome,
            ano: req.body.ano,
            dia: req.body.dia,
            primeiroEncontro: req.body.primeiroEncontro
        });

        res.redirect("/grupos/lst");
    }

    // Abrir página de confirmação de exclusão
    async excluirForm(req, res) {
        const grupo = await Grupo.findById(req.params.id);
        res.render("grupos/del", {
            grupo: grupo
        });
    }

    // Excluir grupo
    async excluir(req, res) {
        await Grupo.findByIdAndDelete(req.params.id);
        res.redirect("/grupos/lst");
    }

}