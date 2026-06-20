import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth.js';

import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// GET: Obtener todas las prendas del usuario autenticado
export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const prendas = await prisma.prenda.findMany({
      where: { id_usuario: decoded.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ prendas });

  } catch (error) {
    console.error('Error GET prendas:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// POST: Crear una nueva prenda
export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const formData = await request.formData();
    const nombre = formData.get('nombre');
    const tipo = formData.get('tipo');
    const talle = formData.get('talle');
    const color = formData.get('color') || '';
    const descripcion = formData.get('descripcion') || '';
    const etiquetas = formData.get('etiquetas') || '[]';

    const imagenFile = formData.get('imagen');

    if (!nombre || !tipo || !talle) {
      return NextResponse.json({ error: 'Nombre, tipo y talle son obligatorios' }, { status: 400 });
    }

    // Subir imagen a ImageKit si se mandó una
    let imagen_url = null;
    let imagen_fileId = null;

    if (imagenFile && imagenFile.size > 0) {
      const bytes = await imagenFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: imagenFile.name,
        folder: '/ecloset/prendas',
        useUniqueFileName: true,
      });

      imagen_url = uploadResponse.url;
      imagen_fileId = uploadResponse.fileId;
    }

    const prenda = await prisma.prenda.create({
      data: {
        nombre,
        tipo,
        talle,
        color: color || "",
        descripcion,
        etiquetas,
        id_usuario: decoded.id,
        imagen_url,
        imagen_fileId,
      },
    });

    return NextResponse.json({ prenda }, { status: 201 });

  } catch (error) {
    console.error('Error POST prenda:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
