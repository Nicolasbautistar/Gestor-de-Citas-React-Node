const { response } = require('express');
const Especializacion = require('../models/Especializacion');

/**getEspecializacion */

const getEspecializacion = async (req, resp = response) => {

    try {
        const especializacion = await Especializacion.find();
        resp.status(200).json({
            ok: true,
            msg: 'Lista de especializaciones',
            especializacion
        });
    }
    catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar especializaciones',
        });
    }
}

/**crearEspecializacion */

const crearEspecializacion = async (req, resp) => {

    try {
        const especializacion = new Especializacion(req.body);
        const especializacionSave = await especializacion.save();
        resp.status(200).json({
            ok: true,
            msg: 'Especializacion creada de manera exitosa',
            especializacion: especializacionSave
        });

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al crear especializacion',
        });
    }
}

/**actualizarEspecializacion */

const actualizarEspecializacion = async (req, resp = response) => {

    try {
        const especializacionId = req.params.id;
        const especializacion = await Especializacion.findById(especializacionId);

        if (!especializacion) {
            resp.status(201).json({
                ok: false,
                msg: 'El id de la especializacion no coincide con ningun elemento en la base de datos',
            });
        }

        const especializacionActualizado = await Especializacion.findByIdAndUpdate(especializacionId, req.body, { new: true });

        resp.status(200).json({
            ok: true,
            msg: 'Especializacion actualizada exitosamente',
            especializacion: especializacionActualizado
        });


    } catch(error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al actualizar la especialización',
        });
    }
}



module.exports = {
    getEspecializacion,
    crearEspecializacion,
    actualizarEspecializacion
};