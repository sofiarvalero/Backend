let arrayUsers = []

class ControlesDeAhorros {
    Registrar(datos) {
      let objeto = {
        nombre:datos.nombre,
        clave: datos.clave,
        userName: datos.user,
        saldo: 0
      }
      arrayUsers.push(objeto)
      console.log(arrayUsers)
      return true
    }
    Login(datos){
      let objetoLogin = {
        nombre:datos.nombre,
        clave: datos.clave
      }
      console.log(objetoLogin)
      for(let i= 0; i<arrayUsers.length;i++){
        if(arrayUsers[i].nombre == objetoLogin.nombre && arrayUsers[i].clave == objetoLogin.clave){
          console.log("Validacion correcta")
          return true
        }else{
          console.log("Fallo al validar")
          return null
        }
      }
    }
     
}

 module.exports = new ControlesDeAhorros