var express = require('express');
var router = express.Router();
const ControladorUsuarios = require("../Controladores/UsuariosControlador")
const ControladorCuentas = require('../Controladores/CuentasControlador')
const ControladorCooperativas = require('../Controladores/CooperativasControlador')
const ControladorPrestamos = require('../Controladores/PrestamosControlador')
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.get("/Home", function(req,res,next){
  res.render("Home")
})
router.post("/Home",function(req,res,next){
  ControladorUsuarios.Login(req.body)
  .then((result) => {
    res.cookie('jwt',result)
    res.redirect("Login")
   })
   .catch((err) => {
    console.error(err)
    res.redirect("Home")
   })
})
router.get("/registrarse", function(req,res,next){
  res.render("registrarse")
})
router.post("/registrarse",function(req,res,next){
  ControladorUsuarios.Registrar(req.body)
  .then(()=>{
    res.redirect("Home")
  })
  .catch((e)=>{
    console.error(e)
    res.redirect("Home")
  })
})
router.get("/Login",function(req,res,next){
  ControladorUsuarios.Verificar(req.cookies.jwt)
  .then((result) => {
    ControladorCuentas.ObtenerSaldoCorriente(req.cookies.jwt)
    .then((corriente) => {
      ControladorCooperativas.ObtenerCoopUsuario(req.cookies.jwt)
      .then((coop) => {
        ControladorPrestamos.ObtenerPrestamoUsuario(req.cookies.jwt)
        .then((prestamo) => {
          ControladorCuentas.ObtenerSaldoAhorro(req.cookies.jwt)
        .then((ahorro) => {       
             res.render("Login",{ usuario:result,corriente:corriente,ahorro:ahorro, coop:coop, prestamo:prestamo})
        }).catch((e) => {
          console.error(e)
          res.render("Login",{ usuario:result,corriente:corriente,ahorro:null,coop:coop,prestamo:prestamo})
  
        })
        }).catch((e) => {
          console.error(e)
          res.render("Login",{ usuario:result,corriente:corriente,ahorro:null,coop:coop,prestamo:null})

        });
        
      })
      .catch((e) => {
        console.error(e)
        res.render("Login",{ usuario:result,corriente:corriente,ahorro:null,coop:null, prestamo:null })
      })
      
    })
    .catch((e) => {
      console.error(e)
      res.redirect("Home")
    });

  }).catch((e) => {
    console.error(e)
    res.redirect("Home")
  })
})

router.post("/Login",function(req,res,next){
ControladorCuentas.AgregarSaldo(req.body,req.cookies.jwt)
.then(() => {
  res.redirect("Login")
}).catch((err) => {
  console.error(err)
  res.redirect("Home")
})

})

router.put("/editarUsuario",function(req,res,next){
  let user = ControladorUsuarios.ModificarUsuario(req.body)
  res.send(user)
})
router.get("/logout",function(req,res,next){
  ControladorUsuarios.Logout(req.cookies.jwt)
  res.clearCookie("jwt")
  res.redirect("Home")
})

router.delete("/usuario/:id",function(req,res,next){
  let usuario = ControladorUsuarios.EliminarUsuario(req.params.id)
  res.send(usuario)
})

module.exports = router;
