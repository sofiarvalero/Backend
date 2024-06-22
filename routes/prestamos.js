var express = require('express');
var router = express.Router();
const ControladorPrestamos = require('../Controladores/PrestamosControlador')
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.get("/",function(req,res,next){
    ControladorPrestamos.Obtener()
    .then((result) => {
        res.render("prestamos",{prestamos:result})
    })
    .catch((e) => {
        console.error(e)
        res.redirect("/Login")
    })
})
router.get("/agregarPrestamo",function(req,res,next){
    res.render("agregarPrestamos")
})
router.post("/agregarPrestamo", function(req,res,next){
    ControladorPrestamos.Agregar(req.body)
    .then((result) => {
        res.redirect("/prestamos")
    })
    .catch((e) => {
        console.error(e)
        res.redirect("/Login")
    })
})
router.post("/", function(req,res,next){
    ControladorPrestamos.Unirse(req.cookies.jwt,req.body)
    .then(() => {
        res.redirect("/Login")
    })
    .catch((e) => {
      console.error(e)
      res.redirect("/Login")  
    })
})
router.delete("/eliminar",function(req,res,next){
    ControladorPrestamos.Eliminar(req.body.id)
    .then(() => {
        res.redirect("/prestamos")
    })
    .catch((e) => {
      console.error(e)
      res.redirect("/Login")  
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
        res.redirect("Login")
    });
})

module.exports = router;
