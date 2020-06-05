const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TareaSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        trim : true
    },
    estado : {
        type : Boolean, 
        default : false
    },
    creado : {
        type : Date,
        default : Date.now()
    },
    proyecto : {
        type : Schema.Types.ObjectId,//==> REFERENCIA AL PROYECTO
        ref : 'Proyecto'
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);





