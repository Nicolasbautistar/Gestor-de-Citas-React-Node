const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');

//Controllers
const { getHClinica, crearHClinica, actualizarHClinica} = require('../controllers/historiaClinica');
const { validarCampos } = require('../middlewares/validar-campos');
const { OndontoRole } = require('../middlewares/validar-roles');

//Aplicar validación a todas las rutas
router.use(validarJWT);

//Rutas

router.get('/', OndontoRole, getHClinica);

router.post(
    '/create', 
    [
        check('idUsuario','El id del usuario es obligatorio').not().isEmpty(),
        check('idCita','El id de la cita es obligatoria').not().isEmpty(),
        check('observacion','Se debe ingresar una observacion del tratamiento realizado').not().isEmpty(),
        validarCampos
    ],
    OndontoRole,
    crearHClinica);

router.put(
    '/update/:id', 
    [
        check('idUsuario','El id del usuario es obligatorio').not().isEmpty(),
        check('idCita','El id de la cita es obligatoria').not().isEmpty(),
        check('observacion','Se debe ingresar una observacion del tratamiento realizado').not().isEmpty(),
        validarCampos
    ],
    OndontoRole,
    actualizarHClinica);



module.exports = router;