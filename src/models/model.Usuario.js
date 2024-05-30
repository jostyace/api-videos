import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nombre:{
    type:String,
    required:true,
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
    required: true
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Videos'
  }]
})

const usuarios = mongoose.model('usuarios', usuarioSchema)

export default usuarios