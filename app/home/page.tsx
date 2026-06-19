"use client";

import Link from "next/link";


import { Search, Sun } from "lucide-react";
import BottomNavigation from "@/components/closet/BottomNavigation";

export default function HomePage() {
  return (
    <main
      className="min-h-screen relative overflow-hidden px-5 pb-28 pt-6 font-sans"
      style={{ backgroundColor: "#F9F5F0", color: "#1a1a1a" }}
    >
      {/* BLOBS */}
      <div
        className="absolute top-[-80px] left-[-60px] w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: "#A8C5A0" }}
      />

      <div
        className="absolute bottom-0 right-[-80px] w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: "#C9A96E" }}
      />

      {/* FLOATING SYMBOLS */}
      <span
        className="absolute top-10 right-6 text-xl"
        style={{ color: "#C9A96E", opacity: 0.2 }}
      >
        ✦
      </span>

      <span
        className="absolute bottom-40 left-4 text-xl"
        style={{ color: "#A8C5A0", opacity: 0.2 }}
      >
        ◎
      </span>

      {/* HEADER */}
      <section className="flex items-center justify-between mb-7 relative z-10">
        <div>
          <p
            className="uppercase text-[10px] tracking-[0.18em]"
            style={{ color: "#6b6b60" }}
          >
            Tu espacio sostenible
          </p>

          <h1 className="text-[2rem] font-light tracking-[-0.02em] mt-1">
            Hola, abi ✨
          </h1>
        </div>

        <button
          className="w-11 h-11 rounded-full flex items-center justify-center border"
          style={{
            borderColor: "#e8e4de",
            background: "rgba(255,255,255,0.85)",
          }}
        >
          <Search size={18} />
        </button>
      </section>

      {/* WEATHER CARD */}
      <section
        className="rounded-[24px] p-5 mb-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #A8C5A0, #d7ead4)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-light">Ciudad de México</p>

            <h2 className="text-4xl font-light mt-2">24°</h2>

            <p className="text-sm mt-1 opacity-70">
              Perfecto para tonos tierra
            </p>
          </div>

          <Sun size={42} color="#F9F5F0" />
        </div>
      </section>

      {/* RECOMENDACIONES */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-light tracking-[-0.02em]">
            Recomendaciones Market
          </h3>

          <Link
            href="/market"
            className="text-xs italic"
            style={{ color: "#A8C5A0" }}
          >
            Ver todo
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {["Conscious Bag", "Pantalón Sage"].map((item, index) => (
            <div
              key={index}
              className="rounded-[24px] p-3"
              style={{
                background: "rgba(255,255,255,0.85)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="h-36 rounded-[18px] mb-3"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(135deg,#2C3E2D,#5b735d)"
                      : "linear-gradient(135deg,#C9A96E,#e8d1a8)",
                }}
              />

              <p className="text-sm font-light">{item}</p>

              <p
                className="text-[11px] uppercase tracking-[0.15em] mt-1"
                style={{ color: "#9a9a8e" }}
              >
                Moda circular
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONSULTAS */}
      <section className="mb-8">
        <h3 className="text-lg font-light mb-4">
          Consultas cerca de ti
        </h3>

        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {["Eco Outfit", "Vintage", "Minimal", "Capsule"].map((item) => (
            <button
              key={item}
              className="px-4 py-3 rounded-full whitespace-nowrap text-xs uppercase tracking-[0.15em]"
              style={{
                background: "#fff",
                border: "1px solid #e8e4de",
                color: "#4a4a42",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* OUTFITS */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-light">Fits Outfit</h3>

          <button
            className="text-xs italic"
            style={{ color: "#A8C5A0" }}
          >
            Inspiración ✦
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="rounded-[24px] overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.85)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="h-52"
                style={{
                  background:
                    "linear-gradient(135deg,#c8ab86,#8e6f4d)",
                }}
              />

              <div className="p-4">
                <p className="text-sm font-light">
                  Look de otoño
                </p>

                <p
                  className="text-[11px] uppercase tracking-[0.15em] mt-1"
                  style={{ color: "#9a9a8e" }}
                >
                  Sostenible
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section
        className="rounded-[28px] p-6 relative overflow-hidden"
        style={{
          background: "#f4ede2",
          border: "1px solid #e8e4de",
        }}
      >
        <span
          className="absolute top-4 right-5 text-lg"
          style={{ color: "#C9A96E", opacity: 0.2 }}
        >
          ✦
        </span>

        <p
          className="uppercase text-[10px] tracking-[0.18em]"
          style={{ color: "#6b6b60" }}
        >
          Nueva campaña
        </p>

        <h3 className="text-2xl font-light mt-2 leading-snug">
          Prendas con
          <span
            className="italic ml-2"
            style={{ color: "#A8C5A0" }}
          >
            segunda vida
          </span>
        </h3>

        <button
          className="mt-5 px-5 py-3 rounded-[12px] text-[11px] uppercase tracking-[0.18em]"
          style={{
            background: "#2C3E2D",
            color: "#F9F5F0",
          }}
        >
          Entrar a mi closet
        </button>
      </section>
          <BottomNavigation />
    </main>
  );
}