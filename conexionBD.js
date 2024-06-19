const mysql = require('mysql')
require('dotenv').config();

const conexion = mysql.createConnection({
    host: process.env.BD_HOST ,
    user : process.env.BD_USUARIO ,
    password: process.env.BD_CLAVE ,
    database: process.env.BD_NOMBRE
})
conexion.connect()
module.exports = conexion