const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');

const {getTipoCita, crearTipoCita, actualizarTipoCita, eliminarTipoCita} = require('../controllers/TipoCita');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { AdminRole } = require('../middlewares/validar-roles');

//Aplicar validación a todas las rutas
router.use(validarJWT);

router.get('/', getTipoCita);

router.post(
    '/create', 
    [
        check('nombre','El nombre del tipo de cita es obligatorio').not().isEmpty(),
        validarCampos
    ],
    AdminRole,
    crearTipoCita);

router.put(
    '/update/:id', 
    [
        check('nombre','El nombre del tipo de cita es obligatorio').not().isEmpty(),
        validarCampos
    ],
    AdminRole,
    actualizarTipoCita);

router.delete('/delete/:id', AdminRole,eliminarTipoCita);

module.exports = router;