var express = require("express");
var router = express.Router();
const ControladorCooperativas = require("../Controladores/CooperativasControlador");
const ControladorUsuarios = require("../Controladores/UsuariosControlador");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", function (req, res, next) {
  ControladorUsuarios.Verificar(req.cookies.jwt)
    .then((token) => {
      ControladorCooperativas.Obtener()
        .then((cooperativas) => {
          res.render("cooperativas", {
            cooperativa: cooperativas,
            usuario: token,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    })
    .catch((e) => {
      res.render("error", { message: e.message, error: e });
    });
});

router.post("/", function (req, res, next) {
  if (req.body.id) {
    ControladorCooperativas.Unirse(req.cookies.jwt, req.body)
      .then(() => {
        res.redirect("/Login");
      })
      .catch((e) => {
        console.error(e);
        res.redirect("/Login");
      });
  } else {
    ControladorCooperativas.SalirCooperativa(
      req.cookies.jwt,
      req.body.idCoop,
      req.body.monto
    )
      .then(() => {
        res.redirect("/Login");
      })
      .catch((e) => {
        console.error(e);
        res.redirect("/Login");
      });
  }
});

router.get("/agregarCooperativa", function (req, res, next) {
  res.render("agregarCooperativa");
});
router.post("/agregarCooperativa", function (req, res, next) {
  ControladorCooperativas.Agregar(req.body)
    .then(() => {
      res.redirect("/cooperativas");
    })
    .catch((e) => {
      console.error(e);
      res.render("error", { message: e.message, error: e });
    });
});
router.delete("/eliminar", function (req, res, next) {
  ControladorCooperativas.Eliminar(req.body.id)
    .then(() => {
      res.redirect("/cooperativas");
    })
    .catch((e) => {
      console.error(e);
      res.render("error", { message: e.message, error: e });
    });
});
router.get("/editar/:id", function (req, res, next) {
  res.render("editarCoop", { id: req.params.id });
});
router.put("/editar/:id", function (req, res, next) {
  ControladorCooperativas.Editar(req.params.id, req.body)
    .then(() => {
      res.redirect("/cooperativas");
    })
    .catch((e) => {
      console.error(e);
      res.render("error", { message: e.message, error: e });
    });
});

module.exports = router;
