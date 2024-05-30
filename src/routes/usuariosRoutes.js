import express from 'express'

import { subirArchivos } from '../config/multer.js'
import {
  registrarUsuario,
  actualizarUsuario,
  informacionUsuario,
  listadoUsuarios,
  videosUsuario,
  historialUsuario
} from '../controllers/usersController.js'

const router = express.Router()
router.post('/usuarios/registro', subirArchivos.single('picture'), registrarUsuario)
router.get('/usuarios/:id', informacionUsuario)
router.get('/usuarios', listadoUsuarios)
router.patch('/usuarios/:id', subirArchivos.single('picture'), actualizarUsuario)
router.delete('/usuarios/:id', actualizarUsuario)
router.get('/usuarios/videos/:id', videosUsuario)
router.get('/usuarios/reproducciones/:id', historialUsuario)

export default router
