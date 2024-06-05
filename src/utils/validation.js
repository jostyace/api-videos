import { eliminarArchivo } from './filemanagement.js'
import usuarios from '../models/model.Usuario.js'
import mongoose from 'mongoose'


export async function validarId(id) {
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error('ID es inválido');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID es inválido');
  }

  const trimmedId = id.trim();
  if (trimmedId.length !== 24) {
    throw new Error('ID es inválido');
  }

  return true;
}

  export async function validarCampos(nombre, usuario, contrasena, imagenPerfil, nivel, action) {

    const usernameDuplicated = await usuarios.find({ usuario });

    if (action === 'create') {

      if (!nombre || !usuario || !contrasena ) {
        throw new Error('Llene los campos obligatorios');
      }
      if (!isValidEmail(usuario)) {
        throw new Error('El email es inválido');
      }
      if (usernameDuplicated.length !== 0) {
        throw new Error('El usuario ingresado ya está en uso');
      }
    } else if (action === 'update') {
      if (usuario && !isValidEmail(usuario)) {
        if (imagenPerfil) eliminarArchivo(imagenPerfil);
        throw new Error('El email es inválido');
      }
      if (usernameDuplicated.length > 1) {
        if (imagenPerfil) eliminarArchivo(imagenPerfil);
        throw new Error('El usuario ingresado ya está en uso');
      }
      if (nombre && nombre.length > 50) {
        if (imagenPerfil) eliminarArchivo(imagenPerfil);
        throw new Error('El nombre debe tener como máximo 50 caracteres');
      }

    }
  
  }


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validarNombreNivel = (nombre) => {
  if (typeof nombre !== 'string') {
    return { error: true, mensaje: 'El nombre del nivel debe ser una cadena de texto' };
  }

  if (nombre.trim() === '') {
    return { error: true, mensaje: 'El nombre del nivel no puede estar vacío' };
  }

  if (nombre.length > 250) {
    return { error: true, mensaje: 'El nombre del nivel no puede tener más de 250 caracteres' };
  }

  if (nombre.startsWith(' ')) {
    return { error: true, mensaje: 'El nombre del nivel no puede comenzar con un espacio' };
  }

  return { error: false, mensaje: '' };
};



export const validarNombreTarea = (nombre) => {
  if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
    return { error: true, mensaje: 'El nombre es obligatorio y debe ser una cadena no vacía' };
  }
  if (nombre.length > 250) {
    return { error: true, mensaje: 'El nombre no puede exceder los 250 caracteres' };
  }
  return { error: false, mensaje: '' };
};

export const validarDescripcionTarea = (descripcion) => {
  if (!descripcion || typeof descripcion !== 'string' || descripcion.trim().length === 0) {
    return { error: true, mensaje: 'La descripción es obligatoria y debe ser una cadena no vacía' };
  }
  if (descripcion.length > 500) {
    return { error: true, mensaje: 'La descripción no puede exceder los 500 caracteres' };
  }
  return { error: false, mensaje: '' };
};