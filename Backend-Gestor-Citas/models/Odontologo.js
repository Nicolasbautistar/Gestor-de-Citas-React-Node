const { Schema, model } = require('mongoose');

const OdontologoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: Number,
        required: true
    },
    documento: {
        type: Number,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    idEspecializacion:{
        type: Schema.Types.ObjectId,
        ref: 'especializacion',
        required: true 
    },
    idSede:{
        type: Schema.Types.ObjectId,
        ref: 'sede',
        required: true 
    }
});

OdontologoSchema.methods.toJSON = function() {
    const { __v, password, ...odontologo  } = this.toObject();
    return odontologo;
}

module.exports = model('odontologo', OdontologoSchema)