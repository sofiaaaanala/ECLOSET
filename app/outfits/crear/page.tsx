'use client'

import Link from 'next/link'

export default function CrearOutfitPage() {
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

      <div className="relative z-10 max-w-xl mx-auto">
        {/* volver */}
        <Link
          href="/outfits"
          className="inline-block mb-6 text-sm"
          style={{ color: '#2C3E2D' }}
        >
          ← Volver a Mis Outfits
        </Link>

        {/* titulo */}
        <div className="mb-8">
          <p
            className="uppercase text-[10px] tracking-[0.18em]"
            style={{ color: '#6b6b60' }}
          >
            Nuevo outfit
          </p>

          <h1 className="text-[2rem] font-light mt-1">
            Crear Outfit ✨
          </h1>
        </div>

        {/* formulario */}
        <div
          className="rounded-[30px] p-6"
          style={{
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {/* preview */}
          <div
            className="h-52 rounded-[24px] flex items-center justify-center text-6xl mb-6"
            style={{
              background:
                'linear-gradient(135deg,#d7ead4,#f4ede2)',
            }}
          >
            👕👖👟
          </div>

          {/* nombre */}
          <div className="mb-5">
            <label className="block mb-2 text-sm">
              Nombre del Outfit
            </label>

            <input
              type="text"
              placeholder="Ej: Look de Oficina"
              className="w-full rounded-2xl border px-4 py-3 outline-none"
            />
          </div>

          {/* categoria */}
          <div className="mb-5">
            <label className="block mb-2 text-sm">
              Categoría
            </label>

            <select className="w-full rounded-2xl border px-4 py-3 outline-none">
              <option>Casual</option>
              <option>Vintage</option>
              <option>Street</option>
              <option>Minimal</option>
              <option>Eco</option>
              <option>Formal</option>
            </select>
          </div>

          {/* descripcion */}
          <div className="mb-6">
            <label className="block mb-2 text-sm">
              Descripción
            </label>

            <textarea
              rows={4}
              placeholder="Describe tu outfit..."
              className="w-full rounded-2xl border px-4 py-3 outline-none resize-none"
            />
          </div>

          {/* boton */}
          <button
            className="w-full py-4 rounded-2xl font-medium transition hover:opacity-90"
            style={{
              background: '#2C3E2D',
              color: '#F9F5F0',
            }}
          >
            Guardar Outfit
          </button>
        </div>
      </div>
    </main>
  )
}