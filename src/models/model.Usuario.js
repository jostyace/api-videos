import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    required: true
  },
  imagenPerfil: {
    type: String,
    required: false
  },
  rol: {
    type: String,
    required: false
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Videos'
  }],
  nivel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nivel',
    required: false
  }
})

const Usuarios = mongoose.model('Usuarios', usuarioSchema)

export default Usuarios
