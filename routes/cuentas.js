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
  router.delete("/eliminarCorriente/:id",function(req,res,next){
    ControladorCuentas.EliminarCorriente(req.params.id)
    .then(() => {
        res.send("Cuenta eliminada")
    }).catch((err) => {
        console.error(err)
        res.send("Algo Fallo")
        
    });
  })
  router.delete("/eliminarAhorro/:id",function(req,res,next){
    ControladorCuentas.EliminarAhorro(req.params.id)
    .then(() => {
        res.send("Cuenta Ahorro eliminado")
    }).catch((err) => {
        console.error(err)
        res.send("Algo Fallo")
        
    });
  })






module.exports = router;
