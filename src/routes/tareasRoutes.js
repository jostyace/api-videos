import express from 'express'
import { crearTarea, editarTarea, eliminarTarea, listarTareas, obtenerTareaPorId } from '../controllers/tareasController.js'

const router = express.Router()

//Rutas protegidas, disponibles solo para Admin
router.post('/crear', crearTarea)
router.patch('/editar/:id',  editarTarea)
router.delete('/eliminar/:id',  eliminarTarea)

//Ruta no protegida, dispobible para el formulario de Registro
router.get('/',  listarTareas)
router.get('/videos/:id', videosTareas)
router.get('/nivel/nivel_id',  listarTareas)
router.get('/:id',  obtenerTareaPorId)


export default router