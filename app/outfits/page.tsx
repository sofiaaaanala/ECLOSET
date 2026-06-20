'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function OutfitsPage() {


  const [outfits, setOutfits] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(()=>{

  async function cargarOutfits(){

    try{

      const res = await fetch('/api/outfits',{
        credentials:'include'
      })


      console.log("STATUS OUTFITS:", res.status)


      const data = await res.json()


      console.log("DATA OUTFITS:", data)


      if(res.ok){
        setOutfits(data.outfits || [])
      }


    }catch(error){

      console.error(error)

    }finally{

      setLoading(false)

    }

  }


  cargarOutfits()


},[])




  return (
    <main
      className="min-h-screen px-5 pt-6 pb-28 relative overflow-hidden"
      style={{ backgroundColor:'#F9F5F0' }}
    >


      <div className="relative z-10">


        <div className="flex justify-between items-center mb-8">

          <div>

            <p className="uppercase text-[10px] tracking-[0.18em]"
            style={{color:'#6b6b60'}}>

              Tu armario digital

            </p>


            <h1 className="text-[2rem] font-light mt-1">

              Mis Outfits ✨

            </h1>

          </div>


          <Link
            href="/outfits/crear"
            className="px-5 py-3 rounded-[14px] text-[11px] uppercase tracking-[0.18em]"
            style={{
              background:'#2C3E2D',
              color:'#F9F5F0'
            }}
          >

            Crear

          </Link>


        </div>




        {loading && (

          <p>Cargando outfits...</p>

        )}





        {!loading && outfits.length === 0 && (

          <p className="text-sm">

            Todavía no tenés outfits creados ✨

          </p>

        )}






        <div className="grid grid-cols-2 gap-4">


        {outfits.map((outfit:any)=>(


          <div
            key={outfit.id_output}
            className="rounded-[28px] overflow-hidden"
            style={{
              background:'rgba(255,255,255,0.85)'
            }}
          >


            <div
              className="h-52 flex items-center justify-center text-4xl"
              style={{
                background:
                'linear-gradient(135deg,#d7ead4,#f4ede2)'
              }}
            >

              👕👖👟


            </div>



            <div className="p-4">


              <span
              className="text-[10px] uppercase tracking-[0.18em]"
              style={{color:'#A8C5A0'}}
              >

                {outfit.categoria || 'Sin categoría'}

              </span>



              <h3 className="mt-2 text-sm">

                {outfit.nombre}

              </h3>



              <p className="text-[11px] mt-1"
              style={{color:'#9a9a8e'}}>

                {outfit.prendas?.length || 0} prendas

              </p>


            </div>


          </div>


        ))}



        <Link
        href="/outfits/crear"
        className="rounded-[28px] flex flex-col items-center justify-center min-h-[290px]"
        style={{
          border:'2px dashed #A8C5A0'
        }}
        >

          <span
          className="text-6xl"
          style={{color:'#A8C5A0'}}
          >
            +
          </span>


          <p
          className="mt-3 text-sm"
          style={{color:'#2C3E2D'}}
          >
            Crear Outfit
          </p>


        </Link>



        </div>


      </div>


    </main>
  )

}