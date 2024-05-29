import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/videos-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Detener la aplicación
  }
};

export default conectarDB;