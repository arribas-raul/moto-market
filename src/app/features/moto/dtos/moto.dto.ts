import { CoordenadasDto } from './coordenadas.dto';

export interface MotoDto {
  id: string;
  fechaCompra?: string; // Format: "YYYY-MM-DD"
  precioCompra?: number;
  modelo?: string;
  nombre?: string;
  coordenadas?: CoordenadasDto;
}
