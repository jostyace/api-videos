import Tareas from '../models/model.Tareas.js';
import { validarId, validarNombreTarea, validarDescripcionTarea } from '../utils/validation.js';

export const crearTarea = async (req, res) => {
  const { nombre, descripcion, nivel, docente } = req.body;

  try {
    const { error: nombreError, mensaje: nombreMensaje } = validarNombreTarea(nombre);
    if (nombreError) {
      return res.status(400).json({ mensaje: nombreMensaje });
    }

    const { error: descripcionError, mensaje: descripcionMensaje } = validarDescripcionTarea(descripcion);
    if (descripcionError) {
      return res.status(400).json({ mensaje: descripcionMensaje });
    }

    const nuevaTarea = new Tareas({ nombre, descripcion, nivel, docente });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la tarea', error });
  }
};

export const editarTarea = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, nivel, docente } = req.body;

  try {
    await validarId(id);

    const { error: nombreError, mensaje: nombreMensaje } = validarNombreTarea(nombre);
    if (nombreError) {
      return res.status(400).json({ mensaje: nombreMensaje });
    }

    const { error: descripcionError, mensaje: descripcionMensaje } = validarDescripcionTarea(descripcion);
    if (descripcionError) {
      return res.status(400).json({ mensaje: descripcionMensaje });
    }

    const tarea = await Tareas.findByIdAndUpdate(id, { nombre, descripcion, nivel, docente }, { new: true });
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar la tarea', error });
  }
};

export const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  try {
    await validarId(id);

    const tarea = await Tareas.findByIdAndDelete(id);
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la tarea', error });
  }
};

export const listarTareas = async (req, res) => {
  try {
    const tareas = await Tareas.find();
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
  }
};

export const obtenerTareaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    await validarId(id);

    const tarea = await Tareas.findById(id);
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la tarea', error });
  }
};

export const listarTareasPorNivel = async (req, res) => {
  const { id } = req.params;

  try {
    await validarId(id);

    const tareas = await Tareas.find({ nivel: id });
    if (!tareas || tareas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron tareas para este nivel' });
    }

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
  }
};


export const videosTareas = async (req, res) => {
  const { id } = req.params;

  try {
    await validarId(id);

    const tareas = await Tareas.find({ nivel: id });
    if (!tareas || tareas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron tareas para este nivel' });
    }

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
  }
};

