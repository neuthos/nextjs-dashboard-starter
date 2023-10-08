import type { SimpananType } from './simpanan.type';

export interface SimpananJangkaWaktuType {
  id: string;
  simpanan_id: string;
  simpanan: SimpananType;
  jangka_waktu: number;
  status: number;
  bunga_default_persentase: number;
  pajak_default_persentase?: number;
  created_at: Date | string;
  updated_at: Date | string;
}
