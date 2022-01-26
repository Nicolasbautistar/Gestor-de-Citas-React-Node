const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { filtroTipoCitaYSede, filtroOndont,filtroFecha } = require('../controllers/filtros');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');


router.use(validarJWT);

//rutas 
router.get('/tipocita', 
    [
        check('idTipoCita','el idTipoCita es obligatorio').not().isEmpty(),
        check('idSede','el idSede es obligatorio').not().isEmpty()
    ],
    validarCampos,
    filtroTipoCitaYSede
);

router.get('/odonto',     
    [
        check('idOdontologo','el idOdontologo es obligatorio').not().isEmpty()
    ],
    validarCampos,
    filtroOndont
);

router.get('/fecha', 
    [
        check('fecha','la fecha es obligatoria').not().isEmpty(),
        check('idOdontologo','el idOdontologo es obligatorio').not().isEmpty()
    ],
    validarCampos,
    filtroFecha
);


module.exports = router;