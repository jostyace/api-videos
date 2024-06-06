import express from 'express'
import { subirArchivos } from '../config/multer.js'
import { logueadoMiddleware } from '../middleware/logueadoMiddleware.js'
import { actualizarVideo, categoriaVideo, eliminarVideo, estadisticaCategoria, estadisticaReproduccion, listadoVideosPorTarea, informacionVideo, listadoVideos, registrarVideo, listadoVideosPorUsuario, getMiniatura, getGrafica } from '../controllers/videosController.js'


const router = express.Router()

// logueadoMiddleware, subirArchivos.single('NuevoVideo')
router.post('/subir', subirArchivos.fields([{ name: 'miniatura', maxCount: 1 }, { name: 'video', maxCount: 1 }]), registrarVideo)
router.patch('/actualizar/:id', subirArchivos.fields([{ name: 'miniatura', maxCount: 1 }]), actualizarVideo)
router.delete('/eliminar/:id', eliminarVideo)
router.get('/:filename', getMiniatura) // mostrar la miniatura

// logueadoMiddleware, esAdmin,
router.get('/', listadoVideos)
router.get('/tareas/:id', listadoVideosPorTarea)
router.get('/usuario/:id', listadoVideosPorUsuario)
router.get('/:id', informacionVideo)
router.get('/etiqueta/:etiqueta', categoriaVideo)
router.get('/estadisticas/reproducciones/:id ', estadisticaReproduccion)
router.get('/estadisticas/etiquetas/:nombre_etiqueta ', estadisticaCategoria)
router.get('/estadisticas/getGrafica/:filename', getGrafica)

export default router
