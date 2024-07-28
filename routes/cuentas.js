var express = require("express");
var router = express.Router();
const ControladorCuentas = require("../Controladores/CuentasControlador");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/Ahorro", function (req, res, next) {
  ControladorCuentas.CrearAhorro(req.cookies.jwt)
    .then(() => {
      res.redirect("/Login");
    })
    .catch((e) => {
      console.error(e);
      res.render("error", { message: e.message, error: e });
    });
});
router.delete("/eliminarCorriente/:id", function (req, res, next) {
  ControladorCuentas.EliminarCorriente(req.params.id)
    .then(() => {
      res.send("Cuenta eliminada");
    })
    .catch((err) => {
      console.error(err);
      res.send("Algo Fallo");
    });
});
router.delete("/eliminarAhorro/:id", function (req, res, next) {
  ControladorCuentas.EliminarAhorro(req.params.id)
    .then(() => {
      res.send("Cuenta Ahorro eliminado");
    })
    .catch((err) => {
      console.error(err);
      res.send("Algo Fallo");
    });
});
router.get("/transferencias", function (req, res, next) {
  res.render("transferencia", { mensaje: null });
});
router.post("/transferencias", function (req, res, next) {
  ControladorCuentas.Transferencia(req.cookies.jwt, req.body)
    .then((result) => {
      res.render("transferencia", { mensaje: result });
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { message: e.message, error: e });
    });
});
router.get("/registro", function (req, res, next) {
  ControladorCuentas.Registro(req.cookies.jwt)
    .then((registro) => {
      console.log(registro);
      res.render("verTransferencias", { transferecias: registro });
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { message: e.message, error: e });
    });
});

module.exports = router;
