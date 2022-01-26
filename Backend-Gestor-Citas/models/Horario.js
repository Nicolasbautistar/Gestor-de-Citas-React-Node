const { Schema, model } = require('mongoose');

const HorarioSchema = Schema({
    fecha: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    idCupos:[{
        cupo: {
            type: Schema.Types.ObjectId,
            ref: 'cupo',
        }
    }],
    idOdontologo:{
        type: Schema.Types.ObjectId,
        ref: 'odontologo',
        required: true
    }
});

module.exports = model('horario', HorarioSchema)