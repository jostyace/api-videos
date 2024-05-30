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
    type: Array,
    required: true
  },
  fechaSubida: {
    type: String,
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

const videoModel = mongoose.model('Videos', videoSchema)

export default videoModel
