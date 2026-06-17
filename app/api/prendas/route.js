// import { NextResponse } from 'next/server';
// import { Prenda, syncDatabase } from '@/lib/models/index.js';
// import { verifyToken } from '@/lib/auth.js';

// let dbInitialized = false;
// const initDB = async () => {
//   if (!dbInitialized) {
//     await syncDatabase();
//     dbInitialized = true;
//   }
// };

// // GET: Obtener todas las prendas del usuario autenticado
// export async function GET(request) {
//   try {
//     await initDB();
    
//     // Obtener token del header
//     const authHeader = request.headers.get('authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
//     }
    
//     const token = authHeader.split(' ')[1];
//     const decoded = verifyToken(token);
    
//     if (!decoded) {
//       return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
//     }
    
//     const prendas = await Prenda.findAll({
//       where: { usuario_id: decoded.id },
//       order: [['createdAt', 'DESC']],
//     });
    
//     return NextResponse.json({ prendas });
    
//   } catch (error) {
//     console.error('Error GET prendas:', error);
//     return NextResponse.json({ error: 'Error interno' }, { status: 500 });
//   }
// }

// // POST: Crear una nueva prenda
// export async function POST(request) {
//   try {
//     await initDB();
    
//     const authHeader = request.headers.get('authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
//     }
    
//     const token = authHeader.split(' ')[1];
//     const decoded = verifyToken(token);
    
//     if (!decoded) {
//       return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
//     }
    
//     const { nombre, descripcion, imagen_url, categoria, talle, color, etiquetas } = await request.json();
    
//     if (!nombre || !imagen_url) {
//       return NextResponse.json({ error: 'Nombre e imagen son obligatorios' }, { status: 400 });
//     }
    
//     const prenda = await Prenda.create({
//       nombre,
//       descripcion,
//       imagen_url,
//       categoria: categoria || 'otro',
//       talle,
//       color,
//       etiquetas: etiquetas || [],
//       usuario_id: decoded.id,
//     });
    
//     return NextResponse.json({ prenda }, { status: 201 });
    
//   } catch (error) {
//     console.error('Error POST prenda:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth.js';

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

    const prendas = await prisma.prendas.findMany({
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
    const color = formData.get('color');
    const descripcion = formData.get('descripcion') || '';
    const etiquetas = formData.get('etiquetas') || '[]';

    if (!nombre || !tipo || !talle || !color) {
      return NextResponse.json({ error: 'Nombre, tipo, talle y color son obligatorios' }, { status: 400 });
    }

    const prenda = await prisma.prendas.create({
      data: {
        nombre,
        tipo,
        talle,
        color,
        descripcion,
        etiquetas,
        id_usuario: decoded.id,
      },
    });

    return NextResponse.json({ prenda }, { status: 201 });

  } catch (error) {
    console.error('Error POST prenda:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}