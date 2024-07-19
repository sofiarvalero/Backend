
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
        let rol = datos.rol
        let claveEncriptada = await bcryptjs.hash(clave,8)
        let query = `INSERT INTO usuarios (nombre,usuario,clave,cedula,telefono,tipo) VALUES ('${nombre}','${usuario}', '${claveEncriptada}', '${cedula}', '${telefono}','${rol}')`
        conexion.query(query,(err,result)=>{ 
          if(err){
            reject(err)
          }else{
            let query2 = `SELECT * FROM usuarios WHERE usuario = '${usuario}'`
            conexion.query(query2,(err,result)=>{
              if(err){
                reject(err)
              }else{
                if(rol==="usuario"){
                  let ID = result[0].id
                  ControladorCuentas.CrearCorriente(ID)
                  .then(()=>{
                    resolve()
                  })
                  .catch((e)=>{
                    reject(e)
                  })
                }else{
                  resolve()
                }
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
                let rol = result[0].tipo
                const token = jwt.sign({id:id,usuario:usuario,nombre:nombre,cedula:cedula,telefono:telefono,rol:rol}, process.env.JWT_FIRMA)
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
     
    
    Modificar(usuarioid,datos){
      return new Promise(async(resolve, reject) => {
        console.log("ahi vamos")
        let query1 = `SELECT clave FROM usuarios WHERE id = '${usuarioid}'`
        conexion.query(query1,async function(err,result){
          if(err){
            reject(err)
          }else{
            let claveEncriptada = result[0].clave
            let claveDesencriptada = await bcryptjs.compare(datos.contraseñaVieja,claveEncriptada)
            if(claveDesencriptada){
              let claveCodificada =  await bcryptjs.hash(datos.contraseñaNueva,8)
              let query = `UPDATE usuarios SET nombre = '${datos.nombre}', usuario = '${datos.usuario}',clave = '${claveCodificada}', telefono = '${datos.telefono}',cedula = '${datos.cedula}' WHERE id = '${usuarioid}'`
              conexion.query(query,function(err,result){
                if(err){
                  reject(err)
                }else{
                  resolve(result)
                }
              })
            }else{
              reject("Las contraseñas no coinciden")
            }

            
          }
        })
      })
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
   
    Eliminar(id){
      return new Promise((resolve, reject) => {
        let query = `DELETE FROM usuarios WHERE id = ${id}`
        conexion.query(query,function(err,result){
          if(err){
            reject(err)
          }else{
            resolve()
          }
        })
      })

    }
    Verificar(cookie){
      return new Promise((resolve,reject)=>{
        if(cookie){
          let decodificado = jwt.decode(cookie,process.env.JWT_FIRMA)
          let query = `SELECT * FROM usuarios WHERE id=${decodificado.id}`
          conexion.query(query,function(err,result){
            if(err){
              reject(err)
            }else{
              if(result.length===0){
                reject(new Error("No existe el usuario"))
              }else{
                resolve(decodificado)
              }
            }
          })

        }
      })
    }
    VerificarAdmin(cookie){
      return new Promise((resolve,reject)=>{
        if(cookie){
          let decodificado = jwt.decode(cookie,process.env.JWT_FIRMA)
          let query = `SELECT * FROM usuarios WHERE id=${decodificado.id}`
          conexion.query(query,function(err,result){
            if(err){
              reject(err)
            }else{
              if(result.length===0){
                reject(new Error("No existe el usuario"))
              }else{
                if(result[0].tipo==="admin"){
                  resolve()
                }else{
                  reject(new Error("No es administrador"))
                }
              }
            }
          })

        }
      })
    }
    VerUsuarios(){
      return new Promise((resolve,reject)=>{
        let query = `SELECT * FROM usuarios`
        conexion.query(query,function(err,results){
          if(err){
            reject(err)
          }else{
             resolve(results)
          }
        })
      })
    }
   }
    
  


 module.exports = new ModeloUsuarios
  
