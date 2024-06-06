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
  iniciarSesion,
  registrarDocente,
  listadoUsuariosNivel
} from '../controllers/usersController.js'

const router = express.Router()

// Sin Middleware de Auth
router.post('/registro', subirArchivos.single('imagenPerfil'), registrarUsuario)
router.post('/login', iniciarSesion)

// Varificar login con Middleware de Auth
router.get('/:id', informacionUsuario)
router.post('/registrodocente', subirArchivos.single('imagenPerfil'), registrarDocente)
router.get('/reproducciones/:id', historialUsuario)
router.get('/videos/:id', videosUsuario)
router.patch('/actualizar/:id', subirArchivos.single('imagenPerfil'), actualizarUsuario)
router.delete('/eliminar/:id', eliminarUsuario)

// Verificar si el Usuario es Admin (Teacher)
router.get('/', listadoUsuarios)
router.get('/nivel/:id', listadoUsuariosNivel)

export default router
