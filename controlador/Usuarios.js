let arrayUsers = []
let contador = 1
let usuarioAunt = {}
let cooperativas = require("../cooperativas")
let prestamos = require("../cuentasPrestamo")

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
        id: contador,
        cooperativas: [],
        tipoCuenta : [
          {
            tipo: "Corriente",
            saldo: 0
          }
        ],
        prestamistas: []
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
        
        for(let i =0;i<cooperativas.length;i++){
          if(cooperativas[i].id==id){
            cooperativas[i].usuarios.push(usuarioAunt.nombre)
            usuarioAunt.cooperativas.push("Eres parte de la cooperativa numero "+Number(id)+ " Y tus dias de pago son los " + cooperativas[i].fechaPago)

          }
        }
      }
      ModificarSaldoCorriente(valor){
        usuarioAunt.tipoCuenta[0].saldo = usuarioAunt.tipoCuenta[0].saldo + valor
      }
    ModificarUsuario(datos){
      let nuevoNombre = datos.nuevoNombre
      let nuevoClave = datos.nuevaClave
      let nuevoUsuario = datos.nuevoUsuario
      usuarioAunt.nombre = nuevoNombre
      usuarioAunt.clave = nuevoClave
      usuarioAunt.userName= nuevoUsuario
    }
    CrearCuentaAhorro(){
      if(!usuarioAunt.tipoCuenta[1]){
        usuarioAunt.tipoCuenta.push({
          tipo: "Cuenta Ahorro",
          saldo: 0,
          interes: 0.05
        })
      }else{
        return false
      }
    }
    ModificarSaldoAhorro(valor){
      if(usuarioAunt.tipoCuenta[1]){
        usuarioAunt.tipoCuenta[1].saldo = usuarioAunt.tipoCuenta[1].saldo + valor
      }
      else{
        return false
      }
    }
    CerrarSesion(){
      usuarioAunt = null
    }
    AgregarPrestamo(prestamo){
        console.log(prestamo)
      for(let i =0;i<prestamos.length;i++){
        if(prestamos[i].id==prestamo){
          prestamos[i].usuariosAsociados.push(usuarioAunt.nombre)
          usuarioAunt.prestamistas.push("Has pedido un prestamo a la cuenta de prestamos numero "+ prestamo + " ,Tus dias de pago son los " + prestamos[i].fechasPago)
          usuarioAunt.tipoCuenta[0].saldo =  usuarioAunt.tipoCuenta[0].saldo + prestamos[i].cantidadPrestamo

        }
      }
    }
    }
  


 module.exports = new ControladorUsuarios
  
