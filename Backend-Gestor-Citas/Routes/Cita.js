const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { OndontoRole } = require('../middlewares/validar-roles');

const {getCita, crearCita, actualizarCita, eliminarCita, getCitaByOdonto} = require('../controllers/Cita');



const router = Router();

// Validar token
router.use(validarJWT);

router.get('/', getCita);

router.get('/:idOdontologo',OndontoRole, getCitaByOdonto);

router.post(
    '/create', 
    [
        check('idCliente','El id del cliente es obligatorio').not().isEmpty(),
        check('idHorario','El id del horario es obligatorio').not().isEmpty(),
        check('idSede','El id de la sede es obligatoria').not().isEmpty(),
        check('idOdontologo','El id del odontologo es obligatorio').not().isEmpty(),
        check('tipoCita', 'El tipo de cita es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearCita);

router.put(
    '/update/:id', 
    [
        check('idCliente','El id del cliente es obligatorio').not().isEmpty(),
        check('idCupo','El id del cupo es obligatorio').not().isEmpty(),
        check('idSede','El id de la sede es obligatoria').not().isEmpty(),
        check('idOdontologo','El id del odontologo es obligatorio').not().isEmpty(),
        check('tipoCita', 'El tipo de cita es obligatoria').not().isEmpty(),
        validarCampos
    ],
    actualizarCita);

router.delete('/delete/:id', eliminarCita);

module.exports = router;