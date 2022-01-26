const { Schema, model, } = require('mongoose');

const EspecializacionSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    idTipoCita: {
        type: Schema.Types.ObjectId,
        ref: 'tipoCita',
        required: true,
    }
},
{
    collection: 'especializaciones'
});

module.exports = model('especializacion', EspecializacionSchema)