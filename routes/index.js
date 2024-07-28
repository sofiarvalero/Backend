var express = require("express");
var router = express.Router();
const ControladorUsuarios = require("../Controladores/UsuariosControlador");
const ControladorCuentas = require("../Controladores/CuentasControlador");
const ControladorCooperativas = require("../Controladores/CooperativasControlador");
const ControladorPrestamos = require("../Controladores/PrestamosControlador");
const jwt = require("jsonwebtoken");
const e = require("express");
const UsuariosControlador = require("../Controladores/UsuariosControlador");
require("dotenv").config();

router.get("/Home", function (req, res, next) {
  res.render("Home");
});
router.post("/Home", function (req, res, next) {
  ControladorUsuarios.Login(req.body)
    .then((result) => {
      res.cookie("jwt", result);
      res.redirect("Login");
    })
    .catch((e) => {
      console.error(e);
      res.render("errorLogin", { message: e.message, error: e });
    });
});
router.get("/registrarse", function (req, res, next) {
  res.render("registrarse");
});
router.post("/registrarse", function (req, res, next) {
  ControladorUsuarios.Registrar(req.body)
    .then(() => {
      res.redirect("Home");
    })
    .catch((e) => {
      console.error(e);
      res.render("errorLogin", { message: e.message, error: e });
    });
});
router.get("/Login", function (req, res, next) {
  let token = req.cookies.jwt;
  let saldoCorriente = null;
  let saldoAhorro = null;
  let cooperativas = null;
  let prestamos = null;
  UsuariosControlador.VerificarAdmin(token)
    .then(() => {
      res.redirect("LoginAdmin");
    })
    .catch((e) => {
      console.log(e);
      UsuariosControlador.Verificar(token).then((usuario) => {
        ControladorCuentas.ObtenerSaldoCorriente(token)
          .then((corriente) => {
            saldoCorriente = corriente;
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            ControladorCuentas.ObtenerSaldoAhorro(token)
              .then((ahorro) => {
                saldoAhorro = ahorro;
              })
              .catch((e) => {
                console.error(e);
              })
              .finally(() => {
                ControladorCooperativas.ObtenerCoopUsuario(token)
                  .then((cooperativa) => {
                    cooperativas = cooperativa;
                  })
                  .catch((e) => {
                    console.error(e);
                  })
                  .finally(() => {
                    ControladorPrestamos.ObtenerPrestamoUsuario(token)
                      .then((prestamo) => {
                        prestamos = prestamo;
                      })
                      .catch((e) => {
                        console.error(e);
                      })
                      .finally(() => {
                        res.render("Login", {
                          usuario: usuario,
                          corriente: saldoCorriente,
                          ahorro: saldoAhorro,
                          coop: cooperativas,
                          prestamo: prestamos,
                        });
                      });
                  });
              });
          });
      });
    })
    .catch((e) => {
      console.error(e);
      res.render("error", { message: e.message, error: e });
    });
});

router.post("/Login", function (req, res, next) {
  ControladorCuentas.AgregarSaldo(req.body, req.cookies.jwt)
    .then(() => {
      res.redirect("Login");
    })
    .catch((err) => {
      console.error(err);
      res.render("error", { message: e.message, error: e });
    });
});
router.get("/editarUsuario/:id", function (req, res, next) {
  res.render("editarUsuario", { id: req.params.id });
});
router.put("/editarUsuario/:id", function (req, res, next) {
  console.log("LLegue");
  ControladorUsuarios.Modificar(req.params.id, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.error(e);
      res.render("error", { message: e.message, error: e });
    });
});
router.get("/logout", function (req, res, next) {
  ControladorUsuarios.Logout(req.cookies.jwt, req.body);
  res.clearCookie("jwt");
  res.redirect("Home");
});

router.delete("/eliminarUsuario", function (req, res, next) {
  ControladorUsuarios.Eliminar(req.body.id)
    .then(() => {
      res.send("Usuario Eliminado");
    })
    .catch((e) => {
      console.error(e);
      res.render("error", { message: e.message, error: e });
    });
});
router.get("/LoginAdmin", function (req, res, next) {
  ControladorUsuarios.Verificar(req.cookies.jwt)
    .then((result) => {
      res.render("LoginAdmin", { admin: result });
    })
    .catch((e) => {
      res.render("error", { message: e.message, error: e });
    });
});
router.get("/verUsuarios", function (req, res, next) {
  ControladorUsuarios.VerUsuarios()
    .then((result) => {
      res.render("Verusuarios", { usuarios: result });
    })
    .catch((e) => {
      console.error(e);
      res.render("error", { message: e.message, error: e });
    });
});

module.exports = router;
