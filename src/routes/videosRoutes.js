import express from 'express'
import { subirArchivos } from '../config/multer.js'
import { logueadoMiddleware } from '../middleware/logueadoMiddleware.js'
import { actualizarVideo, categoriaVideo, eliminarVideo, estadisticaCategoria, estadisticaReproduccion, informacionVideo, listadoVideos, registrarVideo } from '../controllers/videosController.js'


const router = express.Router()

// logueadoMiddleware, subirArchivos.single('NuevoVideo')
router.post('/videos/subir', subirArchivos.fields([{ name: 'miniatura', maxCount: 1 },{ name: 'video', maxCount: 1 }]), registrarVideo)
router.patch('/videos/actualizar/:id', subirArchivos.fields([{ name: 'miniatura', maxCount: 1 }]), actualizarVideo)
router.delete('/videos/eliminar/:id', eliminarVideo)

// logueadoMiddleware, esAdmin,
router.get('/videos', listadoVideos)
router.get('/videos/:id', informacionVideo)
router.get('/videos/etiqueta/:etiqueta', categoriaVideo)
router.get('/videos/estadísticas/reproducciones/:id ', estadisticaReproduccion)
router.get('/videos/estadísticas/etiquetas/:nombre_etiqueta ', estadisticaCategoria)

export default router
