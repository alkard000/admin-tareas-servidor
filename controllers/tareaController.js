const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//CREA UNA NUEVA TAREA
exports.crearTarea = async (req, res) => {
    //REVISAR SI HAY ERRORES
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    try {

        //EXTRAER EL PROYECTO Y COMPROBAR SI EXISTE
        const {proyecto} = req.body

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg : 'Proyecot no encontrado'})
        }

        //REVISAR SI EL PRYECOT ACTUAL PERTENECE AL USUARIO AUTENTICADO
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No Autorizado'})
        }

        //CREAR TAREA
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//OBTENER TAREAS POR PROYECTO
exports.obtenerTareas = async (req, res) => {
    //EXTRAER PROYECTO
    try {
        //EXTRAER EL PROYECTO Y COMPROBAR SI EXISTE
        const {proyecto} = req.body

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg : 'Proyecto no encontrado'})
        }

        //REVISAR SI EL PRYECOT ACTUAL PERTENECE AL USUARIO AUTENTICADO
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No Autorizado'})
        }

        //OBTENER LAS TAREAS POR PROYECTO
        const tareas = await Tarea.find({proyecto});
        res.json({tareas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

//ACTUALIZAR UNA TAREA
exports.actualizarTarea = async (req, res) => {
    try {
        //EXTRAER EL PROYECTO Y COMPROBAR SI EXISTE
        const {proyecto, nombre, estado} = req.body;

        //REVISAR SI EXISTE LA TAREA
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(401).json({msg : 'No Existe esa Tarea'});
        }

        //EXTRAER PROYECTO
        const existeProyecto = await Proyecto.findById(proyecto);

        //REVISAR SI EL PRYECOT ACTUAL PERTENECE AL USUARIO AUTENTICADO
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No Autorizado'})
        }

        //CREAR UN OBJETO CON LA NUEVA INFORMACION
        const nuevaTarea = {};

        if(nombre){
            nuevaTarea.nombre = nombre;
        }
        if(estado){
            nuevaTarea.estado = estado;
        }

        //GUARDAR TAREA
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea,  {new : true});

        res.json({tarea})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo u erro')
    }
}

//ELIMINAR UNA TAREA
exports.eliminarTarea = async (req, res) => {
    try {
        //EXTRAER EL PROYECTO Y COMPROBAR SI EXISTE
        const {proyecto} = req.body;

        //REVISAR SI EXISTE LA TAREA
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(401).json({msg : 'No Existe esa Tarea'});
        }

        //EXTRAER PROYECTO
        const existeProyecto = await Proyecto.findById(proyecto);

        //REVISAR SI EL PRYECOT ACTUAL PERTENECE AL USUARIO AUTENTICADO
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No Autorizado'})
        }

        //ELIMINAR
        await Tarea.findOneAndRemove({_id : req.params.id});
        res.json({msg : 'Tarea eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo u erro')
    } 
}
