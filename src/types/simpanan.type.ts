import dayjs from 'dayjs';

import { formatRupiah } from '@/functions/numbers';

import type { SimpananType } from './simpanan/simpanan.type';

interface User {
  uid: string;
  identity: string;
  address: string;
  user_id: string;
  name: string;
}

export const WaktuSetoranCategoryLabel = {
  RELATIVE_DATE: 'Periodik',
  SPESIFIK_DATE: 'Berkala',
  SETOR_DI_AWAL: 'Sekali di awal',
  KAPAN_SAJA: 'Kapan saja',
};

export enum PenarikanTypeEnum {
  'KAPANPUN' = 'KAPANPUN',
  'SELESAI_KEANGGOTAAN' = 'SELESAI_KEANGGOTAAN',
  'SELESAI_PERIODE_SIMPANAN' = 'SELESAI_PERIODE_SIMPANAN',
}

export const PenarikanTypeLabel = {
  KAPANPUN: {
    label: 'Kapanpun',
  },
  SELESAI_KEANGGOTAAN: {
    label: 'Selesai keanggotaan',
  },
  SELESAI_PERIODE_SIMPANAN: null,
};

interface WaktuSetoranValueMapperResult {
  jatuhTempo: string | undefined;
  tanggalBerakhir: string | undefined;
}
export const waktuSetoranValueMapper = (
  waktuSetoranValue: string
): WaktuSetoranValueMapperResult => {
  const result: WaktuSetoranValueMapperResult = {
    jatuhTempo: '',
    tanggalBerakhir: '',
  };

  if (waktuSetoranValue) {
    const splitWaktuSetoranVal: string[] = waktuSetoranValue.split('_');
    const isBerjangka = splitWaktuSetoranVal.length === 2;
    const isPeriodt = splitWaktuSetoranVal.length === 3;
    const isHarian = splitWaktuSetoranVal.length === 1;

    if (isHarian) {
      result.jatuhTempo = 'Hari ini, pukul 23.59';
    } else if (isBerjangka) {
      const today = dayjs();
      const tanggalJatuhTempo = splitWaktuSetoranVal[1]
        ? +splitWaktuSetoranVal[1]
        : 0;

      today.set('date', tanggalJatuhTempo);

      result.jatuhTempo = today.format('YYYY/MM/DD');
    } else if (isPeriodt) {
      const today = dayjs();
      const tanggalJatuhTempo = splitWaktuSetoranVal[2]
        ? +splitWaktuSetoranVal[2]
        : 0;
      const tanggalBerakhir = splitWaktuSetoranVal[0]?.split('-')[1];

      today.set('date', tanggalJatuhTempo);

      result.jatuhTempo = today.format('YYYY/MM/DD');
      result.tanggalBerakhir = tanggalBerakhir;
    }
  }

  return result;
};

export const jangkaWaktuTerbayarMapper = (
  trxs: TransactionDto[]
): {
  totalAngsuranTerbayar: number;
  totalAngsuran: number;
  totalAngsuranBelumBayar: number;
  totalBungaValue: number;
  totalSetoran: number;
} => {
  let totalAngsuranTerbayar = 0;
  let totalAngsuran = 0;
  let totalAngsuranBelumBayar = 0;
  let totalBungaValue = 0;
  let totalSetoran = 0;

  for (let i = 0; i < trxs.length; i += 1) {
    const trx = trxs[i];
    if (trx?.jenis_transaksi === 'SETORAN') {
      if (trx.status === 1) {
        totalAngsuranTerbayar += 1;
        totalSetoran += +trx.nominal;
      } else if (trx.status === 0 || trx.status === 2) {
        totalAngsuranBelumBayar += 1;
      }

      totalAngsuran += 1;
    } else if (trx?.jenis_transaksi === 'BUNGA') {
      if (trx.status === 1) {
        totalBungaValue += +trx.nominal;
      }
    }
  }

  return {
    totalAngsuranTerbayar,
    totalAngsuran,
    totalAngsuranBelumBayar,
    totalBungaValue,
    totalSetoran,
  };
};

export interface SimpananDto {
  id: string;
  company_id: string;
  code: string;
  jenis_simpanan: string;
  name: string;
  description: string | null;
  status: number;
  waktu_setoran_category:
    | 'RELATIVE_DATE'
    | 'SPESIFIK_DATE'
    | 'SETOR_DI_AWAL'
    | 'KAPAN_SAJA';
  waktu_setoran_value: string;
  setoran_jenis_perhitungan: 'FIX' | 'PERCENTAGE_PENGHASILAN';
  setoran_nominal_min: string;
  setoran_nominal: string;
  setoran_nominal_max: string;
  setoran_batas_tanggal: string | null;
  setoran_batas_jam: string | null;
  bunga_company_formula_id: string | null;
  bunga_tanggal_realisasi: string;
  bunga_satuan_realisasi: string | null;
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
  companyFormula: any | null; // Anda dapat menggantinya dengan tipe yang sesuai jika ada
}

export enum RekeningStatusEnum {
  'AKTIF' = 'AKTIF',
  'DI_TANGGUHKAN' = 'DI_TANGGUHKAN',
  'NON_AKTIF' = 'NON_AKTIF',
  'DITUTUP' = 'DITUTUP',
  'PERIODE_SELESAI' = 'PERIODE_SELESAI',
}

export enum StatusTransaksiRekening {
  'TERTUNDA' = 'TERTUNDA',
  'DIBAYAR' = 'DIBAYAR',
  'JATUHTEMPO' = 'JATUHTEMPO',
  'DIBATALKAN' = 'DIBATALKAN',
}

interface CompanyDto {
  id: string;
  code: string;
  name: string;
  business_name: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface RekeningDTO {
  id: string;
  no_rekening: string;
  saldo: string;
  tanggal_setoran_awal: string;
  status_transaksi: StatusTransaksiRekening;
  status: RekeningStatusEnum;
  created_at: string;
  updated_at: string | null;
  user: User;
  simpanan: SimpananDto;
  transactions: TransactionDto[];
  simpanan_jangka_waktu: any | null;
  company: CompanyDto;
}

export const RekeningStatusLabel = {
  AKTIF: {
    label: 'Aktif',
    color: '#007A08',
    tagColor: 'green',
    value: 'AKTIF',
  },
  DI_TANGGUHKAN: {
    label: 'Ditangguhkan',
    color: '#B70400',
    tagColor: 'volcano',
    value: 'DI_TANGGUHKAN',
  },
  NON_AKTIF: {
    label: 'Tidak aktif',
    color: '#242A30',
    value: 'NON_AKTIF',
    tagColor: '#242A30',
  },
  DITUTUP: {
    label: 'Ditutup',
    color: '#000000',
    value: 'DITUTUP',
    tagColor: 'black',
  },
  PERIODE_SELESAI: {
    label: 'Periode selesai',
    color: '#BABDBF',
    value: 'PERIODE_SELESAI',
    tagColor: 'gray',
  },
};

export const RekeningStatusTransaksi = {
  TERTUNDA: {
    label: 'Tertunda',
    tagColor: 'purple',
  },
  DIBAYAR: {
    label: 'Dibayar',
    tagColor: 'success',
  },
  JATUHTEMPO: {
    label: 'Lewat jatuh tempo',
    tagColor: 'processing',
  },
  DIBATALKAN: {
    label: 'Dibatalkan',
    tagColor: 'black',
  },
};

export const TransaksiStatusLabel: any = {
  0: {
    label: 'Tertunda',
    tagColor: 'purple',
  },
  1: {
    label: 'Dibayar',
    tagColor: 'green',
  },
  2: {
    label: 'Lewat jatuh tempo',
    tagColor: 'volcano',
  },
  3: {
    label: 'Dibatalkan',
    tagColor: 'black',
  },
};

export interface TransactionDto {
  id: string;
  no_ref: string;
  simpanan_user_id: string;
  jenis_transaksi: string;
  nominal: string;
  status: number;
  notes: string;
  created_at: string;
  updated_at: string | null;
  simpanan_user: RekeningDTO;
  admin: User;
  kolektor?: User | null;
}

export const setoranMinMaxFlag: any = {
  SIMPANAN_POKOK: false,
  SIMPANAN_WAJIB: false,
  SIMPANAN_BERJANGKA: false,
  SIMPANAN_SUKARELA: true,
  SIMPANAN_DEPOSITO: false,
};

export const showNilaiSetoranLabel = (simpanan: SimpananType) => {
  if (simpanan.setoran_jenis_perhitungan === 'FIX') {
    if (simpanan.jenis_simpanan !== 'SIMPANAN_SUKARELA') {
      return formatRupiah(+simpanan.setoran_nominal);
    }
    return formatRupiah(+simpanan.setoran_nominal_min);
  }
  return `${+simpanan.setoran_nominal}% dari penghasilan`;
};

export const showNilaiSetoranValue = (simpanan: SimpananType) => {
  if (simpanan.setoran_jenis_perhitungan === 'FIX') {
    if (simpanan.jenis_simpanan !== 'SIMPANAN_SUKARELA') {
      return +simpanan.setoran_nominal;
    }
    return +simpanan.setoran_nominal_min;
  }
  return +simpanan.setoran_nominal;
};

export const simulateKasarSaldoAndBungaJangkaWaktu = (
  nilaiSetor: number,
  jangkaWaktuPerBulan: number,
  bungaPerTahun: number
) => {
  const bungaPerBulan = bungaPerTahun / 12 / 100;

  let saldoAkhir = 0;
  let bungaDiterima = 0;

  for (let bulan = 1; bulan <= jangkaWaktuPerBulan; bulan += 1) {
    const bungaBulanan = saldoAkhir * bungaPerBulan;
    saldoAkhir += nilaiSetor;
    bungaDiterima += bungaBulanan;
  }

  saldoAkhir += bungaDiterima;
  return {
    saldoAkhir,
    bungaDiterima,
  };
};

export const isSetoranDebit = (transaction: TransactionDto) => {
  const jenisDebit = new Set(['SETORAN', 'DENDA']);

  if (jenisDebit.has(transaction.jenis_transaksi)) {
    return true;
  }
  return false;
};
