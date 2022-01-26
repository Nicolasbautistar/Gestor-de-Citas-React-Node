const { response } = require('express');
const HistoriaClinica = require('../models/HistoriaClinica');


/**getHClinica */

const getHClinica = async (req, resp = response) => {
   
    try {
        const hClinica = await HistoriaClinica.find()
                                                .populate('idUsuario')
                                                .populate( 'idCita');
        resp.status(200).json({
            ok: true,
            msg: 'Lista de historias clinicas',
            hClinica
        });
    }
    catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al listar historias clinicas',
        });
    }

}
/**crearHClinica */

const crearHClinica = async (req, resp = response) => {

    try {

        const exis = await HistoriaClinica.findOne({idUsuario: req.body.idUsuario})
        if(exis){
            resp.status(201).json({
                ok: false,
                msg: 'Este usuario ya tiene una historia clínica',
            });
        }

        const hClinica = new HistoriaClinica(req.body);
        const hClinicaSave = await hClinica.save();
        resp.status(200).json({
            ok: true,
            msg: 'Historia clinica creada de manera exitosa',
            hClinicaSave
        });

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al crear la historia clinica',
        });
    }
}


/**actualizarHClinica */

const actualizarHClinica = async (req, resp = response) => {

    try {
        const {id} = req.params;
        const hClinica = await HistoriaClinica.findById(id);
        console.log(hClinica);

        if (!hClinica) {
            resp.status(201).json({
                ok: false,
                msg: 'El id de la historia clinica no coincide con ningun elemento en la base de datos',
            });
        }

        const HclinicaActualizada = await HistoriaClinica.findByIdAndUpdate(id, req.body, { new: true });

        resp.status(200).json({
            ok: true,
            msg: 'historia clinica actualizada de manera exitosa',
            hclinica: HclinicaActualizada
        });


    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al actualizar la historia clinica',
        });
    }
}



module.exports = {
    getHClinica,
    crearHClinica,
    actualizarHClinica,
};