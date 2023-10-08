import type { SimpananType } from './simpanan.type';

export enum BatasKeterlambatanSatuanEnum {
  HARI = 'HARI',
  MINGGU = 'MINGGU',
  BULAN = 'BULAN',
}

export enum TypeDendaSimpananEnum {
  TELAT_BAYAR_SETOR = 'TELAT_BAYAR_SETOR',
  PENARIKAN_SEBELUM_WAKTUNYA = 'PENARIKAN_SEBELUM_WAKTUNYA',
}

export type SimpananDendaType = {
  id: string;
  simpanan_id: string;
  simpanan: SimpananType;
  ketentuan_denda_simpanan: TypeDendaSimpananEnum;
  company_formula_id?: string | null;
  fix_nominal?: number | null;
  batas_keterlambatan_value?: number | null;
  batas_keterlambatan_satuan?: BatasKeterlambatanSatuanEnum | null;
  companyFormula: any | null;
};
