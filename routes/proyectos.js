//RUTAS PARA CREAR LOS PROYECTOS
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//IMPORTAR CONTROLLADORES
const proyectoController = require('../controllers/proyectoController');

//IMPORTAR MIDDLEWARE DE AUTENTICACION
const auth = require('../middleware/auth');

//CREAR PROYECTOS ==> API/PROYECTOS
router.post('/', 
    auth, 
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

//MOSTRAR TODOS LO PROYECTO DEL USUARIO AUTENTICADO
router.get('/', 
    auth, 
    proyectoController.obtenerProyectos
);

//ACTUAIZAR UN PROYECTO
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del Proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto 
);

//ELIMINAR UN PROYECTO
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto 
)

module.exports = router;