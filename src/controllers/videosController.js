import Usuarios from '../models/model.Usuario.js';
import videoModel from '../models/model.Videos.js'
import { reemplazarMiniatura, eliminarVideofile, eliminarMiniatura } from '../utils/filemanagement.js';

export const registrarVideo = async (req, res) => {
  const { titulo, descripcion, etiqueta, usuarioId, tareaId } = req.body
  const miniatura = req.files.miniatura ? req.files.miniatura[0].filename : null;
  const video = req.files.video ? req.files.video[0].filename : null;
  console.log(req.files.video[0])

  try {
      if (!titulo || !descripcion || !etiqueta || !miniatura || !video || !usuarioId) {
      return res.status(400).json({ message: 'Falta informacion' })
    }
    const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    const dataVideo = new videoModel({
      titulo,
      descripcion,
      etiqueta,
      fechaSubida: today,
      miniatura: miniatura,
      video: video,
      reproducciones: 0,
      usuario: usuarioId,
      tarea: tareaId || ''
    })

    const newVideo = await dataVideo.save()
    await Usuarios.findByIdAndUpdate(
      usuarioId,
      { $push: { videos: newVideo._id } },
      { new: true, useFindAndModify: false }
    );
    return res.status(201).json({ Video: newVideo })
  } catch (error) {
    console.log('Error', error)
    return res.status(500).json({ message: 'Error Interno' })
  }
}

export const actualizarVideo = async (req, res) => {
  const { id } = req.params
  const miniatura = req.files.miniatura ? req.files.miniatura[0].filename : null;
  const { titulo, descripcion, etiqueta } = req.body
  const d = new Date()
  const today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  try {
    if (miniatura) {
      await reemplazarMiniatura(miniatura, id);
    }
    const update = await videoModel.findByIdAndUpdate(id,
      {
        titulo,
        descripcion,
        etiqueta,
        miniatura
      },
      { new: true })
      console.log("updated")

    res.send(update)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error Interno' })
  }
}

export const eliminarVideo = async (req, res) => {
  const { id } = req.params;
  
  try {
    const video = await videoModel.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video no encontrado' });
    }

    eliminarVideofile(video.video);
    eliminarMiniatura(video.miniatura);

    const deleteVideo = await videoModel.findByIdAndDelete(id);
    if (!deleteVideo) {
      return res.status(400).json({ message: 'No se pudo eliminar el video' });
    }

    await Usuarios.findByIdAndUpdate(
      video.usuario,
      { $pull: { videos: id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({ message: 'Video eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error Interno' });
  }
};

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
