const moment = require('moment');
const { response } = require('express');

const Cita = require('../models/Cita');
const Cupo = require('../models/Cupo');
const Horario = require('../models/Horario');

/* Listar citas*/
const getCita = async (req, resp = response) => {

    try {
        const citas = await Cita.find()
                                    .populate('idHorario','fecha')
                                    .populate('idCupo')
                                    .populate('idSede', 'nombre')
                                    .populate('tipoCita','nombre')
                                    .populate('idOdontologo',['nombre','apellidos','idEspecializacion'])
                                    .populate('idCliente', ['nombre','apellidos','email','telefono','documento','fechaNacimiento'])

        resp.status(200).json({
            ok: true,
            msg: 'Lista de Citas',
            citas
        });
    }
    catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar citas',
        });
    }
}

/* Crear Citas */
const crearCita = async (req, resp = response) => { 

    try {
        const cita = new Cita(req.body);
        const { idHorario, idOdontologo, idCupo } = req.body;

        let citas = await Cita.findOne({idHorario,idOdontologo,idCupo});

        if(citas){
            return resp.status(200).json({
                ok: false,
                msg: 'No hay cupo'
            })
        }
       
        let horario = await Horario.findById(idHorario);

        const {idCupos} = horario;
        const cupoOld = idCupos.some(cup=>{
            return cup.cupo == idCupo;
        })
 
        if(cupoOld){
            const cupoNuevo = idCupos.filter(e => e.cupo != idCupo);
            horario.idCupos = cupoNuevo;

            const citaSave = await cita.save();
            
            await Horario.findByIdAndUpdate(idHorario, horario, {new: true});

            resp.status(201).json({
                ok: true,
                msg: 'Cita creada de manera exitosa',
                citaSave
            });

        }else{
            resp.status(201).json({
                ok: true,
                msg: 'No se pudo crear la cita'
            });
        }
        

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear la cita',
        });
    }
}
/* Actualizar es sinónimo de reasignar XD*/
const actualizarCita = async (req, resp = response) => { 

    try {
        const citaId = req.params.id;
        const cita = await Cita.findById(citaId).populate('idCupo')
                                                .populate('idHorario');


        if(!cita) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id de la cita no coincide con ningun elemento en la base de datos',
            });
        }

        const { idHorario, idOdontologo, idCupo } = req.body;
        const citas = await Cita.findOne({idHorario,idOdontologo,idCupo});
        
        var now = moment();

        const {fecha} = cita.idHorario
        const {horaInicio} = cita.idCupo

        const old = moment(`${fecha} ${horaInicio}`,'DD-MM-YYYY HH:mm');

        const resul = old.diff(now, 'hours');

        if(resul>24){
            
            if(citas){
                return resp.status(200).json({
                    ok: false,
                    msg: 'No hay cupo'
                })
            }

            const h = await Horario.findById(idHorario);

            var {idCupos} = h;
            const cupoOld = idCupos.some(cup=>{
                return cup.cupo == idCupo;
            });
     
            if(cupoOld){

                const citaActualizada = await Cita.findByIdAndUpdate(citaId, req.body, { new: true });
   
                //Quito el cupo que se actualizó    
                let horarioUpdate = await Horario.findById(idHorario);
                let {idCupos} = horarioUpdate;
                const idCupoR = req.body.idCupo;
                const cupoNuevo = idCupos.filter(e => e.cupo != idCupoR);
                horarioUpdate.idCupos = cupoNuevo;
                await Horario.findByIdAndUpdate(idHorario, horarioUpdate, {new: true});
        
                //Volver a crear horario viejo 
                const {_id} = cita.idHorario;
                let horario = await Horario.findById(_id);
    
                let idCupo = {"cupo": cita.idCupo};
                horario.idCupos = [...horario.idCupos, idCupo];
    
                await Horario.findByIdAndUpdate(_id, horario, {new: true});
        
                resp.status(200).json({
                    ok: true,
                    msg: 'Cita actualizada de manera exitosa',
                    cita: citaActualizada
                });
            }else{
                resp.status(200).json({
                    ok: true,
                    msg: 'Cita actualizada de manera exitosa',
                    cita: citaActualizada
                });
            }
           
    
        }else{
            resp.status(200).json({
                ok: false,
                msg: 'No puede actualizar o cancelar la cita agendada antes de 24 horas',
            });
        }
        

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar la cita',
        });
    }
}

const eliminarCita = async (req, resp = response) => { 

    try {
        const citaId = req.params.id;
        const cita = await Cita.findById(citaId).populate('idCupo')
                                                .populate('idHorario');

        if(!cita) {
            resp.status(201).json({
                ok: false,
                msg: 'El id de la cita no coincide con ningun elemento en la base de datos',
            });
        }
        
        var now = moment();

        const {fecha} = cita.idHorario
        const {horaInicio} = cita.idCupo

        const old = moment(`${fecha} ${horaInicio}`,'DD-MM-YYYY HH:mm');

        const resul = old.diff(now, 'hours');

        if(resul>24){
            
            const id = req.params.id;
            const cita = await Cita.findById(id);

            const {idHorario, idCupo} = cita;

            let horario = await Horario.findById(idHorario);

            let cupo = {"cupo": idCupo};
            horario.idCupos = [...horario.idCupos, cupo];

            await Horario.findByIdAndUpdate(idHorario, horario, {new: true});

            await Cita.findByIdAndDelete(id);
            
            resp.status(200).json({
                ok: true,
                msg: 'Cita cancelada de manera exitosa'
            });

        }else{
            resp.status(200).json({
                ok: false,
                msg: 'No puede cancelar la cita agendada antes de 24 horas',
            });
        }


    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar la cita',
        });
    }
}

const getCitaByOdonto = async (req, resp = response) => {

    try {
        const {idOdontologo} = req.params;
        const citas = await Cita.find({idOdontologo: idOdontologo})
                                    .populate('idHorario','fechaNow')
                                    .populate('idCupo')
                                    .populate('idSede', 'nombre')
                                    .populate('tipoCita','nombre')
                                    .populate('idCliente', ['nombre','apellidos','email','telefono','documento','fechaNacimiento'])

        resp.status(200).json({
            ok: true,
            msg: 'Lista de Citas',
            citas
        });
    }
    catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar citas',
        });
    }
}

module.exports = {
    getCita,
    crearCita,
    actualizarCita,
    eliminarCita,
    getCitaByOdonto
};