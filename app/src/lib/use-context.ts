import { create } from "zustand";

type ContextProps = {
  createNoteModal: boolean;
  setCreateNoteModal: (createNoteModal: boolean) => void;
};

export const useContext = create<ContextProps>((set) => ({
  createNoteModal: false,
  setCreateNoteModal: (createNoteModal) => set({ createNoteModal }),
}));
