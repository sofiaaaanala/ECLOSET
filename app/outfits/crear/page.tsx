"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function CrearOutfitPage() {


  const router = useRouter()


  const [nombre,setNombre] = useState("")
  const [categoria,setCategoria] = useState("Casual")
  const [descripcion,setDescripcion] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")




  async function guardarOutfit(){


    setError("")


    if(!nombre.trim()){

      setError("El nombre del outfit es obligatorio")
      return

    }


    try{


      setLoading(true)



      const res = await fetch("/api/outfits",{

        method:"POST",

        credentials:"include",

        headers:{
          "Content-Type":"application/json"
        },


        body:JSON.stringify({

          nombre,
          categoria,
          descripcion,
          temporada:"Verano",
          prendas_ids:[]

        })


      })



      const data = await res.json()



      console.log("RESPUESTA:",data)



      if(!res.ok){

        setError(data.error || "Error al crear outfit")
        return

      }



      router.push("/outfits")



    }catch(error){


      console.error(error)

      setError("Error de conexión")


    }finally{

      setLoading(false)

    }



  }





  return (

    <main
      className="min-h-screen px-5 pt-6 pb-28 relative overflow-hidden"
      style={{backgroundColor:"#F9F5F0"}}
    >


      {/* blobs */}

      <div
        className="absolute top-[-80px] left-[-60px] w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{background:"#A8C5A0"}}
      />


      <div
        className="absolute bottom-0 right-[-80px] w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{background:"#C9A96E"}}
      />



      <div className="relative z-10 max-w-xl mx-auto">



        <Link
          href="/outfits"
          className="inline-block mb-6 text-sm"
          style={{color:"#2C3E2D"}}
        >

          ← Volver a Mis Outfits

        </Link>





        <div className="mb-8">


          <p
          className="uppercase text-[10px] tracking-[0.18em]"
          style={{color:"#6b6b60"}}
          >

            Nuevo outfit

          </p>


          <h1 className="text-[2rem] font-light mt-1">

            Crear Outfit ✨

          </h1>


        </div>






        <div

        className="rounded-[30px] p-6"

        style={{

          background:"rgba(255,255,255,0.85)",

          boxShadow:"0 8px 32px rgba(0,0,0,0.08)"

        }}

        >






          <div

          className="h-52 rounded-[24px] flex items-center justify-center text-6xl mb-6"

          style={{

            background:"linear-gradient(135deg,#d7ead4,#f4ede2)"

          }}

          >

            👕👖👟

          </div>







          <div className="mb-5">


            <label className="block mb-2 text-sm">

              Nombre del Outfit

            </label>


            <input

            value={nombre}

            onChange={(e)=>setNombre(e.target.value)}

            type="text"

            placeholder="Ej: Look de Oficina"

            className="w-full rounded-2xl border px-4 py-3 outline-none"

            />


          </div>







          <div className="mb-5">


            <label className="block mb-2 text-sm">

              Categoría

            </label>



            <select

            value={categoria}

            onChange={(e)=>setCategoria(e.target.value)}

            className="w-full rounded-2xl border px-4 py-3 outline-none"

            >


              <option>Casual</option>

              <option>Vintage</option>

              <option>Street</option>

              <option>Minimal</option>

              <option>Eco</option>

              <option>Formal</option>


            </select>



          </div>









          <div className="mb-6">


            <label className="block mb-2 text-sm">

              Descripción

            </label>



            <textarea


            value={descripcion}

            onChange={(e)=>setDescripcion(e.target.value)}


            rows={4}

            placeholder="Describe tu outfit..."


            className="w-full rounded-2xl border px-4 py-3 outline-none resize-none"


            />



          </div>







          {
          error && (

            <p
            className="mb-4 text-sm"
            style={{color:"#b85555"}}
            >

              {error}

            </p>

          )
          }








          <button

          onClick={guardarOutfit}

          disabled={loading}

          className="w-full py-4 rounded-2xl font-medium transition hover:opacity-90"

          style={{

            background:"#2C3E2D",

            color:"#F9F5F0"

          }}

          >

            {loading ? "Guardando..." : "Guardar Outfit"}

          </button>





        </div>




      </div>



    </main>

  )

}