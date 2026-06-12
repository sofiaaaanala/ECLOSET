import { NextResponse } from 'next/server';
import { Outfit, Prenda, syncDatabase } from '@/lib/models/index.js';
import { verifyToken } from '@/lib/auth.js';

let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized) {
    await syncDatabase();
    dbInitialized = true;
  }
};

const verificarPropiedad = async (id, usuarioId) => {
  const outfit = await Outfit.findByPk(id, {
    include: [{ model: Prenda, as: 'prendas', through: { attributes: [] } }],
  });
  if (!outfit) return { error: 'Outfit no encontrado', status: 404 };
  if (outfit.usuario_id !== usuarioId) return { error: 'No autorizado', status: 403 };
  return { outfit };
};

export async function GET(request, { params }) {
  try {
    await initDB();
    const { id } = await params;
    
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
    const result = await verificarPropiedad(id, decoded.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
    
    return NextResponse.json({ outfit: result.outfit });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await initDB();
    const { id } = await params;
    
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
    const result = await verificarPropiedad(id, decoded.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
    
    const { nombre, descripcion, imagen_url, ocasiones, temporada, prendas_ids } = await request.json();
    
    await result.outfit.update({
      nombre: nombre || result.outfit.nombre,
      descripcion: descripcion !== undefined ? descripcion : result.outfit.descripcion,
      imagen_url: imagen_url !== undefined ? imagen_url : result.outfit.imagen_url,
      ocasiones: ocasiones || result.outfit.ocasiones,
      temporada: temporada || result.outfit.temporada,
    });
    
    // Actualizar prendas asociadas si se enviaron
    if (prendas_ids) {
      await result.outfit.setPrendas(prendas_ids);
    }
    
    const outfitActualizado = await Outfit.findByPk(id, {
      include: [{ model: Prenda, as: 'prendas', through: { attributes: [] } }],
    });
    
    return NextResponse.json({ outfit: outfitActualizado });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await initDB();
    const { id } = await params;
    
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
    const result = await verificarPropiedad(id, decoded.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
    
    await result.outfit.destroy();
    
    return NextResponse.json({ message: 'Outfit eliminado correctamente' });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}