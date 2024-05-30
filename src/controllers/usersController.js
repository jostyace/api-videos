import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validarCampos, validarId } from '../utils/validation.js';
import usuarios from '../models/model.Usuario.js';
import { reemplazarFoto } from '../utils/filemanagement.js';
import { JWT_SECRET } from '../config/config.js';

export const registrarUsuario = async (req, res) => {
  const { nombre, usuario, contrasena, rol, videos } = req.body;
  const imagenPerfil = req.file ? req.file.filename : null;
  const fechaCreacion = new Date();

  try {
    await validarCampos(nombre, usuario, contrasena, imagenPerfil, 'create');
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(contrasena, saltRounds);
    const newUser = new usuarios({
      nombre, usuario, contrasena: hashPassword, rol: 'user', videos, imagenPerfil, fechaCreacion
    });

    await newUser.save();
    res.json({ message: 'Usuario creado correctamente', newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, usuario, contrasena, rol, videos } = req.body;
  const imagenPerfil = req.file ? req.file.filename : null;
  try {
    await validarId(id);
    await validarCampos(nombre, usuario, imagenPerfil, contrasena, null, null, 'update');
    const user = await usuarios.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'No existe un usuario con el ID proporcionado' });
    }
    if (nombre) user.nombre = nombre;
    if (usuario) user.usuario = usuario;
    if (rol) user.rol = rol;
    if (videos) user.videos = videos;
    if (imagenPerfil) {
      await reemplazarFoto(imagenPerfil, id);
      user.imagenPerfil = imagenPerfil;
    }
    if (contrasena) {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(contrasena, saltRounds);
      user.contrasena = hashPassword;
    }
    await user.save();
    res.json({ message: 'Perfil Actualizado correctamente', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const iniciarSesion = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    if (!usuario || !contrasena) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const user = await usuarios.findOne({ usuario });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.setHeader('Authorization', `Bearer ${token}`);
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const informacionUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await validarId(id);
    const usuario = await usuarios.findById(id, '_id nombre usuario rol videos fechaCreacion imagenPerfil');
    if (!usuario) {
      return res.status(404).json({ message: 'No existe un usuario con el ID proporcionado' });
    }
    res.json({ usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const listadoUsuarios = async (req, res) => {
  try {
    const listausuarios = await usuarios.find({}, '_id nombre usuario rol videos fechaCreacion imagenPerfil');
    res.json({ listausuarios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await validarId(id);
    const user = await usuarios.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'No existe un usuario con el ID proporcionado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const historialUsuario = async (req, res) => {
};

export const videosUsuario = async (req, res) => {
};

