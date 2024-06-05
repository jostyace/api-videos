import express from 'express'
import cors from 'cors'
import usuariosRoutes from './src/routes/usuariosRoutes.js'
import videosRoutes from './src/routes/videosRoutes.js'
import nivelesRoutes from './src/routes/nivelesRoutes.js'
import { connectDB } from './src/config/db.js'
import { FRONT_URL } from './src/config/config.js'
import user from './src/route.js'

const app = express()
const PORT = 3000

connectDB()
app.use(express.static('public'))
app.use(cors({ 
  origin: FRONT_URL,
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use('/', user)
app.use('/api', usuariosRoutes)
app.use('/api', videosRoutes)
app.use('/api', nivelesRoutes)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
