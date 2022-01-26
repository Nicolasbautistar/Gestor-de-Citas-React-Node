const { response } = require('express');

const Rol = require('../models/Rol');


const AdminRole = async (req, res = response, next) => {

    if(req.odontologo){
        const {nombre} = req.odontologo;
            return res.status(201).json({
                ok: false,
                msg: `${nombre} no es administrador - no puede realizar está acción`
            });
        
    }else{
        if(!req.usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Se quiere validar el rol sin validar el token'
            });
            
        }
    }
    
    const {nombre, rol} = req.usuario;
    const userRol = await Rol.findById(rol)


    if(userRol.nombre !== 'administrador'){
        return res.status(201).json({
            ok: false,
            msg: `${nombre} no es administrador - no puede realizar está acción`
        });
    }

    next();
}
const OndontoRole = async (req, res = response, next) => {

    if(req.usuario){
        const {nombre} = req.usuario;
            return res.status(201).json({
                ok: false,
                msg: `${nombre} no es odontólogo - no puede realizar esta acción`
            });
        
    }else{
        if(!req.odontologo){
            return res.status(400).json({
                ok: false,
                msg: 'Se quiere validar el rol sin validar el token'
            });
            
        }
    }

    next();
}

const AdminOrOdontoRole = async (req, res = response, next) => {

    if(!req.usuario && !req.odontologo){
        return res.status(400).json({
            ok: false,
            msg: 'Se quiere validar el rol sin validar el token'
        });
    }

    if(req.usuario){

        const {nombre, rol} = req.usuario;
        const userRol = await Rol.findById(rol)

        if(userRol.nombre !== 'administrador'){
            return res.status(201).json({
                ok: false,
                msg: `${nombre} no es administrador - no puede realizar está acción`
            });
        }
    }else{
        if(!req.odontologo){
            return res.status(201).json({
                ok: false,
                msg: 'El usuario no es odontologo y no puede realizar está acción'
            });
        }
    }
    next();
}


module.exports = {
    AdminRole,
    AdminOrOdontoRole,
    OndontoRole
}