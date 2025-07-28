import pool from '../config/db.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';

const loginUsuario = async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nombre_usuario } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre_usuario: usuario.nombre_usuario,
        rol: usuario.rol
      },
      'clave_secreta_super_segura',
      { expiresIn: '8h' }
    );

    res.json({ token });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const registerUsuario = async (req, res) => {
  const { nombre_usuario, contraseña, rol } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { nombre_usuario } });
    if (existe) {
      return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = await Usuario.create({
      nombre_usuario,
      contraseña: contraseñaHasheada,
      rol
    });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      id: nuevoUsuario.id
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

export { loginUsuario, registerUsuario };
