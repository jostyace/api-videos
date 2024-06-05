import mongoose from 'mongoose'

const nivelesSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true,
    maxlength: 250,
    trim: true  }
})

const Niveles = mongoose.model('Niveles', nivelesSchema)

export default Niveles