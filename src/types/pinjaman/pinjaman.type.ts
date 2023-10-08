export interface PinjamanJenis {
  id: string;
  name: string;
}

export interface PinjamanJangkaWaktu {
  id: string;
  company_formula_id: string;
  satuan_waktu: 'HARIAN' | 'MINGGUAN' | 'BULANAN';
  waktu: number;
  suku_bunga_a: number;
  suku_bunga_b: number;
}

export interface PinjamanTahapan {
  id: string;
  pinjaman_id: string;
  value: string;
}

export interface Pinjaman {
  id: string;
  company_id: string;
  pinjaman_jenis_id: string;
  name: string;
  code: string;
  description: string;
  min_nominal: number;
  max_nominal: number;
  down_payment: 1 | 0; // 1: wajib, 0: tidak wajib
  down_payment_nominal: number;
  biaya_provisi: number;
  biaya_pencairan: number;
  biaya_materai: number;
  status: number;

  pinjaman_jenis: PinjamanJenis;
  pinjaman_jangka_waktu: PinjamanJangkaWaktu[];
  pinjaman_tahapan: PinjamanTahapan[];
}

export interface PinjamanNasabahDTO {
  updated_at: string;
  name: string;
  pokok_pinjaman: number;
  jangka_waktu: number;
  bunga_pa: number;
  status: number;
  pinjaman: Pinjaman;
}
