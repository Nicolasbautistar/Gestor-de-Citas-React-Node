const { response } = require('express');

const Cupo = require('../models/Cupo');

const obtenerCupos = async (req, resp = response) => {
    
    try {
        const cupos = await Cupo.find();
        resp.status(200).json({
            ok: true,
            msg: 'Lista de Cupos',
            cupos
        });
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar cupos',
        })
    }
}

const obtenerCupoById = async (req, resp = response) => {

    try {
        const cupoId = req.params.id;
        const cupo = await Cupo.findById(cupoId);

        if(!cupo){
            resp.status(201).json({
                ok: false,
                msg: 'El id no coincide con ningun elemento en la base de datos'
            });
        }
        resp.status(200).json({
            ok: true,
            msg: 'Cupo por Id',
            cupo
        });
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al obtener cupo',
        })
    }
}


const crearCupo = async (req, resp = response) => {

    try {
        const cupo = new Cupo(req.body);
        const cupoSave = await cupo.save();

        resp.status(201).json({
            ok: true,
            msg: 'Cupo creado de manera exitosa',
            cupoSave
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear el cupo',
        })
    }
}

const actualizarCupo = async (req, resp = response) => {
    try {
        const cupoId = req.params.id;
        const cupo = await Cupo.findById(cupoId);

        if(!cupo){
            resp.status(201).json({
                ok: false,
                msg: 'El id del cupo no coincide con ningun elemento en la base de datos',
            });
        }

        const cupoActualizado = await Cupo.findByIdAndUpdate(cupoId, req.body, {new: true});

        resp.status(200).json({
            ok: true,
            msg: 'Cupo actualizado de manera exitosa',
            cupo: cupoActualizado
        });

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar el cupo',
        });
    }
}

const eliminarCupo = async (req, resp = response) => {

    try {
        const cupoId = req.params.id;
        const cupo = await Cupo.findById(cupoId);

        if(!cupo){
            resp.status(201).json({
                ok: false,
                msg: 'El id del cupo no coincide con ningun elemento en la base de datos',
            });
        }

        await Cupo.findByIdAndDelete(cupoId);

        resp.status(200).json({
            ok: true,
            msg: 'Cupo eliminado de manera exitosa',
        });

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar el cupo',
        });
    }
} 

module.exports = {
    obtenerCupoById,
    obtenerCupos,
    crearCupo,
    actualizarCupo,
    eliminarCupo
}