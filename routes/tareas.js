//RUTAS PARA CREAR LOS PROYECTOS
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//IMPORTAR CONTROLLADORES
const tareaController = require('../controllers/tareaController');

//IMPORTAR MIDDLEWARE DE AUTENTICACION
const auth = require('../middleware/auth');

//CREAR PROYECTOS ==> API/PROYECTOS
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//OBTENER LAS TAREAS POR PROYECTO
router.get('/',
    auth,
    tareaController.obtenerTareas
);

//ACTUALIZAR UNA TAREA
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

//ELIMINAR UNA TAREA
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;