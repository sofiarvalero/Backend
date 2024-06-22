const UsuariosModelos = require("../Modelos/UsuariosModelos")
let usuariosModelos = require("../Modelos/UsuariosModelos")

class ControladorUsuarios{

    Registrar(Datos){
        return new Promise((resolve,reject)=>{
        usuariosModelos.Registrar(Datos)
        .then(()=>{
            resolve()
        })
       .catch((e)=>{
        reject(e)
       })
        })
    }
    Login(Datos){
        return new Promise((resolve,reject)=>{
            usuariosModelos.Login(Datos)
            .then((result)=>{
                resolve(result)
            })
           .catch((e)=>{
            reject(e)
           })
        })
    }
    Logout(cookie){
        return new Promise((resolve,reject)=>{
            usuariosModelos.Logout(cookie)
            .then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            });
        })
    }
    Verificar(cookie){
        return new Promise((resolve,reject)=>{
            usuariosModelos.Verificar(cookie)
            .then((result) => {
                resolve(result)
            }).catch((e) => {
                reject(e)
            });
        })
    }
    Modificar(token,datos){
        return new Promise((resolve, reject) => {
            UsuariosModelos.Modificar(token,datos)
            .then((result) => {
                resolve(result)
            })
            .catch((e) => {
                reject(e)    
            });
        })
    }
    Eliminar(id){
        return new Promise((resolve, reject) => {
            UsuariosModelos.Eliminar(id)
            .then(() => {
                resolve()
            })
            .catch((e) => {
                reject(e)    
            });
        })
    }
}

module.exports = new ControladorUsuarios