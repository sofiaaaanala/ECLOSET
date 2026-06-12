import { NextResponse } from 'next/server';
import { loginUser, generateToken } from '@/lib/auth.js';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son obligatorios' },
        { status: 400 }
      );
    }
    
    // Iniciar sesión usando la función
    const user = await loginUser(email, password);
    
    // Generar token
    const token = generateToken(user);
    
    // Determinar redirección según si completó preferencias
    const redirectTo = user.preferencias_completadas ? '/dashboard' : '/preferencias';
    
    return NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user,
      token,
      redirectTo,
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    
    if (error.message === 'Credenciales incorrectas') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
