const CuentasModelos = require('../Modelos/CuentasModelos')
class ControladorCuentas{
    CrearCorriente(ID){
        return new Promise((resolve,reject)=>{
            CuentasModelos.CrearCorriente(ID)
            .then(()=>{
                resolve()
            })
           .catch((e)=>{
                 reject(e)
           })
        })
    }
    CrearAhorro(ID){
        return new Promise((resolve,reject)=>{
            CuentasModelos.CrearAhorro(ID)
            .then(()=>{
                resolve()
            })
           .catch((e)=>{
                 reject(e)
           })
        })
    }
    ObtenerSaldoCorriente(cookie){
        return new Promise((resolve,reject)=>{
            CuentasModelos.ObtenerSaldoCorriente(cookie)
            .then((result) => {
                resolve(result)
            })
            .catch((e) => {
                reject(e)
            })
        })
    }
    ObtenerSaldoAhorro(cookie){
        return new Promise((resolve,reject)=>{
            CuentasModelos.ObtenerSaldoAhorro(cookie)
            .then((result) => {
                resolve(result)
            })
            .catch((e) => {
                reject(e)
            })
        })
    }
    AgregarSaldo(datos,cookie){
        return new Promise((resolve,reject)=>{
            CuentasModelos.AgregarSaldo(datos,cookie)
            .then(() => {
                resolve()
            })
            .catch((e) => {
              reject(e)  
            })
        })
    }
    EliminarCorriente(id){
        return new Promise((resolve, reject) => {
            CuentasModelos.EliminarCorriente(id)
            .then(() => {
                resolve()
            })
            .catch((e) => {
                reject(e)    
            });
        })
    }
    EliminarAhorro(id){
        return new Promise((resolve, reject) => {
            CuentasModelos.EliminarAhorro(id)
            .then(() => {
                resolve()
            })
            .catch((e) => {
                reject(e)    
            });
        })
    }
}

module.exports = new ControladorCuentas