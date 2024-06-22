var express = require('express');
var router = express.Router();
const ControladorCooperativas = require('../Controladores/CooperativasControlador')
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.get("/",function(req,res,next){
    ControladorCooperativas.Obtener()
    .then((cooperativas) => {
        res.render("cooperativas",{cooperativa:cooperativas})
    })
    .catch((e) => {
        console.error(e)
    })
})

router.post("/", function(req,res,next){
    ControladorCooperativas.Unirse(req.cookies.jwt,req.body)
    .then(() => {
        res.redirect("/Login")
    })
    .catch((e) => {
      console.error(e) 
      res.redirect("/Login")
    })
})

router.get("/agregarCooperativa",function(req,res,next){
    res.render("agregarCooperativa")
})
router.post("/agregarCooperativa",function(req,res,next){
    ControladorCooperativas.Agregar(req.body)
    .then(() => {
        res.redirect("/cooperativas")
    })
    .catch((e) => {
        console.error(e)
        res.redirect("/cooperativas")
    })
})
router.delete("/eliminar",function(req,res,next){
    ControladorCooperativas.Eliminar(req.body.id)
    .then(() => {
        res.redirect("/cooperativas")
    })
    .catch((e) => {
      console.error(e)
      res.redirect("/Login")  
    })
})
router.get("/editar/:id",function(req,res,next){
    res.render("editarCoop", {id:req.params.id})
})
router.put("/editar/:id",function(req,res,next){
    ControladorCooperativas.Editar(req.params.id,req.body)
    .then(() => {
        res.redirect("/cooperativas")
    })
    .catch((e) => {
        console.log(e)
        res.redirect("Login")
    });
})

module.exports = router;
