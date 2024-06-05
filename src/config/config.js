import { config } from 'dotenv'

config()

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://api-funval:ObcW8bjelh6fH9ot@video-api.5zz6cja.mongodb.net/?retryWrites=true&w=majority&appName=video-api'
export const PORT = process.env.PORT || 3000
export const FRONT_URL = process.env.FRONT_URL || '*'
export const JWT_SECRET = process.env.JWT_SECRET || 'srct'