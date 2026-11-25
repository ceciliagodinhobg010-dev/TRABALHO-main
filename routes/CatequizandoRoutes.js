import express from 'express';
import CatequizandoController from '../controllers/CatequizandoController.js';

const router = express.Router();
const controle = new CatequizandoController();

router.get("/catequizandos", (req, res) => {
    controle.listar(req, res);
});

router.get("/catequizandos/lst", (req, res) => {
    controle.listar(req, res);
});

router.get("/catequizandos/add", (req, res) => {
    controle.abrirAdd(req, res);
});

router.post("/catequizandos/add", (req, res) => {
    controle.criar(req, res);
});

router.get("/catequizandos/edt/:id", (req, res) => {
    controle.editar(req, res);
});

router.post("/catequizandos/edt/:id", (req, res) => {
    controle.atualizar(req, res);
});

router.get("/catequizandos/del/:id", (req, res) => {
    controle.excluirForm(req, res);
});

router.post("/catequizandos/del/:id", (req, res) => {
    controle.excluir(req, res);
});

export default router;