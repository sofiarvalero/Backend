var express = require('express');
var router = express.Router();
const ControladorCuentas = require('../Controladores/CuentasControlador')
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.get("/Ahorro",function(req,res,next){
    ControladorCuentas.CrearAhorro(req.cookies.jwt)
    .then(() => {
        res.redirect("/Login")
    })
    .catch((e) => {
        console.error(e)
        res.redirect("/Home")
    })
  
  })





module.exports = router;
