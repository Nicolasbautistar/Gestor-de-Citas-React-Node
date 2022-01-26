const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Controlador
const { obtenerHorarios, obtenerHorario, crearHorario, actualizarHorario, eliminarHorario } = require('../controllers/horario');
const { AdminRole } = require('../middlewares/validar-roles');

//Aplicar validación a todas las rutas
router.use(validarJWT);

// Rutas

// Obtener Horarios
router.get('/', obtenerHorarios);

// Obtener Horario
router.get('/:id', obtenerHorario);

// Crear Horario
router.post('/create',
[
    check('fecha','La fecha es obligatoria').not().isEmpty().trim(),
    check('idCupos','El idCupos es obligatorio').not().isEmpty(),
    check('idOdontologo', 'El idOdontologo es obligatorio').not().isEmpty().trim()
],
    validarCampos,
    AdminRole,
    crearHorario
);

// Actualizar Horario
router.put('/update/:id',
[
    check('fecha','la fecha es obligatorio').not().isEmpty().trim(),
    check('idCupos','El idCupos es obligatorio').not().isEmpty(),
    check('idOdontologo', 'El idOdontologo es obligatorio').not().isEmpty().trim()
],
    validarCampos,
    AdminRole,
    actualizarHorario
);

// Eliminar Horario
router.delete('/delete/:id', AdminRole, eliminarHorario);

module.exports = router;