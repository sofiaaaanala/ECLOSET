import { NextResponse } from 'next/server';
import { registerUser, generateToken } from '@/lib/auth.js';

export async function POST(request) {
  try {
    const { username, email, password, confirmPassword, zona } = await request.json();
    
    // Validaciones
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }
    
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Las contraseñas no coinciden' },
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }
    
    console.log("ANTES DE CREAR USUARIO");
    // Registrar usuario usando la función
    const user = await registerUser({ username, email, password, zona });
    console.log("USUARIO CREADO:", user);
    // Generar token
    const token = generateToken(user);
    
    // Determinar redirección según si completó preferencias
    const redirectTo = user.preferencias_completadas ? '/dashboard' : '/preferencias';
    
    return NextResponse.json({
      success: true,
      message: 'Registro exitoso',
      user,
      token,
      redirectTo,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error en registro:', error);
    
    // Manejar errores conocidos
    if (error.message === 'El email ya está registrado' ||
        error.message === 'El nombre de usuario ya existe') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
