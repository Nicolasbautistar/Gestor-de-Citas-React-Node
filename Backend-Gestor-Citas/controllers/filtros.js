const { response } = require('express');

const Especializacion = require("../models/Especializacion");
const Horario = require('../models/Horario');
const Odontologo = require("../models/Odontologo");

const filtroTipoCitaYSede = async (req, resp = response) => {
    try {
        const {idTipoCita, idSede} = req.body;

        const especializacion = await Especializacion.find({idTipoCita: idTipoCita});

        if(!especializacion){
            resp.status(201).json({
                ok: false,
                msg: 'No hay respuestas'
            });
        }

        var listaOdonto = [];

        for await( esp of especializacion){
            const odontologo = await Odontologo.find({idEspecializacion: esp._id, idSede: idSede });
            if(!odontologo){
                listaOdonto = [...listaOdonto, odontologo];
            }
            
        }

        if(listaOdonto.length === 0){
            resp.status(201).json({
                ok: false,
                msg: 'No hay respuestas'
            });

        }else{
            resp.status(200).json({
                ok: true,
                msg: 'Odontologo',
                listaOdonto
            });
        }
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar especialización',
        });
    }
}

const filtroOndont = async (req, resp = response) => {
    try {
        const {idOdontologo} = req.body;

        let horario = await Horario.find({idOdontologo: idOdontologo});
        horario = horario.filter(h => h.idCupos.length != 0);

        const odontologo = await Odontologo.findById(idOdontologo);


        if(!horario || !odontologo){
            resp.status(201).json({
                ok: false,
                msg: 'No hay respuestas'
            });
        }
        else{
            if(horario.length === 0){
                resp.status(201).json({
                    ok: false,
                    msg: `${odontologo.nombre} no tiene horario disponible`,
                });
            }
            else{
                resp.status(200).json({
                    ok: true,
                    msg: `Horario de ${odontologo.nombre}`,
                    horario
                });
            }
    
        }
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar horario',
        });
    }
}

const filtroFecha = async (req, resp = response) => {
    try {
        const {fecha, idOdontologo} = req.body;

        const horario = await Horario.find({fecha: fecha, idOdontologo: idOdontologo}).populate('idOdontologo');
        const horarios = horario.filter(h => h.idCupos.length != 0);

        const odontologo = await Odontologo.findById(idOdontologo);

        if(!horarios || !odontologo){
            resp.status(201).json({
                ok: false,
                msg: 'No hay respuestas'
            });
        }else{
            if(horario.length === 0){
                resp.status(201).json({
                    ok: false,
                    msg: 'No hay cupos disponible',
                });
            }
            else{
                resp.status(200).json({
                    ok: true,
                    msg: 'Lista de horarios',
                    horarios
                });
            }
        }

        

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar horarios',
        });
    }
}

module.exports = {
    filtroTipoCitaYSede,
    filtroOndont,
    filtroFecha

}