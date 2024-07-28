const conexion = require("../conexionBD");
const jwt = require("jsonwebtoken");

class CooperativasModelos {
  Obtener() {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM cooperativas";
      conexion.query(query, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  Agregar(datos) {
    return new Promise((resolve, reject) => {
      let monto = datos.montoTotal;
      let fecha = datos.fechaPago;
      let pago = datos.depositoMensual;
      let duracion = datos.duracion;
      let usuario = datos.responsable;
      if (pago * duracion != monto) {
        reject(new Error("Error en el pago"));
      } else {
        let query = `SELECT * FROM usuarios WHERE usuario = '${usuario}' `;
        conexion.query(query, function (err, result) {
          if (err) {
            reject(err);
          } else {
            if (result.length > 0) {
              let query2 = `INSERT INTO cooperativas (montoTotal, fechaPago, depositoMensual, usuarioResponsable, duracion) VALUES ('${monto}','${fecha}','${pago}','${usuario}', '${duracion}')`;
              conexion.query(query2, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            } else {
              reject(new Error("Este usuario no se encuentra"));
            }
          }
        });
      }
    });
  }
  Unirse(ID, datos) {
    return new Promise((resolve, reject) => {
      let decodificado = jwt.decode(ID, process.env.JWT_FIRMA);
      let idcoop = datos.id;
      let query = `SELECT * FROM cuentas WHERE usuario_id = ${decodificado.id}`;
      conexion.query(query, function (err, result) {
        if (err) {
          reject(err);
        } else {
          let resultUser = result;

          let query2 = `SELECT * FROM cooperativas WHERE id = '${idcoop}'`;
          conexion.query(query2, function (err, result) {
            if (err) {
              reject(err);
            } else {
              let resultCoop = result;
              let queryConfirmacion = `SELECT * FROM cuentacooperativa WHERE idCooperativa = ${idcoop} AND idUsuario = ${decodificado.id} `;
              conexion.query(queryConfirmacion, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  if (result.length > 0) {
                    reject(new Error("Ya eres parte de esta cooperativa"));
                  } else {
                    let query3 = `INSERT INTO cuentacooperativa (idCuenta, idCooperativa, idUsuario) VALUES (${resultUser[0].id},${resultCoop[0].id},${resultUser[0].usuario_id})`;
                    conexion.query(query3, function (err, result) {
                      if (err) {
                        reject(err);
                      } else {
                        let query4 = `UPDATE cuentas SET saldo = saldo + ${resultCoop[0].montoTotal} WHERE usuario_id = ${decodificado.id} AND tipo = 'corriente'`;
                        conexion.query(query4, function (err, result) {
                          if (err) {
                            reject(err);
                          } else {
                            resolve();
                          }
                        });
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    });
  }
  ObtenerCoopUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
      let id = jwt.decode(idUsuario, process.env.JWT_FIRMA);
      let query = `SELECT cooperativas.id AS id, cooperativas.fechaPago AS fecha, cooperativas.depositoMensual AS pago FROM cooperativas JOIN cuentacooperativa ON cuentacooperativa.idCooperativa = cooperativas.id  WHERE idUsuario = ${id.id} `;
      conexion.query(query, function (err, result) {
        if (err) {
          reject(err);
        } else {
          if (result.length > 0) {
            console.log(result);
            resolve(result);
          } else {
            reject();
          }
        }
      });
    });
  }
  Eliminar(id) {
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM cooperativas WHERE id = ${id} `;
      conexion.query(query, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  Editar(id, datos) {
    return new Promise((resolve, reject) => {
      let monto = datos.monto;
      let fecha = datos.fechaPago;
      let pago = datos.depositoMensual;
      let duracion = datos.duracion;
      let usuario = datos.responsable;
      let query = `UPDATE cooperativas SET montoTotal = '${monto}', fechaPago = '${fecha}', depositoMensual = '${pago}', duracion = '${duracion}', usuarioResponsable = '${usuario}' WHERE id = ${id} `;
      conexion.query(query, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  SalirCooperativa(idUsuario, idCooperativa, monto) {
    return new Promise((resolve, reject) => {
      let id = jwt.decode(idUsuario, process.env.JWT_FIRMA);
      console.log(idCooperativa, monto, id);
      let query = `DELETE FROM cuentacooperativa WHERE idUsuario = ${id.id} AND idCooperativa = ${idCooperativa}`;
      conexion.query(query, function (err, result) {
        if (err) {
          reject(err);
        } else {
          let query2 = `UPDATE cuentas SET saldo = saldo - ${monto} WHERE usuario_id = ${id.id} `;
          conexion.query(query2, function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      });
    });
  }
}
module.exports = new CooperativasModelos();
