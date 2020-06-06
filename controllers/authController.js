const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.autenticarUsuario = async (req, res) => {
    //REVISAR SI HAY ERRORES
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email, password} = req.body;

    try {
        //REVISAR QUE SEA UN USUARIO REGISTRADO
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({msg : 'El usuario no Existe'})
        }

        //REVISAR SI EL PASSWORD ES CORRECTO
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg : 'Password Incorrecto'})
        }

        //SI TODO ES CORRECTO CREAR Y FIRMAR EL JWT
        const payload = {
            usuario : {
                id : usuario.id,
            }
        }

        //FIRMAR EL JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn : 3600,
        }, (error, token) => {
            if(error) throw error;

            //MENSAJE DE CONFIRMACION
            res.json({token});
        })
    } catch (error) {
        console.log(error)
    }
}

//OBTIENE QUE USUARIO ESTA AUTENTICADO
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : 'Hubo un error'})
    }
}