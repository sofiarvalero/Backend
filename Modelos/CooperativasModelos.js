const conexion = require("../conexionBD")
const jwt = require('jsonwebtoken')

class CooperativasModelos{
    Obtener(){
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM cooperativas'
            conexion.query(query,function(err,result){
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
    Agregar(datos){
        return new Promise((resolve,reject)=>{
            let monto = datos.montoTotal
            let fecha = datos.fechaPago
            let pago = datos.depositoMensual
            let duracion = datos.duracion
            let usuario = datos.responsable
            let query = `SELECT * FROM usuarios WHERE usuario = '${usuario}' `
            conexion.query(query,function(err,result){
                if(err){
                    reject(err)
                }else{
                    if(result.length > 0){
                        let query2 = `INSERT INTO cooperativas (montoTotal, fechaPago, depositoMensual, usuarioResponsable, duracion) VALUES ('${monto}','${fecha}','${pago}','${usuario}', '${duracion}')`
                        conexion.query(query2,function(err,result){
                         if(err){
                            reject(err)
                         }else{
                            resolve()
                          } })
                    }else{
                        reject(new Error("Este usuario no se encuentra"))
                    }
                }
            })
            
        })
    }
    Unirse(ID,datos){
        return new Promise((resolve,reject)=>{
            let decodificado = jwt.decode(ID,process.env.JWT_FIRMA)
            let idcoop = datos.id
            let query = `SELECT * FROM cuentas WHERE usuario_id = ${decodificado.id}`
            conexion.query(query,function(err,result){
                if(err){
                    reject(err)
                }else{
                    let resultUser = result
                    
                    let query2 = `SELECT * FROM cooperativas WHERE id = '${idcoop}'`
                    conexion.query(query2,function(err,result){
                        if(err){
                            reject(err)
                        }else{
                            let resultCoop = result
                            let query3 = `INSERT INTO cuentacooperativa (idCuenta, idCooperativa, idUsuario) VALUES (${resultUser[0].id},${resultCoop[0].id},${resultUser[0].usuario_id})` 
                            conexion.query(query3,function(err,result){
                                if(err){
                                    reject(err)
                                }else{
                                    let query4 =  `UPDATE cuentas SET saldo = saldo + ${resultCoop[0].montoTotal} WHERE usuario_id = ${decodificado.id} AND tipo = 'corriente'`
                                    conexion.query(query4,function(err,result){
                                        if(err){
                                            reject(err)
                                        }else{
                                            resolve()
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
             })
         })
        }
    
}
module.exports = new CooperativasModelos