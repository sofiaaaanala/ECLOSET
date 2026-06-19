"use client";

import Link from "next/link";
import {
  Home,
  ShoppingBag,
  Shirt,
  MessageCircle,
  User,
} from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md rounded-[28px] px-6 py-4 flex justify-between items-center z-50"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(18px)",
        border: "1px solid #e8e4de",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}
    >
      <Link href="/home" className="flex flex-col items-center gap-1">
        <Home size={21} color="#9a9a8e" />
        <span
          className="text-[9px] uppercase tracking-[0.14em]"
          style={{ color: "#9a9a8e" }}
        >
          Home
        </span>
      </Link>

      <button className="flex flex-col items-center gap-1">
        <ShoppingBag size={21} color="#9a9a8e" />
        <span
          className="text-[9px] uppercase tracking-[0.14em]"
          style={{ color: "#9a9a8e" }}
        >
          Market
        </span>
      </button>

      <Link
        href="/closet"
        className="w-14 h-14 rounded-full flex items-center justify-center -mt-10 relative"
        style={{
          background: "#2C3E2D",
          boxShadow: "0 10px 24px rgba(44,62,45,0.22)",
        }}
      >
        <Shirt size={22} color="#F9F5F0" />

        <div
          className="absolute -bottom-5 text-[9px] uppercase tracking-[0.14em]"
          style={{ color: "#2C3E2D" }}
        >
          Closet
        </div>
      </Link>

      <button className="flex flex-col items-center gap-1">
        <MessageCircle size={21} color="#9a9a8e" />
        <span
          className="text-[9px] uppercase tracking-[0.14em]"
          style={{ color: "#9a9a8e" }}
        >
          Mensajes
        </span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <User size={21} color="#9a9a8e" />
        <span
          className="text-[9px] uppercase tracking-[0.14em]"
          style={{ color: "#9a9a8e" }}
        >
          Perfil
        </span>
      </button>
    </nav>
  );
}