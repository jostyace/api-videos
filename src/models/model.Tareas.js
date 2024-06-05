import mongoose, { Schema } from 'mongoose'

const tareasSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true,
    maxlength: 250
    },
  descripcion:{
    type: String,
    required: true,
    maxlength: 500 },
  nivel: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Niveles'
   },
   docente: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Usuarios'
   }

  
})

const Tareas = mongoose.model('Tareas', tareasSchema)

export default Tareas