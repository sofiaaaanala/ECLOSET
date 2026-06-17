interface Props {
  categorias: string[];
  categoriaActiva: string;
  setCategoriaActiva: (categoria: string) => void;
}

export default function ClosetFilters({
  categorias,
  categoriaActiva,
  setCategoriaActiva,
}: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      <button
        onClick={() => setCategoriaActiva("Todos")}
        className="px-4 py-2 rounded-full whitespace-nowrap text-xs uppercase tracking-[0.15em]"
        style={{
          background:
            categoriaActiva === "Todos"
              ? "#2C3E2D"
              : "#fff",
          color:
            categoriaActiva === "Todos"
              ? "#F9F5F0"
              : "#4a4a42",
          border: "1px solid #e8e4de",
        }}
      >
        Todos
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria}
          onClick={() =>
            setCategoriaActiva(categoria)
          }
          className="px-4 py-2 rounded-full whitespace-nowrap text-xs uppercase tracking-[0.15em]"
          style={{
            background:
              categoriaActiva === categoria
                ? "#2C3E2D"
                : "#fff",
            color:
              categoriaActiva === categoria
                ? "#F9F5F0"
                : "#4a4a42",
            border: "1px solid #e8e4de",
          }}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}