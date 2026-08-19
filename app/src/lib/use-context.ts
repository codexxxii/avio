import { create } from "zustand";

type ContextProps = {
  createNoteModal: boolean;
  setCreateNoteModal: (createNoteModal: boolean) => void;
  viewNoteModal: boolean;
  setViewNoteModal: (viewNoteModal: boolean) => void;
  recipeOptionsModal: boolean;
  setRecipeOptionsModal: (recipeOptionsModal: boolean) => void;
};

export const useContext = create<ContextProps>((set) => ({
  createNoteModal: false,
  setCreateNoteModal: (createNoteModal) => set({ createNoteModal }),
  viewNoteModal: false,
  setViewNoteModal: (viewNoteModal) => set({ viewNoteModal }),
  recipeOptionsModal: false,
  setRecipeOptionsModal: (recipeOptionsModal) => set({ recipeOptionsModal }),
}));
