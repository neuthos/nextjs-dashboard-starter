import type { SimpananJangkaWaktuType } from './jangka-waktu.type';
import type { SimpananDendaType } from './simpanan-denda.type';
import type { SimpananDeskripsiTahapan } from './tahapan';

export enum JeniSimpananEnum {
  SIMPANAN_POKOK = 'SIMPANAN_POKOK',
  SIMPANAN_WAJIB = 'SIMPANAN_WAJIB',
  SIMPANAN_BERJANGKA = 'SIMPANAN_BERJANGKA',
  SIMPANAN_SUKARELA = 'SIMPANAN_SUKARELA',
  SIMPANAN_DEPOSITO = 'SIMPANAN_DEPOSITO',
}

enum WaktuSetoranCategoryEnum {
  RELATIVE_DATE = 'RELATIVE_DATE',
  SPESIFIK_DATE = 'SPESIFIK_DATE',
  SETOR_DI_AWAL = 'SETOR_DI_AWAL',
  KAPAN_SAJA = 'KAPAN_SAJA',
  HARIAN = 'HARIAN',
  MINGGUAN = 'MINGGUAN',
  BULANAN = 'BULANAN',
}

enum SetoranJenisPerhitunganEnum {
  FIX = 'FIX',
  PERCENTAGE_PENGHASILAN = 'PERCENTAGE_PENGHASILAN',
}

enum PenarikanTypeEnum {
  KAPANPUN = 'KAPANPUN',
  SELESAI_KEANGGOTAAN = 'SELESAI_KEANGGOTAAN',
  SELESAI_PERIODE_SIMPANAN = 'SELESAI_PERIODE_SIMPANAN',
}

enum BungaSatuanRealisasiEnum {
  HARI = 'HARI',
  MINGGUAN = 'MINGGUAN',
  BULANAN = 'BULAN',
}

enum WaktuSetoranValue {
  HARIAN = 'HARIAN',
  BULANAN = 'BULANAN',
  SETOR_DI_AWAL = 'SETOR_DI_AWAL',
  KAPAN_SAJA = 'KAPAN_SAJA',
  SENIN = 'SENIN',
  SELASA = 'SELASA',
  RABU = 'RABU',
  KAMIS = 'KAMIS',
  JUMAT = 'JUMAT',
  SABTU = 'SABTU',
  MINGGU = 'MINGGU',
}

export interface SimpananType {
  id: string;
  company_id: string;
  code: string;
  jenis_simpanan: JeniSimpananEnum;
  name: string;
  description: string | null;
  status: number;
  waktu_setoran_category: WaktuSetoranCategoryEnum;
  waktu_setoran_value: WaktuSetoranValue;
  setoran_jenis_perhitungan: SetoranJenisPerhitunganEnum;
  setoran_nominal_min: string;
  setoran_nominal: string;
  setoran_nominal_max: string;
  setoran_batas_tanggal: string | null;
  setoran_batas_jam: string | null;
  bunga_company_formula_id: string | null;
  bunga_tanggal_realisasi: string;
  bunga_satuan_realisasi: BungaSatuanRealisasiEnum;
  bunga_default_persentase: string | null;
  pajak_default_persentase: string | null;
  penjamin_pinjaman: boolean;
  program_shu: boolean;
  penarikan_type: PenarikanTypeEnum;
  penarikan_maksimal: string;
  penarikan_maksimal_persentase: string;
  penarikan_minimal_hari: number;
  created_at: string;
  updated_at: string | null;
  updated_by: string;
  companyFormula: any | null;
  masa_berlaku_mulai?: string | null;
  masa_berlaku_akhir?: string | null;
  denda: SimpananDendaType[];
  jangka_waktu: SimpananJangkaWaktuType[];
  tahapan: SimpananDeskripsiTahapan[];
}
