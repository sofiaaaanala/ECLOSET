// import { NextResponse } from 'next/server';
// import { getUserFromRequest } from '@/lib/auth.js';

// export async function GET(request) {
//   try {
//     const user = await getUserFromRequest(request);
    
//     if (!user) {
//       return NextResponse.json(
//         { error: 'No autorizado' },
//         { status: 401 }
//       );
//     }
    
//     return NextResponse.json({ user });
    
//   } catch (error) {
//     console.error('Error en /me:', error);
//     return NextResponse.json(
//       { error: 'Error interno del servidor' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { verifyToken, getUserById } from '@/lib/auth.js';

export async function GET(request) {
  try {
    // Leer el token de la cookie en lugar del header
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
    
    const user = await getUserById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
    
  } catch (error) {
    console.error('Error en /me:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}