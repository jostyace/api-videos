import mongoose, { Schema } from 'mongoose'

const nivelesSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true,
    maxlength: 250,
    trim: true  },
  docente: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Usuarios'
     }
  })

const Niveles = mongoose.model('Niveles', nivelesSchema)

export default Niveles