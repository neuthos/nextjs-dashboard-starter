import { create } from 'zustand';

interface ThemeState {
  isDarkTheme: boolean;
  setIsDarkTheme: (val: boolean) => void;
}

const useThemeStore = create<ThemeState>()((set) => ({
  isDarkTheme: false,
  setIsDarkTheme: (val) => set(() => ({ isDarkTheme: val })),
}));

export default useThemeStore;
