const express = require("express");
var cors = require('cors')
const { dbConnection } = require("./database/config");

require ('dotenv').config();

//Crear el servidor de express
const app = express()

//Instancia de base de datos
dbConnection()

//Cors
app.use(cors())

//Directorio público
app.use( express.static('public') )

//Lectura y parseo del body con formato raw
app.use( express.json() )

//Rutas
app.use('/api/auth', require('./routes/authRoute'))
// app.use('/api/events', require('./routes/events'))

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server run in port ${ process.env.PORT }`);
});

