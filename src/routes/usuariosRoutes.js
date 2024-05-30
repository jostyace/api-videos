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

router.post('/usuarios/registro', subirArchivos.single('imagenPerfil'), registrarUsuario) //ok
router.get('/usuarios/:id',  informacionUsuario) //ok
router.get('/usuarios', listadoUsuarios) //ok
router.patch('/usuarios/:id', subirArchivos.single('imagenPerfil'), actualizarUsuario) //ok
router.delete('/usuarios/:id', eliminarUsuario) //ok
router.post('/usuarios/login', iniciarSesion) //ok
router.get('/usuarios/videos/:id', videosUsuario)
router.get('/usuarios/reproducciones/:id', historialUsuario)

export default router