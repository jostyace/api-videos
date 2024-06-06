import path from 'node:path'
import fs from 'node:fs'
import Usuarios from '../models/model.Usuario.js'
import videoModel from '../models/model.Videos.js'
import { reemplazarMiniatura, eliminarVideofile, eliminarMiniatura } from '../utils/filemanagement.js'

export const registrarVideo = async (req, res) => {
  const { titulo, descripcion, etiqueta, usuarioId, tareaId } = req.body
  const miniatura = req.files.miniatura ? req.files.miniatura[0].filename : null;
  const video = req.files.video ? req.files.video[0].filename : null;


  try {
      if (!titulo || !descripcion || !etiqueta ||  !video || !miniatura || !usuarioId) {
      return res.status(400).json({ message: 'Falta informacion' })
    }
    const d = new Date()
    const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    const dataVideo = {
      titulo,
      descripcion,
      etiqueta,
      fechaSubida: today,
      miniatura,
      video,
      reproducciones: 0,
      usuario: usuarioId
    };

    if (tareaId && tareaId.trim() !== '') {
      dataVideo.tarea = tareaId;
    }

    const newVideo = new videoModel(dataVideo);
    await newVideo.save();
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
  const miniatura = req.files.miniatura ? req.files.miniatura[0].filename : null
  const { titulo, descripcion, etiqueta } = req.body
  const d = new Date()
  const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  try {
    if (miniatura) {
      await reemplazarMiniatura(miniatura, id)
    }
    const update = await videoModel.findByIdAndUpdate(id,
      {
        titulo,
        descripcion,
        etiqueta,
        miniatura
      },
      { new: true })
    console.log('updated')

    res.send(update)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const eliminarVideo = async (req, res) => {
  const { id } = req.params

  try {
    const video = await videoModel.findById(id)
    if (!video) {
      return res.status(404).json({ message: 'Video no encontrado' })
    }

    eliminarVideofile(video.video)
    eliminarMiniatura(video.miniatura)

    const deleteVideo = await videoModel.findByIdAndDelete(id)
    if (!deleteVideo) {
      return res.status(400).json({ message: 'No se pudo eliminar el video' })
    }

    await Usuarios.findByIdAndUpdate(
      video.usuario,
      { $pull: { videos: id } },
      { new: true, useFindAndModify: false }
    )

    res.status(200).json({ message: 'Video eliminado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const getMiniatura = async (req, res) => {
  try {
    const { filename } = req.params
    const absolutePath = path.resolve(`./public/uploads/miniaturas/${filename}`)

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).json({ message: 'Imagen no encontrada' })
      } else {
        res.sendFile(absolutePath)
      }
    })
  } catch (error) {
    res.json({ error: error.message })
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

export const listadoVideosPorTarea = async (req, res) => {
  const { id } = req.params

  try {
    const listaDeVideos = await videoModel.find({ tarea: id })
    res.json({ listaDeVideos })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const listadoVideosPorUsuario = async (req, res) => {
  const { id } = req.params

  try {
    const listaDeVideos = await videoModel.find({ usuario: id })
    res.json({ listaDeVideos })
  } catch (error) {
    res.status(500).json({ error: error.message })
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
    const width = 600 // ancho del gráfico
    const height = 400 // alto del gráfico
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })
    // Extraer los títulos y el número de reproducciones
    const etiqueta = videos.map(video => video.titulo)
    const datos = videos.map(video => video.reproducciones)
    const configuration = {
      type: 'bar',
      data: {
        labels: etiqueta,
        datasets: [{
          label: 'Numero de reproducciones por video',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: datos
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            label: 'Numero reproducciones'
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
        const nombreFile = 'reproduccion.jpg'
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
        res.status(200).sendFile(outputPath)
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
          label: 'Numero de videos por categorias',
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

    (async () => {
      try {
        // Renderizar el gráfico a un buffer
        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration)
        const rutaAbosuta = '../api-videos/public/uploads/estadisticas'
        const directActual = process.cwd()
        const __dirname = path.resolve(directActual, rutaAbosuta)
        const nombreFile = 'categorias.jpg'
        // Ruta donde se guardará la imagen
        const outputPath = path.join(__dirname, nombreFile)
        // Guardar el buffer en un archivo
        fs.writeFile(outputPath, imageBuffer, (err) => {
          if (err) {
            console.error('Error al guardar la imagen:', err)
          }
        })
        console.log('Imagen guardada exitosamente en', nombreFile)
        res.status(200).json(nombreFile)
      } catch (error) {
        console.error('Error al renderizar el gráfico:', error)
      }
    })()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const getGrafica = async (req, res) => {
  try {
    const { filename } = req.params
    const absolutePath = path.resolve(`./public/uploads/estadisticas/${filename}`)

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).json({ message: 'Grafica no encontrada' })
      } else {
        res.sendFile(absolutePath)
      }
    })
  } catch (error) {
    res.json({ error: error.message })
  }
}
