import { create } from "zustand";

// 1. Define what your store looks like
interface AppState {
  username: string;
  notes: string[];

  // Actions to change the data
  updateUsername: (name: string) => void;
  addNote: (note: string) => void;
  clearNotes: () => void;
}

// 2. Create the hook
export const useAppStore = create<AppState>((set) => ({
  // Initial state values
  username: "Gaurav",
  notes: [],

  // Functions to update state (mutations)
  updateUsername: (name) => set({ username: name }),

  addNote: (newNote) =>
    set((state) => ({
      notes: [...state.notes, newNote],
    })),

  clearNotes: () => set({ notes: [] }),
}));
