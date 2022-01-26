const { response } = require('express');

const Horario = require('../models/Horario');
const Odontologo = require('../models/Odontologo');

const obtenerHorarios = async (req, resp = response) => {

    try{
        const horarios = await Horario.find()
                                        .populate('idOdontologo')
                                        .populate({
                                                path: 'idCupos.cupo',
                                                model: 'cupo'
                                        });
        let horario = horarios.filter(h => h.idCupos.length != 0);

        if(horario.length == 0){
            resp.status(201).json({
                ok: false,
                msg: 'No hay horarios',
            });
        }

        resp.status(200).json({
            ok: true,
            msg: 'Lista de Horarios',
            horario
        });

    }catch(error){
        resp.status(400).json({
            ok: false,
            msg: 'Error lista de Horarios',
        })
    }
    
}

const obtenerHorario = async (req, resp = response) => {

    try{
        const horarioId = req.params.id;
        const horario = await Horario.findById(horarioId)
                                                    .populate('idOdontologo')
                                                    .populate({
                                                        path: 'idCupos.cupo',
                                                        model: 'cupo'
                                                    });

        if(!horario){
            resp.status(201).json({
                ok: false,
                msg: 'El id del horario no coincide con ningun elemento en la base de datos'
            });
        }
        resp.status(200).json({
            ok: true,
            msg: 'Horario por Id',
            horario
        });
    }catch(error){
        resp.status(400).json({
            ok: false,
            msg: 'Error al obtener el Horario',
        })
    }

}

const crearHorario = async (req, resp = response) => {
    try {
        const horario = new Horario(req.body);
        const horarioSave = await horario.save();

        resp.status(200).json({
            ok: true,
            msg: 'Horario creado de manera exitosa',
            horarioSave
        });
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al crear el Horario',
        })
    }
}

const actualizarHorario = async (req, resp = response) => {

    try {
        const horarioId = req.params.id;
        const horario = await Horario.findById(horarioId);

        if(!horario){
            resp.status(201).json({
                ok: false,
                msg: 'El id del horario no coincide con ningun elemento en la base de datos',
            });
        }

        const horarioActualizado = await Horario.findByIdAndUpdate(horarioId, req.body, {new: true});

        resp.status(200).json({
            ok: true,
            msg: 'Horario actualizado de manera exitosa',
            horario: horarioActualizado
        })
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el horario',
        });
    }
}

const eliminarHorario = async (req, resp = response) => {

    try {
        const horarioId = req.params.id;
        const horario = await Horario.findById(horarioId);

        if(!horario){
            resp.status(201).json({
                ok: false,
                msg: 'El id del horario no coincide con ningun elemento en la base de datos',
            });
        }

        await Horario.findByIdAndDelete(horarioId);

        resp.status(200).json({
            ok: true,
            msg: 'Horario eliminado de manera exitosa',
        })

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar el horario',
        });
    }
} 

module.exports = {
    obtenerHorario,
    obtenerHorarios,
    crearHorario,
    actualizarHorario,
    eliminarHorario
}