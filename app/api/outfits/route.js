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

// GET: Obtener todos los outfits del usuario
export async function GET(request) {
  try {
    await initDB();
    
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
    const outfits = await Outfit.findAll({
      where: { usuario_id: decoded.id },
      include: [{ model: Prenda, as: 'prendas', through: { attributes: [] } }],
      order: [['createdAt', 'DESC']],
    });
    
    return NextResponse.json({ outfits });
    
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// POST: Crear un nuevo outfit con sus prendas
export async function POST(request) {
  try {
    await initDB();
    
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
    const { nombre, descripcion, imagen_url, ocasiones, temporada, prendas_ids } = await request.json();
    
    if (!nombre) {
      return NextResponse.json({ error: 'El nombre del outfit es obligatorio' }, { status: 400 });
    }
    
    const outfit = await Outfit.create({
      nombre,
      descripcion,
      imagen_url,
      ocasiones: ocasiones || [],
      temporada: temporada || 'todo',
      usuario_id: decoded.id,
    });
    
    // Asociar prendas si se enviaron
    if (prendas_ids && prendas_ids.length > 0) {
      await outfit.addPrendas(prendas_ids);
    }
    
    // Recargar con las prendas asociadas
    const outfitConPrendas = await Outfit.findByPk(outfit.id, {
      include: [{ model: Prenda, as: 'prendas', through: { attributes: [] } }],
    });
    
    return NextResponse.json({ outfit: outfitConPrendas }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}