//RUTAS PARA AUTENTICAR LOS USUARIOS
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//IMPORTAR CONTROLLADORES
const authController = require('../controllers/authController');

//CREAR USUARIO ==> API/AUTH
router.post('/', 
    [
        check('email', 'Agrega un Email valido').isEmail(),
        check('password', 'El password debe de rminimo de 6 caracteres').isLength({min : 6})
    ],
    authController.autenticarUsuario
)

module.exports = router;