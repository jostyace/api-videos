import { eliminarArchivo } from './filemanagement.js';
import usuarios from '../models/model.Usuario.js';
import mongoose from 'mongoose';

export async function validarId(id) {
  if (id.trim() === '') { throw new Error('ID es inválido'); }
  else {

    if ( !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('ID es inválido');
    }
  }
   }

  export async function validarCampos(nombre, usuario, contrasena, imagen, action) {

    const usernameDuplicated = await usuarios.find({ usuario });

    if (action === 'create') {
      if (!nombre || !usuario || !contrasena) {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }