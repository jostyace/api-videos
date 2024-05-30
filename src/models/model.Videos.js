import mongoose from 'mongoose'

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
    type: String,
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
  reproducciones: {
    type: Number,
    default: true
  }
})

const videos = mongoose.model('Videos', videoSchema)

export default videos