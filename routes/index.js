var express = require('express');
var router = express.Router();
let ControlesDeAhorros = require("../controlador/Usuarios")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/Home", function(req,res,next){
  res.render("Home")
})
router.post("/Home",function(req,res,next){
  console.log(req.body)
 if(ControlesDeAhorros.Login(req.body)){
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
  if(ControlesDeAhorros.Registrar(req.body)){
    res.redirect("Home")

  }
  router.get("/Login",function(req,res,next){
    let usuario = ControlesDeAhorros.ObtenerUsuario()
    console.log(usuario)
    res.render("Login", {
      usuario: usuario
    })
  })
  router.get("/cooperativa",function(req,res,next){
    let usuario = ControlesDeAhorros.ObtenerUsuario()
    ControlesDeAhorros.AgregarCooperativa()
    res.render("Login", {
      usuario: usuario
    })
  })

})

module.exports = router;
