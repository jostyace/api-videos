import express from 'express'
import { connectDB } from './src/config/db.js'
import user from './src/route.js'

const app = express()
connectDB()

app.use(express.json())

app.use('/', user );

app.listen(3000, () => console.log('Server running on http://localhost:3000'))