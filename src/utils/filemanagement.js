import path from 'node:path';
import fs from 'node:fs';
import { Usuario } from '../models/usuario.js'; // Asegúrate de importar tu modelo de usuario

export const basePath = process.cwd();

export function eliminarArchivo(nombre) {
  const archivo = basePath + '/public/uploads/' + nombre;
  const aEliminar = path.resolve(archivo);
  fs.access(archivo, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlinkSync(aEliminar);
    }
  });
}

export async function reemplazarFoto(picture, id) {
  try {
    const usuario = await Usuario.findById(id).select('picture');
    if (usuario && picture !== usuario.picture) {
      eliminarArchivo(usuario.picture);
    }
  } catch (error) {
    console.error('Error al reemplazar la foto:', error.message);
  }
}