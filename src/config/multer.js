import multer from 'multer'
import fs from 'fs';
import path from 'path';

export const msg = ''
const uploadDirectory = 'public/uploads/';
let nombre = ''

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory)
  },
  filename: (req, file, cb) => {
    nombre = Date.now() + '-' + file.originalname.trim().replace(/\s+/g, '').toLowerCase()
    cb(null, nombre)
  }
})

export const subirArchivos = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Solo se permiten archivos de imagen'))
    }
    cb(null, true)
  }
})

// export const subirVideos = multer({
//     storage,
//     limits: {
//       fileSize: 25 * 1024 * 1024
//     },
//     fileFilter: (req, file, cb) => {
//       if (!file.originalname.match(/\.(mp4|webm)$/)) {
//         return cb(new Error('Solo se permiten archivos de video'))
//       }
//       cb(null, true)
//     }
//   })
  
