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