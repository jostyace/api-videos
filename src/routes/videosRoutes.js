import express from 'express'
import { subirArchivos } from '../config/multer.js'
import { logueadoMiddleware } from '../middleware/logueadoMiddleware.js'
import { actualizarVideo, categoriaVideo, eliminarVideo, estadisticaCategoria, estadisticaReproduccion, informacionVideo, listadoVideos, registrarVideo } from '../controllers/videosController.js'

const router = express.Router()
// logueadoMiddleware, subirArchivos.single('NuevoVideo')
router.post('/videos/registro', subirArchivos.fields([{ name: 'miniatura', maxCount: 1 }, { name: 'video', maxCount: 1 }]), registrarVideo)
router.patch('/videos/actualizar/:id', actualizarVideo)
router.delete('/videos/delete/:id', eliminarVideo)
// logueadoMiddleware, esAdmin,
router.get('/videos', listadoVideos)
router.get('/videos/:id', informacionVideo)
router.get('/videos/etiqueta/:etiqueta', categoriaVideo)
router.get('/videos/estadisticas/reproducciones', estadisticaReproduccion)
router.get('/videos/estadisticas/etiquetas', estadisticaCategoria)

export default router
