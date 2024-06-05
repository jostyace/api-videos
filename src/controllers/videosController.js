import fs from 'fs/promises'
import Usuarios from '../models/model.Usuario.js'
import videoModel from '../models/model.Videos.js'
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
/* import ChartJSNodeCanvas from 'chart.js/auto' */

export const registrarVideo = async (req, res) => {
  const { titulo, descripcion, etiqueta, usuarioId } = req.body
  const miniatura = req.files.miniatura ? req.files.miniatura[0].path : null
  const video = req.files.video ? req.files.video[0].path : null

  try {
    if (!titulo || !descripcion || !etiqueta || !miniatura || !video || !usuarioId) {
      return res.status(400).json({ message: 'Falta informacion' })
    }
    /*  const today = new Date().dateFormat('isoDate') */
    /*    const today = dateFormat('isoDate') */
    const d = new Date()
    const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    const dataVideo = new videoModel({
      titulo,
      descripcion,
      etiqueta,
      fechaSubida: today,
      miniatura,
      video,
      reproducciones: 0,
      usuario: usuarioId

    })

    const newVideo = await dataVideo.save()
    await Usuarios.findByIdAndUpdate(
      usuarioId,
      { $push: { videos: newVideo._id } },
      { new: true, useFindAndModify: false }
    )
    return res.status(201).json({ Video: newVideo })
  } catch (error) {
    console.log('Error', error)
    return res.status(500).json({ message: 'Error Interno' })
  }
}

export const actualizarVideo = async (req, res) => {
  const { id } = req.params
  const { titulo, descripcion, etiqueta, miniatura } = req.body
  const d = new Date()
  const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  try {
    const update = await videoModel.findByIdAndUpdate(id,
      {
        titulo,
        descripcion,
        etiqueta,
        fechaSubida: today,
        miniatura
      },
      { new: true })
    res.send(update)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const eliminarVideo = async (req, res) => {
  try {
    const deleteVideo = await videoModel.findByIdAndDelete(req.params.id)
    if (!deleteVideo) {
      return res.status(400).json({ message: 'No se puedo eliminar el video' })
    }
    res.status(200).json({ message: 'Video Eliminado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const listadoVideos = async (req, res) => {
  try {
    const listaDeVideos = await videoModel.find({})
    res.send(listaDeVideos)
  } catch (error) {
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const informacionVideo = async (req, res) => {
  try {
    const miVideo = await videoModel.findById(req.params.id)
    if (!miVideo) {
      return res.status(404).send('Video no encontrado')
    }
    res.send(miVideo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const categoriaVideo = async (req, res) => {
  const categoria = req.params.etiqueta
  try {
    const listaDeVideos = await videoModel.find({ etiqueta: categoria })
    res.json({ listaDeVideos })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const estadisticaReproduccion = async (req, res) => {
  try {
    const videos = await videoModel.find({})
    /* res.send(listaDeVideos) */
    const width = 800 // ancho del gráfico
    const height = 600 // alto del gráfico
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })
    // Extraer los títulos y el número de reproducciones
    const etiqueta = videos.map(video => video.titulo)
    const datos = videos.map(video => video.reproducciones)
    const configuration = {
      type: 'bar',
      data: {
        labels: etiqueta,
        datasets: [{
          label: 'Reproducciones',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0,
          data: datos
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    (async () => {
      try {
        // Renderizar el gráfico a un buffer
        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration)
        const rutaAbosuta = '../api-videos/public/uploads/estadisticas'
        const directActual = process.cwd()
        const __dirname = path.resolve(directActual, rutaAbosuta)
        const nombreFile = Date.now() + '-' + 'reproduccion.jpg'
        // Ruta donde se guardará la imagen
        const outputPath = path.join(__dirname, nombreFile)
        // Guardar el buffer en un archivo
        fs.writeFile(outputPath, imageBuffer, (err) => {
          if (err) {
            console.error('Error al guardar la imagen:', err)
          }
        })
        console.log('Imagen guardada exitosamente en', nombreFile)
        /* res.status(200).json(nombreFile) */
        res.status(200).json(outputPath)
      } catch (error) {
        console.error('Error al renderizar el gráfico:', error)
      }
    })()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const estadisticaCategoria = async (req, res) => {
  try {
    const videos = await videoModel.find({})
    /* res.send(videos) */
    const width = 800 // ancho del gráfico
    const height = 600 // alto del gráfico
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })
    // Contar la frecuencia de cada etiqueta
    const etiquetaCount = {}
    videos.forEach(video => {
      video.etiqueta.forEach(etiqueta => {
        if (etiquetaCount[etiqueta]) {
          etiquetaCount[etiqueta]++
        } else {
          etiquetaCount[etiqueta] = 1
        }
      })
    })

    // Preparar los datos para el gráfico
    const etiquetas = Object.keys(etiquetaCount)
    const frecuencias = Object.values(etiquetaCount)

    // Configuración del gráfico
    const configuration = {
      type: 'bar',
      data: {
        labels: etiquetas,
        datasets: [{
          label: 'Videos por Categorias',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132)',
          borderWidth: 0,
          data: frecuencias
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    // Generar el gráfico y guardarlo como imagen
    (async () => {
      const image = await chartJSNodeCanvas.renderToBuffer(configuration)
      res.send(image)
      /* fs.writeFileSync('etiquetas_chart.png', image)
      console.log('Gráfico generado y guardado como etiquetas_chart.png') */
    })()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

/* export const estadisticasFecha = async (req, res) =>{
  try{

  }catch(){

  }
} */
