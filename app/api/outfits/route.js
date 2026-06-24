// import { NextResponse } from 'next/server';
// import { Outfit, Prenda, syncDatabase } from '@/lib/models/index.js';
// import { verifyToken } from '@/lib/auth.js';

// let dbInitialized = false;
// const initDB = async () => {
//   if (!dbInitialized) {
//     await syncDatabase();
//     dbInitialized = true;
//   }
// };

// // GET: Obtener todos los outfits del usuario
// export async function GET(request) {
//   try {
//     await initDB();
    
//     const authHeader = request.headers.get('authorization');
//     const token = authHeader?.split(' ')[1];
//     const decoded = verifyToken(token);
    
//     if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
//     const outfits = await Outfit.findAll({
//       where: { usuario_id: decoded.id },
//       include: [{ model: Prenda, as: 'prendas', through: { attributes: [] } }],
//       order: [['createdAt', 'DESC']],
//     });
    
//     return NextResponse.json({ outfits });
    
//   } catch (error) {
//     return NextResponse.json({ error: 'Error interno' }, { status: 500 });
//   }
// }

// // POST: Crear un nuevo outfit con sus prendas
// export async function POST(request) {
//   try {
//     await initDB();
    
//     const authHeader = request.headers.get('authorization');
//     const token = authHeader?.split(' ')[1];
//     const decoded = verifyToken(token);
    
//     if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
//     const { nombre, descripcion, imagen_url, ocasiones, temporada, prendas_ids } = await request.json();
    
//     if (!nombre) {
//       return NextResponse.json({ error: 'El nombre del outfit es obligatorio' }, { status: 400 });
//     }
    
//     const outfit = await Outfit.create({
//       nombre,
//       descripcion,
//       imagen_url,
//       ocasiones: ocasiones || [],
//       temporada: temporada || 'todo',
//       usuario_id: decoded.id,
//     });
    
//     // Asociar prendas si se enviaron
//     if (prendas_ids && prendas_ids.length > 0) {
//       await outfit.addPrendas(prendas_ids);
//     }
    
//     // Recargar con las prendas asociadas
//     const outfitConPrendas = await Outfit.findByPk(outfit.id, {
//       include: [{ model: Prenda, as: 'prendas', through: { attributes: [] } }],
//     });
    
//     return NextResponse.json({ outfit: outfitConPrendas }, { status: 201 });
    
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma.js';
import { verifyToken } from '@/lib/auth.js';


// GET: Obtener todos los outfits del usuario
export async function GET(request) {

  try {


    const token = request.cookies.get('token')?.value;

    const decoded = verifyToken(token);


    if (!decoded) {

      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );

    }



    const outfits = await prisma.outfit.findMany({

      where: {
        id_usuario: decoded.id
      },


      include: {
        prendas: true
      },


      orderBy: {
        createdAt: 'desc'
      }


    });



    return NextResponse.json({
      outfits
    });



  } catch(error) {


    console.error(error);


    return NextResponse.json(
      { error:'Error interno' },
      { status:500 }
    );


  }

}





// POST: Crear outfit

export async function POST(request) {


  try {


    const token = request.cookies.get('token')?.value;

    const decoded = verifyToken(token);



    if (!decoded) {

      return NextResponse.json(
        { error:'No autorizado' },
        {status:401}
      );

    }




    const {
      nombre,
      categoria,
      descripcion,
      temporada,
      prendas_ids

    } = await request.json();





    if(!nombre){

      return NextResponse.json(
        {
          error:'El nombre del outfit es obligatorio'
        },
        {
          status:400
        }
      );

    }





    const outfit = await prisma.outfit.create({

      data:{


        nombre,


        categoria,


        descripcion,


        temporada,



        id_usuario: decoded.id,



        prendas: prendas_ids?.length

        ?

        {

          connect: prendas_ids.map(id => ({
            id_prenda:id
          }))

        }

        :

        undefined



      },



      include:{
        prendas:true
      }


    });





    return NextResponse.json(
      {
        outfit
      },
      {
        status:201
      }
    );





  }catch(error){


    console.error(error);


    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );


  }


}