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