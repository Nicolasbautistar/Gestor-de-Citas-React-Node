const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

//Controllers
const { getEspecializacion, crearEspecializacion, actualizarEspecializacion, } = require('../controllers/especializacion');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { AdminRole } = require('../middlewares/validar-roles');

//Aplicar validación a todas las rutas
router.use(validarJWT);

//Rutas

router.get('/', AdminRole, getEspecializacion);

router.post(
    '/create', 
    [
        check('nombre','El nombre de la especializacion es obligatoria').not().isEmpty(),
        validarCampos
    ],
    AdminRole,
    crearEspecializacion);

router.put(
    '/update/:id', 
    [
        check('nombre','El nombre de la especializacion es obligatoria').not().isEmpty(),
        validarCampos
    ],
    AdminRole,
    actualizarEspecializacion);



module.exports = router;