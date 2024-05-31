var express = require('express');
var router = express.Router();
let ControladorUsuarios = require("../controlador/Usuarios")
let cooperativas = require("../cooperativas")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/Home", function(req,res,next){
  res.render("Home")
})
router.post("/Home",function(req,res,next){
  console.log(req.body)
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
  console.log(req.body)
  if(ControladorUsuarios.Registrar(req.body)){
    res.redirect("Home")

  }
  router.get("/Login",function(req,res,next){
    let usuario = ControladorUsuarios.ObtenerUsuario()
    console.log(usuario)
    res.render("Login", {
      usuario: usuario
    })
  })
  router.get("/cooperativa",function(req,res,next){
    let usuario = ControladorUsuarios.ObtenerUsuario()
    res.render("cooperativas",{
      cooperativa:cooperativas
    })
  })
router.post("/Login",function(req,res,next){
  let usuario = ControladorUsuarios.ObtenerUsuario()
    ControladorUsuarios.ModificarSaldo(Number(req.body.valor))
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



module.exports = router;
