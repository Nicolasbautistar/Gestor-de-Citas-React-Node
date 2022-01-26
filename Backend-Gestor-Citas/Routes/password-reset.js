const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const {enviarLink,restablecer} = require('../controllers/password-reset.js');
const { validarCampos } = require('../middlewares/validar-campos');


router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
    ],
    validarCampos,
    enviarLink
);

router.post('/:id/:token', 
    [
        check('password','La contraseña debe ser de minimo 6 caracteres').isLength({min:6}),
    ],
    validarCampos,
    restablecer
);


module.exports = router;