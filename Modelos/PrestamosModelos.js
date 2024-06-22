const conexion = require('../conexionBD')
const jwt = require('jsonwebtoken')

class PrestamosModelos{
    Obtener(){
        return new Promise((resolve, reject) =>{
            let query = `SELECT * FROM prestamistas`
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
            let prestamo = datos.prestamo
            let fecha = datos.fechaPago
            let interes = datos.interes
            let usuario = datos.responsable
            let query = `SELECT * FROM usuarios WHERE usuario = '${usuario}' `
            conexion.query(query,function(err,result){
                if(err){
                    reject(err)
                }else{
                    if(result.length > 0){
                        let query2 = `INSERT INTO prestamistas (prestamo, fechaPagos, interes, usuarioResponsable) VALUES ('${prestamo}','${fecha}','${interes}','${usuario}')`
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
            let idPrestamo = datos.prestamo
            let query = `SELECT * FROM cuentas WHERE usuario_id = ${decodificado.id}`
            conexion.query(query,function(err,result){
                if(err){
                    reject(err)
                }else{
                    let resultUser = result
                    
                    let query2 = `SELECT * FROM prestamistas WHERE id = '${idPrestamo}'`
                    conexion.query(query2,function(err,result){
                        if(err){
                            reject(err)
                        }else{
                            let resultPrestamo = result
                            let queryConfirmacion = `SELECT * FROM cuentaprestamo WHERE idPrestamista = ${idPrestamo} AND idUsuario = ${decodificado.id} `
                            conexion.query(queryConfirmacion,function(err,result){
                                if(err){
                                    reject(err)
                                }else{
                                    if(result.length > 0){
                                        reject(new Error("Ya pediste este prestamo"))
                                    }else{
                                        let query3 = `INSERT INTO cuentaprestamo (idCuenta, idPrestamista, idUsuario) VALUES (${resultUser[0].id},${resultPrestamo[0].id},${resultUser[0].usuario_id})` 
                                      conexion.query(query3,function(err,result){
                                        if(err){
                                            reject(err)
                                        }else{
                                            let query4 =  `UPDATE cuentas SET saldo = saldo + ${resultPrestamo[0].prestamo} WHERE usuario_id = ${decodificado.id} AND tipo = 'corriente'`
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
                                }
                            })
                            
                        }
                    })
                }
             })
         })
        }
        ObtenerPrestamoUsuario(idUsuario){
            return new Promise((resolve,reject)=>{
                let id = jwt.decode(idUsuario,process.env.JWT_FIRMA)
                let query = `SELECT prestamistas.id AS id, prestamistas.fechaPagos AS fecha, prestamistas.interes AS interes FROM prestamistas JOIN cuentaprestamo ON cuentaprestamo.idPrestamista = prestamistas.id  WHERE idUsuario = ${id.id} `
                conexion.query(query,function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        if(result.length > 0){
                            console.log(result)
                            resolve(result)
                        }else{
                            reject()
                        }
                        
                    }
                })
            })
        }
        Eliminar(id){
            return new Promise((resolve, reject) => {
                let query = `DELETE FROM prestamistas WHERE id = ${id} `
                conexion.query(query, function(err, result){
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                })
            })
        }
        Editar(id,datos){
            return new Promise((resolve, reject) => {
                let prestamo = datos.prestamo
                let fecha = datos.fechaPago
                let interes = datos.interes
                let usuario = datos.responsable
                let query = `UPDATE prestamistas SET prestamo = '${prestamo}', fechaPagos = '${fecha}', interes = '${interes}', usuarioResponsable = '${usuario}' WHERE id = ${id} `
                conexion.query(query, function(err, result){
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                })        
            })
    }
}
module.exports =  new PrestamosModelos