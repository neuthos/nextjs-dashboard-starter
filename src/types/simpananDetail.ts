interface BungaCompanyFormula {
  formula_id: string;
  category: string;
  name: string;
  formula: string;
}

interface JangkaWaktu {
  id: string;
  jangka_waktu: number;
  bunga_default_persentase: string;
  pajak_default_persentase: string;
}

interface DeskripsiTahapan {
  id: string;
  sort: number;
  value: string;
}

interface SimpananDenda {
  id: string;
  ketentuan_denda_simpanan: string;
  company_formula_id: number;
  fix_nominal: string;
  batas_keterlambatan_value: string;
  batas_keterlambatan_satuan: string;
  companyFormula: {
    id: number;
    formula_id: string;
    name: string;
    formula: string;
  };
}

export interface SimpananDataDetail {
  id: string;
  company_id: string;
  code: string;
  jenis_simpanan: string;
  name: string;
  description: string | null;
  waktu_setoran_category: string;
  waktu_setoran_value: string;
  setoran_jenis_perhitungan: string;
  setoran_nominal: string;
  setoran_nominal_min: string;
  setoran_nominal_max: string;
  setoran_batas_tanggal: string | null;
  setoran_batas_jam: string | null;
  bunga_company_formula_id: number;
  bunga_tanggal_realisasi: string;
  bunga_satuan_realisasi: string;
  bunga_default_persentase: number | null;
  pajak_default_persentase: number | null;
  penjamin_pinjaman: boolean;
  program_shu: boolean;
  penarikan_type: string;
  penarikan_maksimal: string;
  penarikan_maksimal_persentase: string;
  penarikan_minimal_hari: number;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
  bungaCompanyFormula: BungaCompanyFormula;
  jangka_waktu: JangkaWaktu[];
  tahapan: DeskripsiTahapan[];
  denda: SimpananDenda[];
}
