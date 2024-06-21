const conexion = require("../conexionBD")
const jwt = require('jsonwebtoken')
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
    }

module.exports = new CuentasModelos