import path from 'node:path';
import fs from 'node:fs';
import usuarios from '../models/model.Usuario.js'; 
import Videos from '../models/model.Videos.js';
export const basePath = process.cwd();

export function eliminarArchivo(nombre) {
  const archivo = basePath + 'public/uploads/profile/' + nombre;
  const aEliminar = path.resolve(archivo);
  fs.access(archivo, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlinkSync(aEliminar);
    }
  });
}

export function eliminarMiniatura(miniatura) {
  const archivo = basePath + '/' + miniatura;
  const aEliminar = path.resolve(archivo);
  console.log(aEliminar)
  fs.access(archivo, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlinkSync(aEliminar);
    }
  });
}

export async function reemplazarFoto(picture, id) {
  try {
    const usuario = await usuarios.findById(id).select('imagenPerfil');
    console.log(usuario)
    console.log(picture)
    if (usuario && usuario.imagenPerfil !== picture) {
      eliminarArchivo(usuario.imagenPerfil);
    }
  } catch (error) {
    console.error('Error al reemplazar la foto:', error.message);
  }
}

export async function reemplazarMiniatura(miniatura, id) {
  try {
    const video = await Videos.findById(id).select('miniatura');
    
    if (video && video.miniatura !== miniatura) {
      
      eliminarMiniatura(video.miniatura);
    }
  } catch (error) {
    console.error('Error al reemplazar la miniatura:', error.message);
  }
}