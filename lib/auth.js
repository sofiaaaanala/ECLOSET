import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Generar un token JWT
export const generateToken = (userId, email, username) => {
  return jwt.sign(
    { 
      id: userId, 
      email, 
      username 
    }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Verificar un token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Middleware para obtener el usuario del token (para usar en API routes)
export const getUserFromToken = (req) => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
};