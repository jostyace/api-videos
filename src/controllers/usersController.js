import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validarCampos, validarId } from '../utils/validation.js';
import usuarios from '../models/model.Usuario.js';
import { reemplazarFoto } from '../utils/filemanagement.js';

export const registrarUsuario = async (req, res) => {
  const { name, email, password, rol, video_history } = req.body;
  try {
    await validarCampos(name, email, password, rol, [], 'create');
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new usuarios({ name, email, password: hashPassword, rol, video_history });
    await newUser.save();
    res.json({ message: 'Usuario creado correctamente', newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, rol } = req.body;
  const picture = req.file ? req.file.filename : null;
  try {
    await validarId(id);
    await validarCampos(name, email, picture, password, bio, phone, 'update');
    const usuario = await usuarios.findById(id);
    if (!usuario) {
      return res.status(400).json({ message: 'No existe un usuario con el ID proporcionado' });
    }
    if (name) usuario.name = name;
    if (email) usuario.email = email;
    if (bio) usuario.bio = bio;
    if (phone) usuario.phone = phone;
    if (picture) {
      await reemplazarFoto(picture, id);
      usuario.picture = picture;
    }
    if (password) {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      usuario.password = hashPassword;
    }
    await usuario.save();
    res.json({ message: 'Perfil Actualizado correctamente', usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const historialUsuario = async (req, res) => {
};
export const informacionUsuario = async (req, res) => {
};

export const listadoUsuarios = async (req, res) => {
  try {
    const listausuarios = await usuarios.find({}, 'id username email bio phone picture');
    res.json({ listausuarios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const videosUsuario = async (req, res) => {
};