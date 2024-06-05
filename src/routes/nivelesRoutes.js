import express from 'express'
import { crearNivel, editarNivel, eliminarNivel, listarNiveles, obtenerNivelPorId } from '../controllers/nivelesController.js'

const router = express.Router()

//Rutas protegidas, disponibles solo para Admin
router.post('/crear', crearNivel)
router.patch('/editar/:id',  editarNivel)
router.delete('/eliminar/:id',  eliminarNivel)
router.get('/:id',  obtenerNivelPorId)

//Ruta no protegida, dispobible para el formulario de Registro
router.get('/',  listarNiveles)

export default router