import { config } from 'dotenv'

config()

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/StreamingVideo'
export const PORT = process.env.PORT || 3000
export const FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173'
export const JWT_SECRET = process.env.JWT_SECRET || 'srct'