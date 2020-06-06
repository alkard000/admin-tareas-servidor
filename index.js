const express = require('express');
const conectarBD = require('./config/db');
const cors = require('cors');

//CREAR EL SEVIDOR
const app = express();

//CONECTAR A LA BASE DE DATOS
conectarBD();

//HABILITAR CORS
app.use(cors());

//HABILITAR EXPRESS.JSON
app.use(express.json({extended : true}))

//PUERTO DE LA APP
const port = process.env.PORT || 4000;

//IMPORTAR RUTAS
app.use(
    '/api/usuarios', 
    require('./routes/usuarios')
);
app.use(
    '/api/auth', 
    require('./routes/auth')
);
app.use(
    '/api/proyectos', 
    require('./routes/proyectos')
);
app.use(
    '/api/tareas', 
    require('./routes/tareas')
);

//ARRANCAR LA APP
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}!`);
});