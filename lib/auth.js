import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from './prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_temporal';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// ========== FUNCIONES DE JWT ==========

/**
 * Genera un token JWT para un usuario
 * @param {Object} user - Usuario con id, email, username
 * @returns {string} Token JWT
 */
export const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      username: user.username 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Verifica un token JWT
 * @param {string} token - Token JWT
 * @returns {Object|null} Payload del token o null si es inválido
 */
export const verifyToken = (token) => {
  try {

    console.log("TOKEN RECIBIDO:", token);

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("TOKEN VALIDO:", decoded);

    return decoded;


  } catch (error) {

    console.log("ERROR JWT:", error.message);

    return null;

  }
};

/**
 * Obtiene el usuario desde el token en el header de la request
 * @param {Request} request - Next.js request object
 * @returns {Promise<Object|null>} Usuario o null
 */
export const getUserFromRequest = async (request) => {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded || !decoded.id) {
      return null;
    }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        zona: true,
        estilo_ropa: true,
        preferencias_colores: true,
        talle: true,
        foto_perfil: true,
        reputacion: true,
        preferencias_completadas: true,
        createdAt: true,
      }
    });
    
    return user;
  } catch (error) {
    console.error('Error en getUserFromRequest:', error);
    return null;
  }
};

// ========== FUNCIONES DE USUARIO ==========

/**
 * Registra un nuevo usuario
 * @param {Object} data - Datos del usuario (username, email, password, zona)
 * @returns {Promise<Object>} Usuario creado
 */
export const registerUser = async ({ username, email, password, zona }) => {
  // Verificar si el usuario ya existe
  const existingEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  });
  
  if (existingEmail) {
    throw new Error('El email ya está registrado');
  }
  
  const existingUsername = await prisma.user.findUnique({
    where: { username },
    select: { id: true }
  });
  
  if (existingUsername) {
    throw new Error('El nombre de usuario ya existe');
  }
  
  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Crear usuario
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      zona: zona || null,
    },
    select: {
      id: true,
      email: true,
      username: true,
      zona: true,
      preferencias_completadas: true,
      createdAt: true,
    }
  });
  
  return user;
};

/**
 * Inicia sesión de un usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña sin hashear
 * @returns {Promise<Object>} Usuario autenticado
 */
export const loginUser = async (email, password) => {
  // Buscar usuario por email
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  if (!user) {
    throw new Error('Credenciales incorrectas');
  }
  
  // Verificar contraseña
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error('Credenciales incorrectas');
  }
  
  // Devolver usuario sin contraseña
  const { password: _, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
};

/**
 * Obtiene un usuario por ID
 * @param {number} id - ID del usuario
 * @returns {Promise<Object|null>} Usuario o null
 */
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      zona: true,
      estilo_ropa: true,
      preferencias_colores: true,
      talle: true,
      foto_perfil: true,
      reputacion: true,
      preferencias_completadas: true,
      createdAt: true,
    }
  });
  
  return user;
};

/**
 * Actualiza las preferencias del usuario (HU-005)
 * @param {number} userId - ID del usuario
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
export const updateUserPreferences = async (userId, { estilo_ropa, preferencias_colores, talle }) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      estilo_ropa: estilo_ropa || [],
      preferencias_colores: preferencias_colores || [],
      talle: talle || null,
      preferencias_completadas: true,
    },
    select: {
      id: true,
      email: true,
      username: true,
      estilo_ropa: true,
      preferencias_colores: true,
      talle: true,
      preferencias_completadas: true,
    }
  });
  
  return user;
};

/**
 * Actualiza la foto de perfil del usuario (HU-008)
 * @param {number} userId - ID del usuario
 * @param {string} fotoPerfilUrl - URL de la nueva foto
 * @returns {Promise<Object>} Usuario actualizado
 */
export const updateUserPhoto = async (userId, fotoPerfilUrl) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { foto_perfil: fotoPerfilUrl },
    select: {
      id: true,
      username: true,
      email: true,
      foto_perfil: true,
    }
  });
  
  return user;
};