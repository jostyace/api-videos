import express from 'express'
import { informacionUsuario, iniciarSesion } from '../controllers/usersController.js'
import { crearNivel, editarNivel, eliminarNivel, listarNiveles, obtenerNivelPorId } from '../controllers/nivelesController.js'

const router = express.Router()

//Rutas protegidas, disponibles solo para Admin
router.post('/niveles/crear', crearNivel)
router.patch('/niveles/editar/:id',  editarNivel)
router.delete('/niveles/eliminar/:id',  eliminarNivel)
router.get('/niveles/:id',  obtenerNivelPorId)

//Ruta no protegida, dispobible para el formulario de Registro
router.get('/niveles',  listarNiveles)

export default router