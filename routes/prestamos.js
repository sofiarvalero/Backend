var express = require('express');
var router = express.Router();
const ControladorPrestamos = require('../Controladores/PrestamosControlador')
const ControladorUsuarios = require('../Controladores/UsuariosControlador')
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.get("/",function(req,res,next){
    ControladorUsuarios.Verificar(req.cookies.jwt)
    .then((token) => {
        ControladorPrestamos.Obtener()
    .then((result) => {
        res.render("prestamos",{prestamos:result,usuario:token})
    })
    .catch((e) => {
        console.error(e)
        res.render("error",{message:e.message,error:e})
    })
    }).catch((e) => {
        res.render("error",{message:e.message,error:e})
    });
    
})
router.get("/agregarPrestamo",function(req,res,next){
    ControladorUsuarios.VerificarAdmin(req.cookies.jwt)
    .then(() => {
        res.render("agregarPrestamos")
    }).catch((e) => {
        console.error(e)
        res.render("error",{message:e.message,error:e})
    })
})
router.post("/agregarPrestamo", function(req,res,next){
    ControladorPrestamos.Agregar(req.body)
    .then((result) => {
        res.redirect("/prestamos")
    })
    .catch((e) => {
        console.error(e)
        res.render("error",{message:e.message,error:e})
    })
})
router.post("/", function(req,res,next){
    ControladorPrestamos.Unirse(req.cookies.jwt,req.body)
    .then(() => {
        res.redirect("/Login")
    })
    .catch((e) => {
      console.error(e)
      res.render("error",{message:e.message,error:e})
    })
})
router.delete("/eliminar",function(req,res,next){
    ControladorPrestamos.Eliminar(req.body.id)
    .then(() => {
        res.redirect("/prestamos")
    })
    .catch((e) => {
      console.error(e)
      res.render("error",{message:e.message,error:e})
    })
})
router.get("/editar/:id",function(req,res,next){
    res.render("editarPrestamo", {id:req.params.id})
})
router.put("/editar/:id",function(req,res,next){
    ControladorPrestamos.Editar(req.params.id,req.body)
    .then(() => {
        res.redirect("/prestamos")
    })
    .catch((e) => {
        console.log(e)
        res.render("error",{message:e.message,error:e})
    });
})


module.exports = router;
