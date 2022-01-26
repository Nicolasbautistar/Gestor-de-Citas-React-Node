const { Schema, model } = require('mongoose');

const CupoSchema = Schema({
    horaInicio: {
        type: String,
        required: true,
    },
    horaFin: {
        type: String,
        required: true
    }
});

module.exports = model('cupo', CupoSchema)