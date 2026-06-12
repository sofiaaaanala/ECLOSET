import { NextResponse } from 'next/server';
import { Prenda, syncDatabase } from '@/lib/models/index.js';
import { verifyToken } from '@/lib/auth.js';

let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized) {
    await syncDatabase();
    dbInitialized = true;
  }
};

// Helper: Verificar que la prenda pertenece al usuario
const verificarPropiedad = async (id, usuarioId) => {
  const prenda = await Prenda.findByPk(id);
  if (!prenda) return { error: 'Prenda no encontrada', status: 404 };
  if (prenda.usuario_id !== usuarioId) return { error: 'No autorizado', status: 403 };
  return { prenda };
};

// GET: Obtener una prenda específica
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
    
    return NextResponse.json({ prenda: result.prenda });
    
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// PUT: Actualizar una prenda
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
    
    const { nombre, descripcion, imagen_url, categoria, talle, color, etiquetas } = await request.json();
    
    await result.prenda.update({
      nombre: nombre || result.prenda.nombre,
      descripcion: descripcion !== undefined ? descripcion : result.prenda.descripcion,
      imagen_url: imagen_url || result.prenda.imagen_url,
      categoria: categoria || result.prenda.categoria,
      talle: talle !== undefined ? talle : result.prenda.talle,
      color: color !== undefined ? color : result.prenda.color,
      etiquetas: etiquetas || result.prenda.etiquetas,
    });
    
    return NextResponse.json({ prenda: result.prenda });
    
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// DELETE: Eliminar una prenda
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
    
    await result.prenda.destroy();
    
    return NextResponse.json({ message: 'Prenda eliminada correctamente' });
    
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}