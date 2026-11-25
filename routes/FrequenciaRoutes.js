const express = require('express');
const router = express.Router();

const FrequenciaController = require('../controllers/FrequenciaController');

router.get('/', FrequenciaController.index);

router.post('/gerar', FrequenciaController.gerar);

router.get('/gerar', (req, res, next) => {
    req.body = req.query;
    next();
}, FrequenciaController.gerar);

router.post('/salvar', FrequenciaController.salvar);

module.exports = router;