const conexion = require("../conexionBD")

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
    }

module.exports = new CuentasModelos