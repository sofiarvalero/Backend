const CooperativasModelos = require('../Modelos/CooperativasModelos')

class ControladorCooperativas{
    Obtener(){
        return new Promise((resolve,reject)=>{
            CooperativasModelos.Obtener()
            .then((cooperativas) => {
                resolve(cooperativas)
            })
            .catch((e) => {
                reject(e)    
            })
        })
    }
    Agregar(datos){
        return new Promise((resolve,reject)=>{
            CooperativasModelos.Agregar(ID,datos)
            .then((result) => {
                resolve(result)
            })
            .catch((e) => {
              reject(e)  
            })
        })
    }
    Unirse(ID,datos){
        return new Promise((resolve,reject)=>{
            CooperativasModelos.Unirse(ID,datos)
            .then(() => {
                resolve()
            })
            .catch((e) => {
              reject(e)  
            })
        })
    }
}
module.exports = new ControladorCooperativas