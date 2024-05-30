import express from 'express'

import { subirArchivos } from '../config/multer.js'
import {
  registrarUsuario,
  actualizarUsuario,
  informacionUsuario,
  listadoUsuarios,
  videosUsuario,
  historialUsuario,
  eliminarUsuario,
  iniciarSesion
} from '../controllers/usersController.js'

const router = express.Router()

//Sin Middleware de Auth
router.post('/usuarios/registro', subirArchivos.single('imagenPerfil'), registrarUsuario)
router.post('/usuarios/login', iniciarSesion)

//Varificar login con Middleware de Auth
router.get('/usuarios/:id',  informacionUsuario)
router.get('/usuarios/reproducciones/:id', historialUsuario)
router.get('/usuarios/videos/:id', videosUsuario)
router.patch('/usuarios/actualizar/:id', subirArchivos.single('imagenPerfil'), actualizarUsuario)
router.delete('/usuarios/eliminar/:id', eliminarUsuario)

//Verificar si el Usuario es Admin (Teacher)
router.get('/usuarios', listadoUsuarios)

export default router