const { Schema, model } = require('mongoose');

const ServicioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }, 
    comentario: {
        type: String,
        required: true
    }, 
    fecha: {
        type: Date,
        default: Date.now
    } 
});

module.exports = model('Servicio', ServicioSchema);
