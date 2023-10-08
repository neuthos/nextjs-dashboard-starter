import { create } from 'zustand';

export type OpvarType = {
  id: string;
  code: string;
  name: string;
  value: string;
  type: string;
};

// ==============================
// ==============================
interface FormulaState {
  selectedOpVar: OpvarType[] | null;
  setSelectedOpVar: (val: OpvarType[] | null) => void;

  customInputCounter: number;
  setCustomInputCounter: (val: number) => void;
}
// ==============================
// ==============================

const useFormulaStore = create<FormulaState>()((set) => ({
  selectedOpVar: null,
  setSelectedOpVar: (val) => set(() => ({ selectedOpVar: val })),

  customInputCounter: 1,
  setCustomInputCounter: (val) => set(() => ({ customInputCounter: val })),
}));

export default useFormulaStore;
