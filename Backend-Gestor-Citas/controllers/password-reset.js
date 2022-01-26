const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');

const  Usuario  = require("../models/Usuario");
const Odontologo = require("../models/Odontologo");

const { generarJWT } = require('../helpers/generar-jwt');
const jwt = require('jsonwebtoken');

const enviarLink = async (req, res) => {
    try {
    
        const user = await Usuario.findOne({ email: req.body.email });
        const odontologo = await Odontologo.findOne({ email: req.body.email });

        console.log(user)
        console.log(odontologo)

        let _id = ''; 
        let email = '';

        if (user){
            _id = user._id;
            email = user.email;
            console.log(email)
        }
        else
        {
            if(odontologo){
                _id = odontologo._id;
                email = odontologo.email;
            }else
            {
                return res.status(201).json({
                    ok: false,
                    msj: "El correo no existe :c"
                });
            }
        }

        const token = await generarJWT(_id);

        console.log("token "+ token)


        const link = `http://localhost:3000/api/password-reset/${_id}/${token}`;


        res.status(200).json({
            ok: true,
            msj: "El link para restaurar la constraseña fue enviado a su correo"
        });

        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'stezague88@gmail.com', // generated ethereal user
                    pass: 'llzwiuyughsdzbji', // generated ethereal password
                },
            });
            
            await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>',
                to: email,
                subject: 'Forgot password',
                text: link,
            });

            console.log("enviado")

        } catch (error) {
            res.status(201).json({
                ok: false,
                msj: "Correo no enviado"
            });
        }
       
        
    } catch (error) {
        res.status(201).json({
            ok: false,
            msj: "Ocurrió un error"
        });
        console.log(error);
    }
}

const restablecer = async (req, res) => {
    try {
        const token = req.params.token;
        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        const user = await Usuario.findById(uid);
        console.log("user " + user)
     
        const odontologo = await Odontologo.findById(uid);
        console.log("odontologo " + odontologo)
        password = req.body.password;

        const salt = bcrypt.genSaltSync();
        

        if(user){
            user.password = bcrypt.hashSync(password, salt);
            await user.save();
            res.status(200).json("Contraseña restablecida exitosamente");
            
        }else{
            if(odontologo){
                odontologo.password = bcrypt.hashSync(password, salt);
                await odontologo.save();
                res.status(200).json("Contraseña restablecida exitosamente");
            }
        }
        
     //Error a partir de acá
        /*const jwtSign = jwt.sign(token, "algo", { expiresIn: 5 });

        console.log("sign"+jwtSign);
        if(jwtSign){
            res.status(200).json("Contraseña restablecida exitosamente");
        } */
            
        
    } catch(error) {
        res.status(201).json({
            ok: false,
            msj: "Token expirado o inválido"
        });
        console.log(error);
    }
}

module.exports ={
    enviarLink,
    restablecer

}
