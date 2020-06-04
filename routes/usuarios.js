//RUTAS PARA CREAAR LOS USUARIOS
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//IMPORTAR CONTROLLADORES
const usuarioController = require('../controllers/usuarioController');

//CREAR USUARIO ==> API/USUARIOS
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email valido').isEmail(),
        check('password', 'El password debe de rminimo de 6 caracteres').isLength({min : 6})
    ],
    usuarioController.crearUsuario
)

module.exports = router;