import { create } from 'zustand';

// ==============================
// ==============================
interface SimpananState {
  openPinModal: boolean;
  callbackPin: Function | null;
  closePinMiddleware: () => void;
  openPinMiddleware: (callbackPin: Function) => any;
}
// ==============================
// ==============================

const useSimpananStore = create<SimpananState>()((set) => ({
  openPinModal: false,

  callbackPin: null,
  openPinMiddleware: (callbackPin) =>
    set((state) => {
      return {
        ...state,
        openPinModal: true,
        callbackPin,
      };
    }),

  closePinMiddleware: () =>
    set(() => ({ openPinModal: false, callbackPin: null })),
}));

export default useSimpananStore;
