const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { AdminRole } = require('../middlewares/validar-roles');

//Controllers
const { getSede, crearSede, actualizarSede, } = require('../controllers/sede');
const { validarCampos } = require('../middlewares/validar-campos');

router.use(validarJWT);

//Rutas

router.get('/', validarJWT, getSede);

router.post(
    '/create', 
    [
        check('nombre','El nombre de la sede es obligatorio').not().isEmpty(),
        check('direccion','La direccion es obligatoria').not().isEmpty(),
        check('telefono','El telefono debe ser de 10 caracteres').isLength({min:10}),
        check('horaInicioSede','La hora de inicio es obligatoria').not().isEmpty(),
        check('horaFinSede','La hora de fin es obligatoria').not().isEmpty(),
        validarCampos
    ],
    AdminRole,
    crearSede);

router.put(
    '/update/:id', 
    [
        check('nombre','El nombre de la sede es obligatorio').not().isEmpty(),
        check('direccion','La direccion es obligatoria').not().isEmpty(),
        check('telefono','El telefono debe ser de 10 caracteres').isLength({min:10}),
        check('horaInicioSede','La hora de inicio es obligatoria').not().isEmpty(),
        check('horaFinSede','La hora de fin es obligatoria').not().isEmpty(),
        validarCampos
    ],
    AdminRole,
    actualizarSede);

module.exports = router;