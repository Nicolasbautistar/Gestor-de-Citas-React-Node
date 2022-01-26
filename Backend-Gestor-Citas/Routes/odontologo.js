const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


const { validarJWT } = require('../middlewares/validar-jwt');
const { AdminRole } = require('../middlewares/validar-roles');

//Controllers
const { getOdontologo, crearOdontologo, actualizarOdontologo, getOdontologoById, actualizarPassword } = require('../controllers/odontologo');
const { validarCampos } = require('../middlewares/validar-campos');


//Rutas

router.get('/', validarJWT, getOdontologo);

router.get('/:id', validarJWT, getOdontologoById);

router.post(
    '/create', 
    [
        check('nombre','El nombre es obligatorio').not().notEmpty(),
        check('apellidos','El apellido es obligatorio').not().notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('telefono','El telefono debe ser de 10 caracteres').isLength({min:10}),
        check('documento','El documentt debe tener al menos 7 caracteres').isLength({min:7}),
        check('fechaNacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('password','La contraseña debe ser de minimo 6 caracteres').isLength({min:6}),
        check('idEspecializacion','El id de la especializacion es obligatoria').not().notEmpty(),
        check('idSede','El id de la sede es obligatoria').not().notEmpty(),
        validarCampos
    ],
    validarJWT,
    AdminRole,
    crearOdontologo);

router.put(
    '/update/:id', 
    [
        check('nombre','El nombre es obligatorio').not().notEmpty(),
        check('apellidos','El apellido es obligatorio').not().notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('telefono','El telefono debe ser de 10 caracteres').isLength({min:10}),
        check('fechaNacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('idEspecializacion','El id de la especializacion es obligatoria').not().notEmpty(),
        validarCampos
    ],
    validarJWT,
    AdminRole,
    actualizarOdontologo);


module.exports = router;