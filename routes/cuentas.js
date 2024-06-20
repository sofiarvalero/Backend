var express = require('express');
var router = express.Router();
const ControladorCuentas = require('../Controladores/CuentasControlador')
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.get("/",function(req,res,next){
    ControladorCuentas.CrearCorriente(4)
    .then(() => {
        res.send("Hola")  
    })
    .catch((err) => {
        res.send(err)
    });
})






module.exports = router;
