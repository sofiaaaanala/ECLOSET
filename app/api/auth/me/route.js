import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth.js';

export async function GET(request) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
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