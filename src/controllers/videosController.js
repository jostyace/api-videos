import videoModel from '../models/model.Videos.js'

export const registrarVideo = async (req, res) => {
  const { titulo, descripcion, etiqueta, miniatura } = req.body
  try {
    if (!titulo || !descripcion || !etiqueta || !miniatura) {
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
      reproducciones: 0
    })

    const newVideo = await dataVideo.save()
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

export const estadisticaCategoria = async (req, res) => {

  /*  try{

    }catch(){

    } */
}
