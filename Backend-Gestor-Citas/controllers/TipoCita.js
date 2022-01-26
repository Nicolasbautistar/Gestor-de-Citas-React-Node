const { response } = require('express');
const TipoCita = require('../models/TipoCita');

const getTipoCita = async (req, resp = response) => {
    try{
        const tipoCitas = await TipoCita.find().populate('nombre');
        resp.status(200).json({
            ok: true,
            msg: 'Lista de tipo de citas',
            tipoCitas
        });
    }catch(error){
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar el tipo de cita',
        });
    }
}

const crearTipoCita = async (req, resp = response) => { 

    try {
        const nombre = req.body.nombre;
        let tipo = await TipoCita.findOne(nombre);

        if(tipo){
            return resp.status(201).json({
                ok: false,
                msg: 'Ya existe un tipo de cita con ese nombre'
            })
        }

        const tipoCita = new TipoCita(req.body);
        const tipoCitaSave = await tipoCita.save();

        resp.status(200).json({
            ok: true,
            msg: 'Tipo cita creada de manera exitosa',
            tipoCitaSave
        });

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al crear el tipo de cita',
        });
    }
}

const actualizarTipoCita = async (req, resp = response) => { 

    try {
        const tipoCitaId = req.params.id;
        const tipoCita = await TipoCita.findById(tipoCitaId);

        if(!tipoCita) {
            resp.status(201).json({
                ok: false,
                msg: 'El id del tipo cita no coincide con ningun elemento en la base de datos',
            });
        }

        const tipoCitaActualizada = await TipoCita.findByIdAndUpdate(tipoCitaId, req.body, { new: true });

        resp.status(200).json({
            ok: true,
            msg: 'Tipo cita actualizada de manera exitosa',
            tipoCita: tipoCitaActualizada
        });


    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el tipo cita',
        });
    }
}

const eliminarTipoCita = async (req, resp = response) => { 

    try {
        const tipoCitaId = req.params.id;
        const tipoCita = await TipoCita.findById(tipoCitaId);

        if(!tipoCita) {
            resp.status(201).json({
                ok: false,
                msg: 'El id del tipo cita no coincide con ningun elemento en la base de datos',
            });
        }

        await TipoCita.findByIdAndDelete(tipoCita);

        resp.status(200).json({
            ok: true,
            msg: 'El tipo cita eliminada de manera exitosa'
        });


    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar el tipo cita',
        });
    }
}

module.exports = {
    getTipoCita,
    crearTipoCita,
    actualizarTipoCita,
    eliminarTipoCita
};