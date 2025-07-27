import { CoordenadasDto } from './coordenadas.dto';

export interface MotoDto {
  id: string;
  fechaCompra: string; // Formato: "YYYY-MM-DD"
  precioCompra: number;
  modelo: string;
  nombre: string;
  coordenadas: CoordenadasDto;
}
