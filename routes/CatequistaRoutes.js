import express from 'express';

import multer from 'multer';

import CatequistaController from '../controllers/CatequistaController.js';

const router = express.Router();
const controle = new CatequistaController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/perfil');
    },
    filename: function (req, file, cb) {
        const nome = Date.now() + '-' + file.originalname;
        cb(null, nome);
    }
});

const upload = multer({ storage: storage });

router.get('/criarConta', controle.criarConta);
router.post('/criarConta', controle.criar);
router.get('/perfil', controle.perfil);
router.get('/perfil/edt', controle.edt);
router.post('/perfil/edt', upload.single('foto'), controle.salvarEdicao);
router.get('/perfil/del', controle.del);
router.post('/perfil/del', controle.excluir);
router.get('/catequistaInicial', controle.inicio);

router.get('/saibaMais', (req, res) => {
    res.render('catequista/saibaMais');
});

export default router;