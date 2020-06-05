const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProyectoSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        trim : true
    },
    creador : {
        type : Schema.Types.ObjectId, //==> REFERENCIA AL USUARIO
        ref : 'Usuario'
    },
    creado : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);





