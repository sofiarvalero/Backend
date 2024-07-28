const conexion = require("../conexionBD")
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const CuentasControlador = require("../Controladores/CuentasControlador")

    class CuentasModelos{
        CrearCorriente(ID){
            return new Promise(async(resolve,reject)=>{
                let numeroCuenta = ""
            
                     for(let i = 0;i<10;i++){
                        numeroCuenta += await new Promise((resolve,reject)=>{
                            resolve(Math.floor(Math.random() * 10));
                        })
                        console.log(numeroCuenta)
                    }
                    let query = `INSERT INTO cuentas (tipo, saldo, usuario_id, numero) VALUES ('corriente', 0, ${ID},${Number(numeroCuenta)})`
                    conexion.query(query,function(err,result){
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    })
                
               
               
            })
        }
        CrearAhorro(ID){
            return new Promise(async(resolve,reject)=>{
                let numeroCuenta = ""
                let decodificado = jwt.decode(ID,process.env.JWT_FIRMA)
                let interes = 0.005
                     for(let i = 0;i<10;i++){
                        numeroCuenta += await new Promise((resolve,reject)=>{
                            resolve(Math.floor(Math.random() * 10));
                        })
                        console.log(numeroCuenta)
                    }

                    let confirmar = `SELECT * FROM cuentas WHERE usuario_id = ${decodificado.id} AND tipo = 'ahorro'`
                    conexion.query(confirmar,function(err,result){
                        if(err){
                            reject(err)
                        }else{
                            if(result.length > 0){
                                reject(new Error("Ya tienes una cuenta de ahorro"))
                            }else{
                                let query = `INSERT INTO cuentas (tipo, saldo, usuario_id, numero, interes) VALUES ('ahorro', 0, ${decodificado.id},${Number(numeroCuenta)}, ${interes})`
                                conexion.query(query,function(err,result){
                                     if(err){
                                        reject(err)
                                     }else{
                                        resolve()
                                     }
                    })
                            }
                        }
                    })

                    
                
               
               
            })
        }
        ObtenerSaldoCorriente(cookie){
            return new Promise((resolve,reject)=>{
                let decodificado = jwt.decode(cookie,process.env.JWT_FIRMA)
                let query = `SELECT * FROM cuentas WHERE usuario_id = ${decodificado.id}`
                conexion.query(query,function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        if(result.length===0){
                            reject(new Error("No tiene cuenta corriente"))
                        }else{
                            resolve(result[0])
                        }
                    }
                    
                })
            })
        }
        ObtenerSaldoAhorro(cookie){
            return new Promise((resolve,reject)=>{
                let decodificado = jwt.decode(cookie,process.env.JWT_FIRMA)
                let query = `SELECT * FROM cuentas WHERE usuario_id = ${decodificado.id} AND tipo = 'ahorro'`
                conexion.query(query,function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        if(result.length===0){
                            reject(new Error("No tiene cuenta de Ahorro"))
                        }else{
                            resolve(result[0])
                        }
                    }
                    
                })
            })
        }
        AgregarSaldo(datos,cookie){
            return new Promise((resolve,reject)=>{
                let decodificado = jwt.decode(cookie,process.env.JWT_FIRMA)
                if(datos.valorCorriente){
                    let query = `UPDATE cuentas SET saldo = saldo + ${datos.valorCorriente} WHERE usuario_id = ${decodificado.id} AND tipo = 'corriente'`
                    conexion.query(query,function(err,result){
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    }) 
                }else{
                    let query = `UPDATE cuentas SET saldo = saldo + ${datos.valorAhorro} WHERE usuario_id = ${decodificado.id} AND tipo = 'ahorro'`
                    conexion.query(query,function(err,result){
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    }) 
                }
            })
        }
        EliminarCorriente(id){
            return new Promise((resolve, reject) => {
              let query = `DELETE FROM cuentas WHERE id = ${id} AND tipo = 'corriente'`
              conexion.query(query,function(err,result){
                if(err){
                  reject(err)
                }else{
                  resolve()
                }
              })
            })
         }
         EliminarAhorro(id){
            return new Promise((resolve, reject) => {
              let query = `DELETE FROM cuentas WHERE id = ${id} AND tipo = 'ahorro'`
              conexion.query(query,function(err,result){
                if(err){
                  reject(err)
                }else{
                  resolve()
                }
              })
            }) 
        } 
        Transferencia(user,datos){
            return new Promise((resolve, reject) => {
                let concepto = datos.concepto
                let monto = datos.monto
                let usuario = datos.usuario
                let cuentaDestino = datos.destino
                let cuentaUsuario = datos.cuenta
                let clave = datos.clave
                let usuarioDestinoID = null
                let decodificado = jwt.decode(user,process.env.JWT_FIRMA)
                let queryContraseña = `SELECT * FROM usuarios WHERE id = ${decodificado.id}`
                conexion.query(queryContraseña,async function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        let claveBD=result[0].clave
                        let usuarioOrigen=result[0].usuario
                        let claveDesencriptada = await bcryptjs.compare(clave,claveBD)
                        if(claveDesencriptada){
                            let query = `SELECT * FROM cuentas WHERE usuario_id = ${decodificado.id} AND tipo = '${cuentaUsuario}'`
                            let queryUser = `SELECT * FROM usuarios WHERE usuario = '${usuario}'`
                            conexion.query(queryUser,function(err,result){
                                if(err){
                                    reject(err)
                                }else{
                                    usuarioDestinoID = result[0].id
                                    console.log(usuarioDestinoID)
                                }
                            })
                            conexion.query(query,function(err,result){
                                if(err){
                                    reject(err)
                                }else{
                                    if(result.length === 0){
                                        reject(new Error('No se encontro la cuenta'))
                                    }else{
                                        let cuenta = result[0]
                                        if(cuenta.saldo>=monto){
                                            let queryUsuarioDestino = `SELECT saldo AS saldoDestino FROM cuentas WHERE numero = '${cuentaDestino}' AND usuario_id = ${usuarioDestinoID} `
                                            conexion.query(queryUsuarioDestino,function(err,result){
                                                if(err){
                                                    reject(err)
                                                }else{
                                                    if(result.length>0){
                                                        let saldoDestino = result[0].saldoDestino + monto
                                                        let saldoOrigen = cuenta.saldo - monto
                                                        let queryUpdateDestino = `UPDATE cuentas SET saldo =${saldoDestino} WHERE numero = ${cuentaDestino}`
                                                        let queryUpdateOrigen = `UPDATE cuentas SET saldo =${saldoOrigen} WHERE usuario_id = ${decodificado.id} AND tipo = '${cuentaUsuario}'`
                                                        conexion.query(queryUpdateDestino,function(err,result){
                                                            if(err){
                                                                reject(err)
                                                            }else{
                                                                conexion.query(queryUpdateOrigen,async function(err,result){
                                                                    if(err){
                                                                        reject(err)
                                                                    }else{
                                                                            let fecha = new Date()
                                                                            let fechaHora = fecha.toLocaleDateString()
                                                                            let operacion = ""
                                                                            for(let i = 0;i<5;i++){
                                                                                operacion += await new Promise((resolve,reject)=>{
                                                                                    resolve(Math.floor(Math.random() * 10));
                                                                                })
                                                                            }
                                                                            let queryRegistro = `INSERT INTO transferencias (usuarioOrigen,usuarioDestino,monto,concepto,cuentaOrigen,cuentaDestino,fecha,operacion) VALUES ('${usuarioOrigen}','${usuario}',${monto},'${concepto}',${cuenta.numero},${cuentaDestino},'${fechaHora}','${operacion}')`
                                                                            conexion.query(queryRegistro,function(err,result){
                                                                                if(err){
                                                                                    reject(err)
                                                                                }else{
                                                                                    resolve("Transferencia Realizada con exito")
                                                                                }
                                                                            })
                                                                        }
                                                                })
                                                            }
                                                        })

                                                    }else{
                                                        reject(new Error("El Usuario y el numero de cuenta no coinciden"))
                                                    }
                                                }
                                            })
                                        }else{
                                            reject(new Error("El saldo no es suficiente"))
                                        }
                                    }
                                }
                            })
                        }else{
                            reject(new Error("Clave Incorrecta"))
                        }
                    }
                })
               
            })
        }
     Registro(usuario){
        return new Promise((resolve, reject) => {
            let decodificado = jwt.decode(usuario,process.env.JWT_FIRMA)
            let query = `SELECT * FROM transferencias WHERE usuarioDestino = '${decodificado.usuario}' OR usuarioOrigen = '${decodificado.usuario}'`
            conexion.query(query,function(err,result){
                if(err){
                reject(err)
                }else{
                    resolve(result)
                }
            })
        })
     }   
    }

module.exports = new CuentasModelos