import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth.js';
import { User } from '@/lib/models/index.js';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token no proporcionado' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    // Obtener usuario actualizado desde la base de datos
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: user.toJSON(),
    });

  } catch (error) {
    console.error('Error verificando token:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}