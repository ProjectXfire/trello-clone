import { create } from 'zustand';

type TDialogState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  component: React.ReactNode;
  setComponent: (component: React.ReactNode) => void;
};

export const useDialog = create<TDialogState>((set, get) => ({
  isOpen: false,
  component: <></>,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setComponent: (component) => set({ component })
}));
