
const {Schema, model, isValidObjectId} = require('mongoose');

const CitaSchema = Schema({
    idCliente:{
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true    
    },
    idHorario:{
        type: Schema.Types.ObjectId,
        ref: 'horario',
        required: true
    },   
    idSede:{
        type: Schema.Types.ObjectId,
        ref: 'sede',
        required: true
    },
    idCupo: {
        type: Schema.Types.ObjectId,
        ref: 'cupo',
        required: true
    },
    idOdontologo:{
        type: Schema.Types.ObjectId,
        ref: 'odontologo',
        required: true
    },
    tipoCita:{
        type: Schema.Types.ObjectId,
        ref: 'tipoCita',
        required: true
    }
},
{
    timestamps: true
});
module.exports = model('cita', CitaSchema)