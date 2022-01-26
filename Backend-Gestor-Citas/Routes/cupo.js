const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');

// Controlador
const { obtenerCupoById, obtenerCupos, crearCupo, actualizarCupo, eliminarCupo } = require('../controllers/cupo');


// Rutas

// Obtener cupos
router.get('/', obtenerCupos);

// Obtener cupos por idHorario
router.get('/:id',validarJWT, obtenerCupoById);

// Crear cupo
router.post('/create',
    [
        check('horaInicio','la hora es obligatoria').not().isEmpty(),
        check('horaFin','la hora es obligatoria').not().isEmpty()
    ],
    validarCampos,
    validarJWT, 
    AdminRole,
    crearCupo
);

// Actualizar cupo
router.put('/update/:id',
    [
        check('horaInicio','la hora es obligatoria').not().isEmpty(),
        check('horaFin','la hora es obligatoria').not().isEmpty()
    ],
    validarCampos,
    validarJWT, 
    AdminRole,
    actualizarCupo
);

// Eliminar cupo
router.delete('/delete/:id', validarJWT, AdminRole, eliminarCupo);


module.exports = router;