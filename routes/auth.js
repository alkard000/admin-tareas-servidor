//RUTAS PARA AUTENTICAR LOS USUARIOS
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//IMPORTAR CONTROLLADORES
const authController = require('../controllers/authController');

const auth = require('../middleware/auth');

//INICIAR SESION ==> API/AUTH
router.post('/', 
    authController.autenticarUsuario
);

//OBTIENE EL USUARIO AUTENTICADO
router.get('/',
    auth, 
    authController.usuarioAutenticado
)

module.exports = router;