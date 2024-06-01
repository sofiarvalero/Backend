var express = require('express');
var router = express.Router();
let ControladorUsuarios = require("../controlador/Usuarios")
let cooperativas = require("../cooperativas")
let prestamos = require("../cuentasPrestamo")

router.get("/Home", function(req,res,next){
  res.render("Home")
})
router.post("/Home",function(req,res,next){
 if(ControladorUsuarios.Login(req.body)){
  res.redirect("Login")
 } else{
  res.send("Error")
 }

})
router.get("/registrarse", function(req,res,next){
  res.render("registrarse")
})
router.post("/registrarse",function(req,res,next){
  if(ControladorUsuarios.Registrar(req.body)){
    res.redirect("Home")

  }
  router.get("/Login",function(req,res,next){
    let usuario = ControladorUsuarios.ObtenerUsuario()
    res.render("Login", {
      usuario: usuario
    })
  })
  router.get("/cooperativa",function(req,res,next){
    res.render("cooperativas",{
      cooperativa:cooperativas
    })
  })
router.post("/Login",function(req,res,next){
  let usuario = ControladorUsuarios.ObtenerUsuario()
  if(req.body.valorCorriente){
    ControladorUsuarios.ModificarSaldoCorriente(Number(req.body.valorCorriente))
  }else{
    ControladorUsuarios.ModificarSaldoAhorro(Number(req.body.valorAhorro))
  }

  res.render("Login",{
    usuario:usuario
  } 
 )
})
})
router.post("/cooperativa",function(req,res,next){
  ControladorUsuarios.AgregarCooperativa(req.body.id)
  res.redirect("Login")
})
router.put("/editarUsuario",function(req,res,next){
  let user = ControladorUsuarios.ModificarUsuario(req.body)
  res.send(user)
})
router.get("/logout",function(req,res,next){
  ControladorUsuarios.CerrarSesion()
  res.redirect("Home")
})
router.get("/cuentaAhorro",function(req,res,next){
  ControladorUsuarios.CrearCuentaAhorro()
  res.redirect("Login")

})
router.get("/prestamos",function(req,res,next){
  res.render("prestamos",{
    prestamistas:prestamos
  })
})
router.post("/prestamos",function(req,res,next){
  ControladorUsuarios.AgregarPrestamo(req.body.prestamo)
res.redirect("Login")
})
router.delete("/usuario/:id",function(req,res,next){
  let usuario = ControladorUsuarios.EliminarUsuario(req.params.id)
  res.send(usuario)
})
router.post("/agregarCooperativa",function(req,res,next){
  cooperativas.push(req.body)
  res.send(cooperativas)
})
router.post("/agregarPrestamo",function(req,res,next){
  prestamos.push(req.body)
  res.send(prestamos)
})
router.delete("/eliminarCooperativa/:id",function(req,res,next){
  for(let i=0;i<cooperativas.length;i++){
    if(cooperativas[i].id == req.params.id){
      cooperativas.splice(i,1)
    }
  }
  res.send(cooperativas)
})
router.delete("/eliminarPrestamo/:id",function(req,res,next){
  for(let i=0;i<prestamos.length;i++){
    if(prestamos[i].id == req.params.id){
      prestamos.splice(i,1)
    }
  }
  res.send(prestamos)
})
router.put("/editarCooperativa/:id",function(req,res,next){
  for(let i=0;i<cooperativas.length;i++){
    if(cooperativas[i].id == req.params.id){
      cooperativas[i] = req.body
    }
  }
  res.send(cooperativas)
})
router.put("/editarPrestamo/:id",function(req,res,next){
  for(let i=0;i<prestamos.length;i++){
    if(prestamos[i].id == req.params.id){
      prestamos[i] = req.body
    }
  }
  res.send(prestamos)
})
module.exports = router;
