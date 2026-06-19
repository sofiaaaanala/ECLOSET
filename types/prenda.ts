export interface Prenda {
  id_prenda: number;
  nombre: string;
  tipo: string;
  color: string;
  talle?: string;
  marca?: string;
  temporada?: string;
  descripcion?: string;
  imagen_url?: string;
  etiquetas?: string[];
}