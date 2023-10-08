import type { SimpananType } from './simpanan.type';

export interface SimpananDeskripsiTahapan {
  id: string;
  simpanan_id: string;
  simpanan: SimpananType;
  sort: number;
  value: string;
}
