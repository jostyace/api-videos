import multer from 'multer'
import fs from 'fs'
import path from 'path'

export const msg = ''
let nombre = ''
const profileDirectory = 'public/uploads/profile/'
const videoDirectory = 'public/uploads/videos/'
const miniaturaDirectory = 'public/uploads/miniaturas/'

const createCarpeta = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

createCarpeta(profileDirectory)
createCarpeta(videoDirectory)
createCarpeta(miniaturaDirectory)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'miniatura') {
      cb(null, miniaturaDirectory)
    } else if (file.fieldname === 'video') {
      cb(null, videoDirectory)
    } else if (file.fieldname === 'imagenPerfil') {
      cb(null, profileDirectory)
    } else {
      cb(new Error('Tipo de archivo no permitido'), false)
    }
  },
  filename: (req, file, cb) => {
    nombre = Date.now() + '-' + file.originalname.trim().replace(/\s+/g, '').toLowerCase()
    cb(null, nombre)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'miniatura' || file.fieldname === 'imagenPerfil') {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Solo se permiten archivos de imagen'))
    }
  } else if (file.fieldname === 'video') {
    if (!file.originalname.match(/\.(mp4|webm)$/)) {
      return cb(new Error('Solo se permiten archivos de video'))
    }
  } else {
    return cb(new Error('Tipo de archivo no permitido'))
  }
  cb(null, true)
}

export const subirArchivos = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  },
  fileFilter
})
