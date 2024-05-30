import { eliminarArchivo } from './filemanagement.js'
import usuarios from '../models/model.Usuario.js'
import mongoose from 'mongoose'

export async function validarId (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID es inválido')
  }
}

export async function validarCampos (username, email, password, rol, action) {
  const emailDuplicated = await usuarios.find({ email })
  const usernameDuplicated = await usuarios.find({ username })

  if (action === 'create') {
    if (!username || !email || !password || !rol) {
      throw new Error('Todos los campos son requeridos')
    }
    if (!isValidEmail(email)) {
      throw new Error('El email es inválido')
    }
    if (emailDuplicated.length !== 0) {
      throw new Error('El email ingresado ya está en uso')
    }
    if (usernameDuplicated.length !== 0) {
      throw new Error('El username ingresado ya está en uso')
    }
  } else if (action === 'update') {
    if (email && !isValidEmail(email)) {
      eliminarArchivo(picture)
      throw new Error('El email es inválido')
    }
    if (emailDuplicated.length > 1) {
      eliminarArchivo(picture)
      throw new Error('El email ingresado ya está en uso')
    }
    if (usernameDuplicated.length > 1) {
      eliminarArchivo(picture)
      throw new Error('El username ingresado ya está en uso')
    }
    if (username && username.length > 15) {
      eliminarArchivo(picture)
      throw new Error('El nombre debe tener como máximo 15 caracteres')
    }
  }
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
