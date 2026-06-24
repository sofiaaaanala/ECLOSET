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

// const verificarPropiedad = async (id, usuarioId) => {
//   const outfit = await Outfit.findByPk(id, {
//     include: [{ model: Prenda, as: 'prendas', through: { attributes: [] } }],
//   });
//   if (!outfit) return { error: 'Outfit no encontrado', status: 404 };
//   if (outfit.usuario_id !== usuarioId) return { error: 'No autorizado', status: 403 };
//   return { outfit };
// };

// export async function GET(request, { params }) {
//   try {
//     await initDB();
//     const { id } = await params;
    
//     const authHeader = request.headers.get('authorization');
//     const token = authHeader?.split(' ')[1];
//     const decoded = verifyToken(token);
    
//     if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
//     const result = await verificarPropiedad(id, decoded.id);
//     if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
    
//     return NextResponse.json({ outfit: result.outfit });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error interno' }, { status: 500 });
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     await initDB();
//     const { id } = await params;
    
//     const authHeader = request.headers.get('authorization');
//     const token = authHeader?.split(' ')[1];
//     const decoded = verifyToken(token);
    
//     if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
//     const result = await verificarPropiedad(id, decoded.id);
//     if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
    
//     const { nombre, descripcion, imagen_url, ocasiones, temporada, prendas_ids } = await request.json();
    
//     await result.outfit.update({
//       nombre: nombre || result.outfit.nombre,
//       descripcion: descripcion !== undefined ? descripcion : result.outfit.descripcion,
//       imagen_url: imagen_url !== undefined ? imagen_url : result.outfit.imagen_url,
//       ocasiones: ocasiones || result.outfit.ocasiones,
//       temporada: temporada || result.outfit.temporada,
//     });
    
//     // Actualizar prendas asociadas si se enviaron
//     if (prendas_ids) {
//       await result.outfit.setPrendas(prendas_ids);
//     }
    
//     const outfitActualizado = await Outfit.findByPk(id, {
//       include: [{ model: Prenda, as: 'prendas', through: { attributes: [] } }],
//     });
    
//     return NextResponse.json({ outfit: outfitActualizado });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error interno' }, { status: 500 });
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     await initDB();
//     const { id } = await params;
    
//     const authHeader = request.headers.get('authorization');
//     const token = authHeader?.split(' ')[1];
//     const decoded = verifyToken(token);
    
//     if (!decoded) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    
//     const result = await verificarPropiedad(id, decoded.id);
//     if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
    
//     await result.outfit.destroy();
    
//     return NextResponse.json({ message: 'Outfit eliminado correctamente' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error interno' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma.js';
import { verifyToken } from '@/lib/auth.js';



// verificar que el outfit sea del usuario

async function verificarPropiedad(id, usuarioId) {


  const outfit = await prisma.outfit.findUnique({

    where:{
      id_output:Number(id)
    },


    include:{
      prendas:true
    }

  });



  if(!outfit){

    return {
      error:'Outfit no encontrado',
      status:404
    };

  }



  if(outfit.id_usuario !== usuarioId){

    return {
      error:'No autorizado',
      status:403
    };

  }



  return {
    outfit
  };


}




// GET /api/outfits/[id]

export async function GET(request,{params}){


  try{


    const {id} = await params;


    const token = request.cookies.get('token')?.value;


    const decoded = verifyToken(token);



    if(!decoded){

      return NextResponse.json(
        {error:'No autorizado'},
        {status:401}
      );

    }



    const result = await verificarPropiedad(
      id,
      decoded.id
    );



    if(result.error){

      return NextResponse.json(
        {error:result.error},
        {status:result.status}
      );

    }



    return NextResponse.json({
      outfit:result.outfit
    });



  }catch(error){

    console.error(error);

    return NextResponse.json(
      {error:'Error interno'},
      {status:500}
    );

  }

}







// PUT actualizar outfit

export async function PUT(request,{params}){


  try{


    const {id} = await params;


    const token = request.cookies.get('token')?.value;


    const decoded = verifyToken(token);



    if(!decoded){

      return NextResponse.json(
        {error:'No autorizado'},
        {status:401}
      );

    }



    const result = await verificarPropiedad(
      id,
      decoded.id
    );



    if(result.error){

      return NextResponse.json(
        {error:result.error},
        {status:result.status}
      );

    }




    const {
      nombre,
      categoria,
      descripcion,
      temporada,
      imagen_url,
      prendas_ids

    } = await request.json();






    const outfitActualizado = await prisma.outfit.update({


      where:{
        id_output:Number(id)
      },


      data:{


        nombre:
          nombre ?? result.outfit.nombre,


        categoria:
          categoria ?? result.outfit.categoria,


        descripcion:
          descripcion ?? result.outfit.descripcion,


        temporada:
          temporada ?? result.outfit.temporada,


        imagen_url:
          imagen_url ?? result.outfit.imagen_url,



        ...(prendas_ids && {

          prendas:{
            set: prendas_ids.map(id=>({
              id_prenda:id
            }))
          }

        })

      },


      include:{
        prendas:true
      }


    });




    return NextResponse.json({
      outfit:outfitActualizado
    });




  }catch(error){


    console.error(error);


    return NextResponse.json(
      {error:'Error interno'},
      {status:500}
    );


  }

}







// DELETE eliminar outfit

export async function DELETE(request,{params}){


  try{


    const {id}=await params;


    const token=request.cookies.get('token')?.value;


    const decoded=verifyToken(token);



    if(!decoded){

      return NextResponse.json(
        {error:'No autorizado'},
        {status:401}
      );

    }




    const result=await verificarPropiedad(
      id,
      decoded.id
    );



    if(result.error){

      return NextResponse.json(
        {error:result.error},
        {status:result.status}
      );

    }




    await prisma.outfit.delete({

      where:{
        id_output:Number(id)
      }

    });



    return NextResponse.json({

      message:'Outfit eliminado correctamente'

    });




  }catch(error){


    console.error(error);


    return NextResponse.json(
      {error:'Error interno'},
      {status:500}
    );

  }

}