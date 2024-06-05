import Niveles from '../models/model.Niveles.js';
import { validarId, validarNombreNivel } from '../utils/validation.js';

export const crearNivel = async (req, res) => {
    const { nombre, docente } = req.body;
  
    try {
      const { error, mensaje } = validarNombreNivel(nombre);
      validarId(docente)
      if (error) {
        return res.status(400).json({ mensaje });
      }
  
      const nuevoNivel = new Niveles({ nombre, docente });
      await nuevoNivel.save();
      res.status(201).json(nuevoNivel);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear el nivel', error });
    }
  };
  
  export const editarNivel = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
  
    try {
      await validarId(id);
  
      const { error, mensaje } = validarNombreNivel(nombre);
      if (error) {
        return res.status(400).json({ mensaje });
      }
  
      const nivel = await Niveles.findByIdAndUpdate(id, { nombre }, { new: true });
      if (!nivel) {
        return res.status(404).json({ mensaje: 'Nivel no encontrado' });
      }
  
      res.status(200).json(nivel);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al editar el nivel', error });
    }
  };
  
  export const eliminarNivel = async (req, res) => {
    const { id } = req.params;
  
    try {
      await validarId(id);
  
      const nivel = await Niveles.findByIdAndDelete(id);
      if (!nivel) {
        return res.status(404).json({ mensaje: 'Nivel no encontrado' });
      }
  
      res.status(200).json({ mensaje: 'Nivel eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el nivel', error });
    }
  };
  
  export const listarNiveles = async (req, res) => {
    try {
      const niveles = await Niveles.find();
      res.status(200).json(niveles);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los niveles', error });
    }
  };
  
  export const obtenerNivelPorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      await validarId(id);
  
      const nivel = await Niveles.findById(id);
      if (!nivel) {
        return res.status(404).json({ mensaje: 'Nivel no encontrado' });
      }
  
      res.status(200).json(nivel);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener el nivel', error });
    }
  };