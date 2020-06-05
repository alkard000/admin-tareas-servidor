const Proyecto = require('../models/Proyecto');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //REVISAR SI HAY ERRORES
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    try {
        //CREAR UN NUEVO PROYECTO
        const proyecto = new Proyecto(req.body);

        //GUARDAR AL CREADOR POR JWT
        proyecto.creador = req.usuario.id;

        //GUARDAR PROYECTO
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//OBTIENE TODOS LO PROYECTOS D EL USUARIO ACTUAL
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({creador : req.usuario.id});
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//ACTUALIZAR UN PROYECTO
exports.actualizarProyecto = async (req, res) => {
    //REVISAR SI HAY ERRORES
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //EXTRAER LA INFORMACION DEL PROYECTO
    const {nombre} = req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        //REVISAR EL ID
        let proyecto = await Proyecto.findById(req.params.id);

        //VERIFICAR SI EL PROYECTO EXISTE
        if(!proyecto){
            return res.status(404).json({msg : 'Proyecto no encontrado'})
        }

        //VERIFICAR EL CREADOR DEL PROYECTO
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No Autorizado'})
        }

        //ACTUALIZAR
        proyecto = await Proyecto.findByIdAndUpdate({_id : req.params.id}, {
            $set : nuevoProyecto
        }, {new : true});

        res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}

//ELIMINAR EL PROYECTO POR SU ID
exports.eliminarProyecto = async (req, res) => {
    try {
        //REVISAR EL ID
        let proyecto = await Proyecto.findById(req.params.id);

        //VERIFICAR SI EL PROYECTO EXISTE
        if(!proyecto){
            return res.status(404).json({msg : 'Proyecto no encontrado'})
        }

        //VERIFICAR EL CREADOR DEL PROYECTO
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No Autorizado'})
        }

        //ELIMINAR EL PROYECTO
        await Proyecto.findOneAndRemove({_id : req.params.id});
        res.json({msg : 'Proyecto eliminado'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}