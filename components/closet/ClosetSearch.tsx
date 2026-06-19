interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ClosetSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Buscar en tu closet..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-[12px] px-4 py-3 outline-none"
      style={{
        background: "#fff",
        border: "1px solid #e8e4de",
      }}
    />
  );
}