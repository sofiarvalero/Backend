let cooperativas = require("../cooperativas")
let prestamos = require("../cuentasPrestamo")
const ControladorCuentas = require('../Controladores/CuentasControlador')
const conexion = require("../conexionBD")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

class ModeloUsuarios {
    Registrar(datos) {
      return new Promise(async(resolve,reject)=>{
        let nombre = datos.nombre
        let usuario = datos.usuario
        let clave = datos.clave
        let cedula = datos.cedula
        let telefono = datos.telefono
        let claveEncriptada = await bcryptjs.hash(clave,8)
        let query = `INSERT INTO usuarios (nombre,usuario,clave,cedula,telefono) VALUES ('${nombre}','${usuario}', '${claveEncriptada}', '${cedula}', '${telefono}')`
        conexion.query(query,(err,result)=>{ 
          if(err){
            reject(err)
          }else{
            let query2 = `SELECT * FROM usuarios WHERE usuario = '${usuario}'`
            conexion.query(query2,(err,result)=>{
              if(err){
                reject(err)
              }else{
                let ID = result[0].id
                ControladorCuentas.CrearCorriente(ID)
                .then(()=>{
                  resolve()
                })
                .catch((e)=>{
                  reject(e)
                })
              }
            })
          }
        })
      })
     

    }
    Login(datos){
      return new Promise((resolve,reject)=>{
        let usuario = datos.usuario
        let clave = datos.clave
        let query = `SELECT * FROM usuarios WHERE usuario = '${usuario}'`
        conexion.query(query,async function(err,result){
          if(err){
            reject(err)
          }else{
            if(result.length > 0){
              let claveEncriptada = result[0].clave
              let claveDesencriptada = await bcryptjs.compare(clave,claveEncriptada)
              if(claveDesencriptada){
                let id = result[0].id
                let nombre = result[0].nombre
                let cedula = result[0].cedula
                let telefono = result[0].telefono
                const token = jwt.sign({id:id,usuario:usuario,nombre:nombre,cedula:cedula,telefono:telefono}, process.env.JWT_FIRMA)
                resolve(token)
              }else{
                reject(new Error("Contraseña Incorrecta"))
              }
            }else{
              reject(new Error("Usuario no Encontrado"))
            }
          }
        })
      })
      
      }
      AgregarCooperativa(id){
        
        for(let i =0;i<cooperativas.length;i++){
          if(cooperativas[i].id==id){
            cooperativas[i].usuarios.push(usuarioAunt.nombre)
            usuarioAunt.cooperativas.push("Eres parte de la cooperativa numero "+Number(id)+ " Y tus dias de pago son los " + cooperativas[i].fechaPago)

          }
        }
      }
    
    ModificarUsuario(datos){
      let nuevoNombre = datos.nuevoNombre
      let nuevoClave = datos.nuevaClave
      let nuevoUsuario = datos.nuevoUsuario
      usuarioAunt.nombre = nuevoNombre
      usuarioAunt.clave = nuevoClave
      usuarioAunt.userName= nuevoUsuario
      return usuarioAunt
    }
   
   
    Logout(cookie){
      return new Promise((resolve,reject)=>{
        if(cookie){
          resolve()
        }else{
          reject(new Error("No has iniciado sesion"))
        }
      })
    }
   
    EliminarUsuario(id){
      arrayUsers.splice(id,1)
      return arrayUsers
    }
    }
  


 module.exports = new ModeloUsuarios
  
