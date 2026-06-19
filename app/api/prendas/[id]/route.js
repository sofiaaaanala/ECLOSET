import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth.js';

// GET: Obtener una prenda por ID
export async function GET(request, { params }) {
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

    const id = parseInt(params.id);

    const prenda = await prisma.prenda.findFirst({
      where: {
        id_prenda: id,
        id_usuario: decoded.id,
      },
    });

    if (!prenda) {
      return NextResponse.json(
        { error: 'Prenda no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ prenda });

  } catch (error) {
    console.error('Error GET prenda:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// PUT: Actualizar una prenda
export async function PUT(request, { params }) {
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

    const id = parseInt(params.id);

    const existente = await prisma.prenda.findFirst({
      where: {
        id_prenda: id,
        id_usuario: decoded.id,
      },
    });

    if (!existente) {
      return NextResponse.json(
        { error: 'Prenda no encontrada' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const prendaActualizada = await prisma.prenda.update({
      where: {
        id_prenda: id,
      },
      data: {
        nombre: body.nombre,
        tipo: body.tipo,
        color: body.color,
        talle: body.talle,
        descripcion: body.descripcion,
        temporada: body.temporada,
        marca: body.marca,
        precio: body.precio,
        descuento: body.descuento,
        imagen_url: body.imagen_url,
      },
    });

    return NextResponse.json({ prenda: prendaActualizada });

  } catch (error) {
    console.error('Error PUT prenda:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Eliminar una prenda
export async function DELETE(request, { params }) {
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

    const id = parseInt(params.id);

    const existente = await prisma.prenda.findFirst({
      where: {
        id_prenda: id,
        id_usuario: decoded.id,
      },
    });

    if (!existente) {
      return NextResponse.json(
        { error: 'Prenda no encontrada' },
        { status: 404 }
      );
    }

    await prisma.prenda.delete({
      where: {
        id_prenda: id,
      },
    });

    return NextResponse.json({
      message: 'Prenda eliminada correctamente',
    });

  } catch (error) {
    console.error('Error DELETE prenda:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}