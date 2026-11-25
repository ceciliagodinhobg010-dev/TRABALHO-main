import express from "express";

import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();
const usuarioControle = new UsuarioController();

router.get("/", (req, res) => {
    usuarioControle.escolherPerfil(req, res);
});

router.get("/login", (req, res) => {
    usuarioControle.login(req, res);
});

router.post("/entrar", (req, res) => {
    usuarioControle.entrar(req, res);
});

router.post("/criarConta", (req, res) => {
    usuarioControle.telaUsuarioESenha(req, res);
});

router.post("/UsuarioESenha", (req, res) => {
    usuarioControle.cadastrar(req, res);
});

router.get("/sair", (req, res) => {
    usuarioControle.sair(req, res);
});

export default router;