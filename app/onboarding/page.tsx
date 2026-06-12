"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STYLES = [
  { id: "casual", label: "Casual", icon: "👕" },
  { id: "formal", label: "Formal", icon: "👔" },
  { id: "sporty", label: "Sporty", icon: "🏃" },
  { id: "bohemian", label: "Bohemian", icon: "🌸" },
  { id: "minimalist", label: "Minimalist", icon: "◻" },
  { id: "vintage", label: "Vintage", icon: "✨" },
  { id: "streetwear", label: "Streetwear", icon: "🧢" },
  { id: "elegant", label: "Elegant", icon: "💎" },
];

const COLORS = [
  { id: "sage", hex: "#A8C5A0", label: "Sage" },
  { id: "terracotta", hex: "#C9856E", label: "Terracotta" },
  { id: "navy", hex: "#2C3E6E", label: "Navy" },
  { id: "cream", hex: "#E8E0D0", label: "Cream" },
  { id: "blush", hex: "#E8B4B8", label: "Blush" },
  { id: "forest", hex: "#2C3E2D", label: "Forest" },
  { id: "gold", hex: "#C9A96E", label: "Gold" },
  { id: "lavender", hex: "#C5B8E8", label: "Lavender" },
  { id: "sand", hex: "#D4C5A9", label: "Sand" },
  { id: "slate", hex: "#8FA3B1", label: "Slate" },
  { id: "rose", hex: "#D4A0A0", label: "Rose" },
  { id: "charcoal", hex: "#4A4A4A", label: "Charcoal" },
];

const SIZES_TOP = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZES_BOTTOM = ["34", "36", "38", "40", "42", "44", "46"];
const SIZES_SHOES = ["35", "36", "37", "38", "39", "40", "41", "42"];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sizeTop, setSizeTop] = useState("");
  const [sizeBottom, setSizeBottom] = useState("");
  const [sizeShoes, setSizeShoes] = useState("");

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const toggleColor = (id: string) => {
    setSelectedColors(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const canContinue = () => {
    if (step === 1) return selectedStyles.length > 0;
    if (step === 2) return selectedColors.length > 0;
    if (step === 3) return sizeTop !== "" && sizeBottom !== "" && sizeShoes !== "";
    return true;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden" style={{ background: "#F9F5F0" }}>

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "#A8C5A0" }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: "#C9A96E" }} />
      <div className="absolute top-1/2 left-[-40px] w-48 h-48 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: "#2C3E2D" }} />

      {/* Decorative symbols */}
      <span className="absolute top-8 right-16 opacity-10 select-none pointer-events-none" style={{ color: "#2C3E2D", fontSize: "100px", fontWeight: 200, lineHeight: 1 }}>✦</span>
      <span className="absolute bottom-16 right-8 opacity-10 select-none pointer-events-none" style={{ color: "#C9A96E", fontSize: "60px" }}>◎</span>

      {/* Header */}
      <div className="flex items-center justify-between px-10 py-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: "#2C3E2D" }}>
            <span style={{ color: "#2C3E2D", fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>+</span>
          </div>
          <span className="text-xs tracking-[0.4em] uppercase font-medium" style={{ color: "#2C3E2D" }}>ECloset</span>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? "24px" : "8px",
                height: "8px",
                background: i === step ? "#2C3E2D" : i < step ? "#A8C5A0" : "#d4d0ca",
              }}
            />
          ))}
        </div>

        <span className="text-xs tracking-wider" style={{ color: "#C9A96E" }}>
          {step + 1} / 4
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-px" style={{ background: "#e8e4de" }}>
        <div
          className="h-px transition-all duration-500"
          style={{ width: `${(step / 3) * 100}%`, background: "#A8C5A0" }}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-8 py-10 relative z-10 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl">

          {/* STEP 0 — Welcome */}
          {step === 0 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center" style={{ background: "rgba(168,197,160,0.2)" }}>
                <span style={{ fontSize: "2.2rem" }}>🌿</span>
              </div>
              <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#C9A96E" }}>Bienvenida a ECloset</p>
              <h2 className="mb-4" style={{ fontSize: "2.5rem", fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1a1a" }}>
                ¡Empecemos!
              </h2>
              <p className="text-sm leading-relaxed mx-auto mb-12" style={{ color: "#9a9a8e", fontWeight: 300, maxWidth: "400px" }}>
                Vamos a hacerte algunas preguntas rápidas para conocer tu estilo y personalizar tu closet digital sostenible.
              </p>
              <div className="flex justify-center gap-12 mb-12">
                {[
                  { emoji: "👗", label: "Estilo", bg: "rgba(168,197,160,0.15)" },
                  { emoji: "🎨", label: "Colores", bg: "rgba(201,169,110,0.15)" },
                  { emoji: "📏", label: "Talles", bg: "rgba(44,62,45,0.08)" },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: item.bg }}>
                      <span style={{ fontSize: "1.8rem" }}>{item.emoji}</span>
                    </div>
                    <p className="text-xs font-medium tracking-wider uppercase" style={{ color: "#9a9a8e" }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Style */}
          {step === 1 && (
            <div>
              <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#C9A96E" }}>Paso 1 de 3</p>
              <h2 className="mb-2" style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1a1a" }}>
                ¿Qué estilo te representa?
              </h2>
              <p className="text-sm mb-8" style={{ color: "#9a9a8e", fontWeight: 300 }}>
                Elegí hasta 3 opciones · <span style={{ color: "#A8C5A0" }}>{selectedStyles.length}/3 seleccionadas</span>
              </p>
              <div className="grid grid-cols-4 gap-3">
                {STYLES.map(style => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => toggleStyle(style.id)}
                    className="flex flex-col items-center gap-2 py-6 px-3 rounded-2xl transition-all"
                    style={{
                      background: selectedStyles.includes(style.id) ? "rgba(168,197,160,0.15)" : "#fff",
                      border: selectedStyles.includes(style.id) ? "1.5px solid #A8C5A0" : "1px solid #e8e4de",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: "1.8rem" }}>{style.icon}</span>
                    <span className="text-xs font-medium" style={{ color: selectedStyles.includes(style.id) ? "#2C3E2D" : "#6b6b60" }}>
                      {style.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Colors */}
          {step === 2 && (
            <div>
              <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#C9A96E" }}>Paso 2 de 3</p>
              <h2 className="mb-2" style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1a1a" }}>
                ¿Cuáles son tus colores?
              </h2>
              <p className="text-sm mb-8" style={{ color: "#9a9a8e", fontWeight: 300 }}>
                Elegí hasta 4 colores · <span style={{ color: "#A8C5A0" }}>{selectedColors.length}/4 seleccionados</span>
              </p>
              <div className="grid grid-cols-6 gap-6">
                {COLORS.map(color => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => toggleColor(color.id)}
                    className="flex flex-col items-center gap-2 transition-all"
                    style={{ cursor: "pointer", background: "transparent", border: "none" }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl transition-all duration-200"
                      style={{
                        background: color.hex,
                        border: selectedColors.includes(color.id) ? "3px solid #2C3E2D" : "2px solid transparent",
                        transform: selectedColors.includes(color.id) ? "scale(1.12)" : "scale(1)",
                        boxShadow: selectedColors.includes(color.id) ? "0 4px 14px rgba(0,0,0,0.18)" : "0 2px 6px rgba(0,0,0,0.08)",
                      }}
                    />
                    <span className="text-xs" style={{ color: "#9a9a8e" }}>{color.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 — Sizes */}
          {step === 3 && (
            <div>
              <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#C9A96E" }}>Paso 3 de 3</p>
              <h2 className="mb-2" style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1a1a" }}>
                ¿Cuáles son tus talles?
              </h2>
              <p className="text-sm mb-8" style={{ color: "#9a9a8e", fontWeight: 300 }}>
                Para que cada recomendación te quede perfecta.
              </p>
              <div className="space-y-8">
                {[
                  { label: "Parte superior", sizes: SIZES_TOP, value: sizeTop, setter: setSizeTop },
                  { label: "Parte inferior", sizes: SIZES_BOTTOM, value: sizeBottom, setter: setSizeBottom },
                  { label: "Calzado", sizes: SIZES_SHOES, value: sizeShoes, setter: setSizeShoes },
                ].map(({ label, sizes, value, setter }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium tracking-wider uppercase mb-3" style={{ color: "#6b6b60" }}>
                      {label}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {sizes.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setter(size)}
                          className="w-14 h-12 rounded-xl text-sm font-medium transition-all"
                          style={{
                            background: value === size ? "#2C3E2D" : "#fff",
                            color: value === size ? "#F9F5F0" : "#6b6b60",
                            border: value === size ? "1.5px solid #2C3E2D" : "1px solid #e8e4de",
                            cursor: "pointer",
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue()}
              className="w-full py-4 text-sm font-medium tracking-widest uppercase transition-all"
              style={{
                background: canContinue() ? "#2C3E2D" : "#d4d0ca",
                color: canContinue() ? "#F9F5F0" : "#a0a09a",
                borderRadius: "12px",
                letterSpacing: "0.15em",
                cursor: canContinue() ? "pointer" : "not-allowed",
                border: "none",
              }}
            >
              {step === 0 && "Empecemos →"}
              {step === 1 && "Siguiente →"}
              {step === 2 && "Siguiente →"}
              {step === 3 && "¡Listo, ver mi closet!"}
            </button>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="w-full py-3 text-xs transition-colors"
                style={{ color: "#b0b0a5", background: "transparent", border: "none", cursor: "pointer" }}
              >
                ← Volver
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-full py-2 text-xs"
                style={{ color: "#c0bdb7", background: "transparent", border: "none", cursor: "pointer" }}
              >
                Completar más tarde
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
