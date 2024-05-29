import express from 'express'

import { subirArchivos } from '../config/multer.js'
import {
  actualizarUsuario,
  informacionUsuario
} from '../controllers/usersController.js'


const router = express.Router()
router.post('/usuarios/registro', logueadoMiddleware, subirArchivos.single('picture'), registrarUsuario)
router.get('/usuarios/:id', logueadoMiddleware, informacionUsuario)
router.get('/usuarios', logueadoMiddleware, esAdmin, listadoUsuario)
router.patch('/usuarios/:id', logueadoMiddleware, subirArchivos.single('picture'), actualizarUsuario)
router.delete('/usuarios/:id', logueadoMiddleware, actualizarUsuario)
router.get('/usuarios/videos/:id', logueadoMiddleware, videosUsuario)
router.get('/usuarios/reproducciones/:id', logueadoMiddleware, historialUsuario)

export default router