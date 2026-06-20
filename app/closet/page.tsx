"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, Plus } from "lucide-react";
import { useRouter } from 'next/navigation';

import ClosetSearch from "@/components/closet/ClosetSearch";
import ClosetFilters from "@/components/closet/ClosetFilters";
import GarmentCard from "@/components/closet/GarmentCard";
import BottomNavigation from "@/components/closet/BottomNavigation";

import { Prenda } from "@/types/prenda";

export default function ClosetPage() {
  const [prendas, setPrendas] = useState<Prenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoriaActiva, setCategoriaActiva] =
    useState("Todos");
  const router = useRouter();

  useEffect(() => {
    const fetchPrendas = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/prendas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPrendas(data.prendas || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrendas();
  }, []);

  const categorias = useMemo(() => {
    return [...new Set(prendas.map((p) => p.tipo))];
  }, [prendas]);

  const prendasFiltradas = useMemo(() => {
    return prendas.filter((prenda) => {
      const coincideBusqueda =
        prenda.nombre
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        prenda.tipo
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        prenda.color
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (prenda.marca || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const coincideCategoria =
        categoriaActiva === "Todos" ||
        prenda.tipo === categoriaActiva;

      return coincideBusqueda && coincideCategoria;
    });
  }, [prendas, search, categoriaActiva]);

  return (
    <main
      className="min-h-screen relative overflow-hidden px-5 pt-6 pb-32"
      style={{
        backgroundColor: "#F9F5F0",
      }}
    >
      {/* BLOBS */}

      <div
        className="absolute top-[-80px] left-[-60px] w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{
          background: "#A8C5A0",
        }}
      />

      <div
        className="absolute bottom-0 right-[-80px] w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{
          background: "#C9A96E",
        }}
      />

      {/* HEADER */}

      <section className="relative z-10">
        <p
          className="uppercase text-[10px] tracking-[0.18em]"
          style={{
            color: "#6b6b60",
          }}
        >
          Tu espacio personal
        </p>

        <h1 className="text-[2.2rem] font-light tracking-[-0.02em] mt-2">
          Mi Closet ✦
        </h1>

        <p
          className="mt-2 text-sm"
          style={{
            color: "#9a9a8e",
          }}
        >
          Organiza tu estilo y encuentra cada prenda fácilmente.
        </p>
      </section>

      {/* BOTON NUEVA PRENDA */}

      <button
        onClick={() => router.push('/prendas/nueva')}
        className="mt-6 w-full rounded-[12px] py-4 flex items-center justify-center gap-2"
        style={{
          background: "#2C3E2D",
          color: "#F9F5F0",
        }}
      >
        <Plus size={18} />
        NUEVA PRENDA
      </button>

      {/* BUSCADOR */}

      <section className="mt-6">
        <ClosetSearch
          value={search}
          onChange={setSearch}
        />
      </section>

      {/* FILTROS */}

      <section className="mt-5">
        <ClosetFilters
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          setCategoriaActiva={setCategoriaActiva}
        />
      </section>

      {/* CONTADOR */}

      <section className="mt-6">
        <p
          className="text-sm"
          style={{
            color: "#6b6b60",
          }}
        >
          {prendasFiltradas.length} prendas encontradas
        </p>
      </section>

      {/* GRID */}

      <section className="mt-6">
        {loading ? (
          <div className="text-center py-16">
            Cargando prendas...
          </div>
        ) : prendasFiltradas.length === 0 ? (
          <div
            className="rounded-[24px] p-10 text-center"
            style={{
              background: "rgba(255,255,255,0.85)",
            }}
          >
            <p className="text-lg font-light">
              Todavía no tienes prendas
            </p>

            <p
              className="mt-2 text-sm"
              style={{
                color: "#9a9a8e",
              }}
            >
              Comienza agregando tu primera prenda ✦
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {prendasFiltradas.map((prenda) => (
              <GarmentCard
                key={prenda.id_prenda}
                prenda={prenda}
              />
            ))}
          </div>
        )}
      </section>

      <BottomNavigation />
    </main>
  );
}