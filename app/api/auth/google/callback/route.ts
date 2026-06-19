import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import prisma from '@/lib/prisma';
import { generateToken } from '@/lib/auth.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/auth/google/callback`
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=no_code`);
    }

    // Intercambiar código por tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Obtener datos del usuario de Google
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    if (!data.email) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=no_email`);
    }

    // Buscar o crear usuario en tu BD
    let user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.email,
          username: data.email.split('@')[0],
          password: 'GOOGLE_AUTH',
          foto_perfil: data.picture ?? '/default-avatar.png',
        },
      });
    }

    // Generar JWT igual que en el login normal
    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    // Redirigir al dashboard con el token
    const redirectTo = user.preferencias_completadas ? '/dashboard' : '/onboarding';
    const response = NextResponse.redirect(`${process.env.NEXTAUTH_URL}${redirectTo}`);
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return response;

  } catch (error) {
    console.error('Error en Google callback:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=auth_failed`);
  }
}