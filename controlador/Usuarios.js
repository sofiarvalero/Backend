let arrayUsers = []
let contador = 1
let usuarioAunt = {}
let cooperativas = require("../cooperativas")

class ControladorUsuarios {
    Registrar(datos) {
      let username = datos.userName
      for(let i= 0; i<arrayUsers.length;i++){
        if(arrayUsers[i].userName == username){
          return "El usuario ya existe"
      }
     }
      let objeto = {
        nombre:datos.nombre,
        clave: datos.clave,
        userName: username,
        saldo: 0,
        id: contador,
        cooperativas: []
      }
      arrayUsers.push(objeto)
      contador++
      console.log(arrayUsers)
      return true
    }
    Login(datos){
      let objetoLogin = {
        userName: datos.userName,
        clave: datos.clave
      }
      console.log(objetoLogin)
      for(let i= 0; i<arrayUsers.length;i++){
        if(arrayUsers[i].userName == objetoLogin.userName && arrayUsers[i].clave == objetoLogin.clave){
          console.log("Validacion correcta")
          usuarioAunt = arrayUsers[i]
          return true
        }
       }
        console.log("Fallo al validar")
        console.log(arrayUsers)
        return null
      }
      ObtenerUsuario(){
        return usuarioAunt
      }
      AgregarCooperativa(id){
        
        usuarioAunt.cooperativas.push("Eres parte de la cooperativa numero "+Number(id))
        for(let i =0;i<cooperativas.length;i++){
          if(cooperativas[i].id==id){
            cooperativas[i].usuarios.push(usuarioAunt.nombre)
          }
        }
      }
      ModificarSaldo(valor){
        usuarioAunt.saldo = usuarioAunt.saldo + valor
      }
    
    }
  


 module.exports = new ControladorUsuarios
  
