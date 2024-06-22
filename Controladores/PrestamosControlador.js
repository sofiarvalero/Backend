const PrestamosModelos = require("../Modelos/PrestamosModelos")

class ControladorPrestamos{
    Obtener(){
        return new Promise((resolve,reject)=>{
            PrestamosModelos.Obtener()
            .then((result) => {
                resolve(result)
            })
            .catch((e) => {
                reject(e)
            });
        })
    }
    Agregar(datos){
        return new Promise((resolve,reject)=>{
            PrestamosModelos.Agregar(datos)
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
            PrestamosModelos.Unirse(ID,datos)
            .then(() => {
                resolve()
            })
            .catch((e) => {
              reject(e)  
            })
        })
    }
    ObtenerPrestamoUsuario(datos){
        return new Promise((resolve,reject)=>{
            PrestamosModelos.ObtenerPrestamoUsuario(datos)
            .then((result) => {
                resolve(result)
            })
            .catch((e) => {
              reject(e)  
            })
        })
    }
    Eliminar(id){
        return new Promise((resolve,reject)=>{
            PrestamosModelos.Eliminar(id)
            .then(() => {
              resolve()  
            })
            .catch((e) => {
                reject(e)
            })
        })
    }
    Editar(id,datos){
        return new Promise((resolve, reject) => {
            PrestamosModelos.Editar(id,datos)
            .then(() => {
                resolve()
            })
            .catch((e) => {
               reject(e) 
            });
        })
    }
}
module.exports = new ControladorPrestamos