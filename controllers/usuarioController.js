const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');


exports.crearUsuario = async (req, res) => {

    //REVISAR SI HAY ERRORES
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //EXTRAER EMIAL Y PASSWORD
    const {email, password} = req.body;

    try {
        //REVISAR SI EL USUARIO ES UNICO
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg : 'El usuario ya existe'});
        }

        //CREA EL NUEVO USUARIO
        usuario = new Usuario(req.body);

        //HASHEAR EL PASSWORD
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //GUARDA EL NUEVO USUARIO
        await usuario.save();

        //CREAR Y FIRMAR EL JWT
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
        res.status(400).send('Hubo un Error');
    }
}