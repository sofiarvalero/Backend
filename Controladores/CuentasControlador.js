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
}

module.exports = new ControladorCuentas