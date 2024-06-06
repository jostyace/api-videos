import mongoose, { ObjectId } from 'mongoose'

const videoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  etiqueta: {
    type: [String],
    required: true
  },
  fechaSubida: {
    type: Date,
    required: true
  },
  miniatura: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  reproducciones: {
    type: Number,
    default: 0
  },
  usuario: {
    type: ObjectId,
    ref: 'Usuarios',
    required: true
  },
  tarea: {
    type: ObjectId,
    ref: 'Tareas',
    required: false
  }

})

const Videos = mongoose.model('Videos', videoSchema)

export default Videos
