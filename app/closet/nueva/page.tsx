"use client";

import { useState, useRef } from "react";

const CATEGORIAS_PREDEFINIDAS = [
  "Remera", "Camisa", "Vestido", "Pantalón", "Jean", "Pollera",
  "Abrigo", "Campera", "Sweater", "Shorts", "Calzado", "Accesorio"
];

const ETIQUETAS_PREDEFINIDAS = [
  "Favorita", "Verano", "Invierno", "Primavera", "Otoño",
  "Casual", "Formal", "Deportivo", "Fiesta", "Trabajo"
];

const TALLES_ROPA = ["XS", "S", "M", "L", "XL", "XXL", "34", "36", "38", "40", "42", "44"];

interface Props {
  onClose: () => void;
}

export default function NuevaPrenda({ onClose }: Props) {
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categoriaCustom, setCategoriaCustom] = useState("");
  const [talle, setTalle] = useState("");
  const [color, setColor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [etiquetas, setEtiquetas] = useState<string[]>([]);
  const [etiquetaCustom, setEtiquetaCustom] = useState("");
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const permitidos = ["image/jpeg", "image/png", "image/webp"];
    if (!permitidos.includes(file.type)) {
      setError("Formato no válido. Usá JPG, PNG o WEBP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5MB.");
      return;
    }
    setError("");
    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  const toggleEtiqueta = (e: string) => {
    setEtiquetas(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);
  };

  const agregarEtiquetaCustom = () => {
    const tag = etiquetaCustom.trim();
    if (tag && !etiquetas.includes(tag)) {
      setEtiquetas(prev => [...prev, tag]);
      setEtiquetaCustom("");
    }
  };

  const handleSubmit = async () => {
    if (!nombre || !categoria || !talle || !color) {
      setError("Completá nombre, categoría, talle y color.");
      return;
    }
    setCargando(true);
    setError("");
    try {
      const formData = new FormData();
      if (imagen) formData.append("imagen", imagen);
      formData.append("nombre", nombre);
      formData.append("tipo", categoriaCustom || categoria);
      formData.append("talle", talle);
      formData.append("color", color);
      formData.append("descripcion", descripcion);
      formData.append("etiquetas", JSON.stringify(etiquetas));

      const res = await fetch("/api/prendas", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Error al guardar");
      setExito(true);
      setTimeout(() => onClose(), 1800);
    } catch {
      setError("Algo salió mal. Intentá de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    background: "#fafaf7",
    border: "1px solid #e8e4de",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#1a1a1a",
    outline: "none",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "#6b6b60",
    marginBottom: "6px",
  };

  if (exito) {
    return (
      <div className="flex flex-col items-center justify-center text-center" style={{ background: "#fff", borderRadius: "24px", padding: "3rem 2.5rem", width: "420px" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(168,197,160,0.2)" }}>
          <span style={{ fontSize: "2rem" }}>🌿</span>
        </div>
        <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#C9A96E" }}>¡Listo!</p>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 300, color: "#1a1a1a", marginBottom: "8px" }}>Prenda agregada</h3>
        <p style={{ fontSize: "13px", color: "#9a9a8e", fontWeight: 300 }}>Ya forma parte de tu closet sostenible ✦</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        width: "520px",
        maxHeight: "88vh",
        overflowY: "auto",
        boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
        position: "relative",
      }}
    >
      {/* Header del modal */}
      <div style={{ padding: "1.5rem 1.75rem 1rem", borderBottom: "1px solid #f0ede8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "4px" }}>Tu closet</p>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 300, color: "#1a1a1a", letterSpacing: "-0.01em" }}>Agregar prenda</h2>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#b0b0a5", fontSize: "20px", lineHeight: 1, padding: "4px" }}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "1.5rem 1.75rem" }}>

        {/* Upload imagen */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Imagen de la prenda</label>
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: "1.5px dashed #e8e4de",
              borderRadius: "14px",
              padding: "1.5rem",
              textAlign: "center",
              cursor: "pointer",
              background: preview ? "#fafaf7" : "transparent",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#A8C5A0")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "#e8e4de")}
          >
            {preview ? (
              <img src={preview} alt="preview" style={{ maxHeight: "140px", maxWidth: "100%", borderRadius: "10px", margin: "0 auto" }} />
            ) : (
              <>
                <p style={{ fontSize: "1.5rem", marginBottom: "8px" }}>📷</p>
                <p style={{ fontSize: "12px", color: "#9a9a8e", fontWeight: 300 }}>Tocá para subir una foto</p>
                <p style={{ fontSize: "11px", color: "#c0bdb7", marginTop: "4px" }}>JPG, PNG o WEBP · Máx 5MB</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImagen} style={{ display: "none" }} />
        </div>

        {/* Nombre */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Nombre de la prenda *</label>
          <input
            style={inputStyle}
            placeholder="Ej: Vestido floral de verano"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            onFocus={e => (e.target.style.borderColor = "#A8C5A0")}
            onBlur={e => (e.target.style.borderColor = "#e8e4de")}
          />
        </div>

        {/* Categoría */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Categoría *</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
            {CATEGORIAS_PREDEFINIDAS.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => { setCategoria(cat); setCategoriaCustom(""); }}
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  border: categoria === cat ? "1.5px solid #A8C5A0" : "1px solid #e8e4de",
                  background: categoria === cat ? "rgba(168,197,160,0.15)" : "#fafaf7",
                  color: categoria === cat ? "#2C3E2D" : "#6b6b60",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            style={{ ...inputStyle, marginTop: "4px" }}
            placeholder="O escribí una categoría propia..."
            value={categoriaCustom}
            onChange={e => { setCategoriaCustom(e.target.value); setCategoria(""); }}
            onFocus={e => (e.target.style.borderColor = "#A8C5A0")}
            onBlur={e => (e.target.style.borderColor = "#e8e4de")}
          />
        </div>

        {/* Talle y color en fila */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
          <div>
            <label style={labelStyle}>Talle *</label>
            <select
              style={{ ...inputStyle, color: talle ? "#1a1a1a" : "#9a9a8e", appearance: "none" }}
              value={talle}
              onChange={e => setTalle(e.target.value)}
              onFocus={e => (e.target.style.borderColor = "#A8C5A0")}
              onBlur={e => (e.target.style.borderColor = "#e8e4de")}
            >
              <option value="">Seleccioná</option>
              {TALLES_ROPA.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Color *</label>
            <input
              style={inputStyle}
              placeholder="Ej: Verde sage"
              value={color}
              onChange={e => setColor(e.target.value)}
              onFocus={e => (e.target.style.borderColor = "#A8C5A0")}
              onBlur={e => (e.target.style.borderColor = "#e8e4de")}
            />
          </div>
        </div>

        {/* Descripción */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Descripción</label>
          <textarea
            style={{ ...inputStyle, resize: "none", height: "72px" }}
            placeholder="Contá algo sobre esta prenda... ¿de dónde es? ¿con qué la usás?"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            onFocus={e => (e.target.style.borderColor = "#A8C5A0")}
            onBlur={e => (e.target.style.borderColor = "#e8e4de")}
          />
        </div>

        {/* Etiquetas */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Etiquetas</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
            {ETIQUETAS_PREDEFINIDAS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleEtiqueta(tag)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  border: etiquetas.includes(tag) ? "1.5px solid #C9A96E" : "1px solid #e8e4de",
                  background: etiquetas.includes(tag) ? "rgba(201,169,110,0.12)" : "#fafaf7",
                  color: etiquetas.includes(tag) ? "#8a6a3a" : "#6b6b60",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {tag}
              </button>
            ))}
            {etiquetas.filter(e => !ETIQUETAS_PREDEFINIDAS.includes(e)).map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleEtiqueta(tag)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  border: "1.5px solid #C9A96E",
                  background: "rgba(201,169,110,0.12)",
                  color: "#8a6a3a",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {tag} ✕
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              placeholder="Agregar etiqueta propia..."
              value={etiquetaCustom}
              onChange={e => setEtiquetaCustom(e.target.value)}
              onKeyDown={e => e.key === "Enter" && agregarEtiquetaCustom()}
              onFocus={e => (e.target.style.borderColor = "#A8C5A0")}
              onBlur={e => (e.target.style.borderColor = "#e8e4de")}
            />
            <button
              type="button"
              onClick={agregarEtiquetaCustom}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                fontSize: "12px",
                border: "1px solid #e8e4de",
                background: "#fafaf7",
                color: "#2C3E2D",
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              + Agregar
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ fontSize: "12px", color: "#c0392b", marginBottom: "1rem", padding: "10px 14px", background: "#fdf0f0", borderRadius: "10px" }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={cargando}
          style={{
            width: "100%",
            padding: "13px",
            background: cargando ? "#d4d0ca" : "#2C3E2D",
            color: cargando ? "#a0a09a" : "#F9F5F0",
            borderRadius: "12px",
            border: "none",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: cargando ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => { if (!cargando) e.currentTarget.style.background = "#3d5c3e"; }}
          onMouseLeave={e => { if (!cargando) e.currentTarget.style.background = "#2C3E2D"; }}
        >
          {cargando ? "Guardando..." : "Agregar al closet ✦"}
        </button>

        <p style={{ textAlign: "center", fontSize: "11px", color: "#c0bdb7", marginTop: "12px", fontWeight: 300 }}>
          Cada prenda que sumás es un paso hacia un closet más consciente 🌿
        </p>
      </div>
    </div>
  );
}
