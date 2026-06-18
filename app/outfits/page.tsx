'use client'

import Link from 'next/link'

const outfits = [
  {
    id: 1,
    nombre: 'Look de Lunes',
    categoria: 'Vintage',
    prendas: 3,
    emoji: '👕👖👟'
  },
  {
    id: 2,
    nombre: 'Parque & Eco',
    categoria: 'Eco',
    prendas: 4,
    emoji: '🌿👚👖'
  },
  {
    id: 3,
    nombre: 'Noche Minimal',
    categoria: 'Minimal',
    prendas: 3,
    emoji: '🖤👔👞'
  },
  {
    id: 4,
    nombre: 'Sábado Relax',
    categoria: 'Street',
    prendas: 3,
    emoji: '🧥👟🧢'
  }
]

export default function OutfitsPage() {
  return (
    <main
      className="min-h-screen px-5 pt-6 pb-28 relative overflow-hidden"
      style={{ backgroundColor: '#F9F5F0' }}
    >
      {/* blobs decorativos */}
      <div
        className="absolute top-[-80px] left-[-60px] w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: '#A8C5A0' }}
      />

      <div
        className="absolute bottom-0 right-[-80px] w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: '#C9A96E' }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p
              className="uppercase text-[10px] tracking-[0.18em]"
              style={{ color: '#6b6b60' }}
            >
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
              background: '#2C3E2D',
              color: '#F9F5F0'
            }}
          >
            Crear
          </Link>
        </div>

        {/* buscador */}
        <div
          className="rounded-[22px] p-3 mb-8"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid #e8e4de'
          }}
        >
          <input
            type="text"
            placeholder="Buscar outfit..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* outfits */}
        <div className="grid grid-cols-2 gap-4">

          {outfits.map((outfit) => (
            <div
              key={outfit.id}
              className="rounded-[28px] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.85)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            >
              <div
                className="h-52 flex items-center justify-center text-4xl"
                style={{
                  background:
                    'linear-gradient(135deg,#d7ead4,#f4ede2)'
                }}
              >
                {outfit.emoji}
              </div>

              <div className="p-4">
                <span
                  className="text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: '#A8C5A0' }}
                >
                  {outfit.categoria}
                </span>

                <h3 className="mt-2 text-sm font-light">
                  {outfit.nombre}
                </h3>

                <p
                  className="text-[11px] mt-1"
                  style={{ color: '#9a9a8e' }}
                >
                  {outfit.prendas} prendas
                </p>
              </div>
            </div>
          ))}

          {/* crear outfit */}
          <Link
            href="/outfits/crear"
            className="rounded-[28px] flex flex-col items-center justify-center min-h-[290px]"
            style={{
              border: '2px dashed #A8C5A0',
              background: 'rgba(255,255,255,0.4)',
            }}
          >
            <span
              className="text-6xl"
              style={{ color: '#A8C5A0' }}
            >
              +
            </span>

            <p
              className="mt-3 text-sm"
              style={{ color: '#2C3E2D' }}
            >
              Crear Outfit
            </p>
          </Link>

        </div>
      </div>
    </main>
  )
}