import { Prenda } from "@/types/prenda";

interface Props {
  prenda: Prenda;
}

export default function GarmentCard({ prenda }: Props) {
  return (
    <div
      className="overflow-hidden rounded-[24px]"
      style={{
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}
    >
      {prenda.imagen_url ? (
        <img
          src={prenda.imagen_url}
          alt={prenda.nombre}
          className="w-full h-52 object-cover"
        />
      ) : (
        <div
          className="h-52 flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg,#eaf4eb,#f4ede2)",
          }}
        >
          <span className="text-5xl">👗</span>

          <p
            className="text-xs mt-3 uppercase tracking-[0.15em]"
            style={{ color: "#9a9a8e" }}
          >
            Sin imagen
          </p>
        </div>
      )}

      <div className="p-4">
        <h3
          className="font-light text-base"
          style={{ color: "#1a1a1a" }}
        >
          {prenda.nombre}
        </h3>

        <div className="mt-3 space-y-1">
          <p
            className="text-[11px] uppercase tracking-[0.15em]"
            style={{ color: "#9a9a8e" }}
          >
            {prenda.tipo}
          </p>

          <p className="text-sm font-light">
            Color: {prenda.color}
          </p>

          {prenda.talle && (
            <p className="text-sm font-light">
              Talle: {prenda.talle}
            </p>
          )}
        </div>

        <button
          className="mt-4 w-full py-3 rounded-[12px] text-[11px] uppercase tracking-[0.18em]"
          style={{
            background: "#fff",
            border: "1px solid #e8e4de",
            color: "#4a4a42",
          }}
        >
          Editar
        </button>
      </div>
    </div>
  );
}