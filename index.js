import express from 'express'
import cors from 'cors'
import usuariosRoutes from './src/routes/usuariosRoutes.js'
import conectarDB from './src/config/db.js';
import mongoose from 'mongoose';

const app = express()
conectarDB()
const PORT = 3003

app.use(express.static('public'))
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
// swaggerDocs(app, PORT)
app.use('/api', usuariosRoutes)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`Corriendo http://localhost:${PORT}`)
})