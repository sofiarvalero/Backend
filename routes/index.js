var express = require('express');
var router = express.Router();
let ControlesDeAhorros = require("../controlador/prueba")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/Home", function(req,res,next){
  res.render("Home")
})
router.post("/Home",function(req,res,next){
  console.log(req.body)
  ControlesDeAhorros.Login(req.body)
  res.render("Home")

})
router.get("/registrarse", function(req,res,next){
  res.render("registrarse")
})
router.post("/registrarse",function(req,res,next){
  console.log(req.body)
  ControlesDeAhorros.Registrar(req.body)
  
  res.render("Login")

})

module.exports = router;
