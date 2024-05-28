import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  nombre:{
    type:String,
    required:true,
  },
  usuario: {
    type: String,
    required: true
  },
  contraseña: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    required: true
  },
  rol: {
    type: String,
    required: true
  },
  videos: {
    type: Array,
    required: true
  }
})

const usuarios = mongoose.model('usuarios', usuarioSchema)

export default usuarios