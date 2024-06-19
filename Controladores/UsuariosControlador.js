let usuariosModelos = require("../Modelos/UsuariosModelos")

class ControladorUsuarios{

    Registrar(Datos){
        return new Promise((resolve,reject)=>{
            if(usuariosModelos.Registrar(Datos)){
                resolve()
            }else{
                reject(e)
            }
        })
    }
    Login(Datos){
        return new Promise((resolve,reject)=>{
            let token = usuariosModelos.Login(Datos)
            if(token){
                resolve(token)
            }else{
                reject(e)
            }
        })
    }
}

module.exports = new ControladorUsuarios