const { Schema, model } = require('mongoose');

const TipoCitaSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    }
},
{
    collection: 'tipoCitas'
});

module.exports = model('tipoCita', TipoCitaSchema)