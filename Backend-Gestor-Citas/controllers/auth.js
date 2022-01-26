const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const Odontologo = require('../models/Odontologo');
const { generarJWT } = require('../helpers/generar-jwt');

/* Crear Usuario*/
const crearUsuario = async (req, resp = response) => {
    try {
        const { email, password, documento } = req.body;

        let usuario = await Usuario.findOne({ documento });
        let usuario2 = await Usuario.findOne({ email});
        if (usuario) {
            return resp.status(200).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con ese documento'
            })
        }
        if(usuario2){
            return resp.status(200).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con ese email'
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        resp.status(201).json({
            ok: true,
            msg: 'Registro de usuario exitoso',
            uid: usuario.id,
            name: usuario.name
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        })
    }
}

/*  Login  */
const loginUsuario = async (req, resp = response) => {

    try {
        const { email, password } = req.body;

        //confirmar email
        let usuario = await Usuario.findOne({ email });
        let odontologo = await Odontologo.findOne({ email });

        if (!usuario && !odontologo){
            resp.status(201).json({
                ok: false,
                msg: 'Usuario o contraseña erradas'
            });
        }

        if(usuario){
            //confirmar contraseña
            const validPassword = bcrypt.compareSync(password, usuario.password);
            
            if (!validPassword) {
                resp.status(201).json({
                    ok: false,
                    msg: 'Usuario o contraseña erradas'
                });
            }

            const token = await generarJWT(usuario.id);

            resp.json({
                ok: true,
                msg: 'Sesión Iniciada',
                uid: usuario.id,
                name: usuario.nombre,
                token
            });
        }else{
            if(odontologo){
                //confirmar contraseña
                const validPassword = bcrypt.compareSync(password, odontologo.password);
                
                if (!validPassword) {
                    resp.status(201).json({
                        ok: false,
                        msg: 'Usuario o contraseña erradas'
                    });
                }

                const token = await generarJWT(odontologo.id);

                resp.status(200).json({
                    ok: true,
                    msg: 'Sesión Iniciada',
                    uid: odontologo.id,
                    name: odontologo.nombre,
                    especializacion: odontologo.idEspecializacion,
                    token
                });
            }
        }

    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Error al autenticar'
        });
    }
}

/* Falta hacer Logout */
const logoutUsuario = async (req, resp = response) => {

    /*
    const options = {
        expires: new Date(Date.now() + 5000),
    }

    
    resp.cookie('jwt', 'expiredtoken', options);
    resp.status(200).json({
        ok: true,
        msg: 'Sesión cerrada con exito'
    });*/

    //
    let token = '';
    token = req.headers['x-access-token'] || req.headers['authorization'];

    if(!token) {
        resp.status(201).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        jwt.sign(token, "", { expiresIn: 1 } , (logout, err) => {
            if (logout) {
                resp.status(200).json({
                    ok: true,
                    msg: 'Sesión cerrada con exito'
                });
            } else {
                console.log(err);
                resp.status(201).json({
                    ok: false,
                    msg: 'Error al cerrar sesión'
                });
            }
        });
    } catch (error) {
        console.log(error);
        resp.status(401).json({
            ok: false,
            msg: 'Error al cerrar sesión'
        });
    }    

}

const actualizarPassword = async (req, resp = response) => {

    const {password} = req.body;
    const usuarioAutenticado = req.usuario;

    try {

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuarioAutenticado.password = bcrypt.hashSync(password, salt);

        const passwordUpdate = await Usuario.findByIdAndUpdate(usuarioAutenticado.id, usuarioAutenticado, { new: true });

        resp.status(200).json({
            ok: true,
            msg: 'Contraseña actualizada de manera exitosa',
            //usuario: passwordUpdate
        });

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al actualizar la contraseña',
        });
    }

}

const actualizarUsuario = async (req, resp = response) => {

    const usuarioId = req.params.id;

    try {
        
        const usuario = await Odontologo.findById(usuarioId);

        if(!usuario) {
            resp.status(201).json({
                ok: false,
                msg: 'El id no coincide con ningun registro en la base de datos',
            });
        }
        const usuarioActualizado = await Odontologo.findByIdAndUpdate(usuarioId, req.body, {new: true});

        resp.status(200).json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            usuario: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al actualizar usuario',
        });
    }
}


const revalidarToken = async (req, resp = response) => {

    const { uid, name } = req;
    //generar nuevo token
    const token = await generarJWT(uid, name);

    resp.status(200).json({
        ok: true,
        token: token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    logoutUsuario,
    revalidarToken,
    actualizarUsuario,
    actualizarPassword
}