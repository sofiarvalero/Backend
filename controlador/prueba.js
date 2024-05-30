let arrayUsers = []

class ControlesDeAhorros {
    Registrar(datos) {
      let objeto = {
        nombre:datos.nombre,
        clave: datos.clave
      }
      arrayUsers.push(objeto)
      console.log(arrayUsers)
    }
    Login(datos){
      let objetoLogin = {
        nombre:datos.nombre,
        clave: datos.clave
      }
      for(let i= 0; i<arrayUsers.length;i++){
        if(arrayUsers[i] == objetoLogin ){
          let autenticacion = true
          return autenticacion
        }else{
          return null
        }
      }
    }
     
}

 module.exports = new ControlesDeAhorros