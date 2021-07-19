//Este es como el import en react
const express = require('express');
const { dbConnection } = require('./database/config');
//Despues de instalar dotenv  se hace la importacion
require('dotenv').config();
const cors = require('cors');




//crear el servidor de express
const app = express();

//conexion a la Base de datos
dbConnection();


//CORS  es una pequeña capa de seguridad
app.use(cors());

//Directorio publico, use es una maddleware, el middleware se ejecuta cuando alguien hace una peticion al servidor
app.use(express.static('public'));


//lectura y parseo del body, las peticiones que vengan en formato json se procesan aqui y extrae el contenido
//el use es un middleware
app.use(express.json());


//aqui van todas las rutas
//todo lo que routes/auth vaya a exportar los va ha habilitar en la ruta api/auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//escuchar peticiones  process.env.PORT  es para configurar el puerto 
app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}` );
});