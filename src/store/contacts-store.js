import { create } from "zustand";

export const useContactsStore = create((set) => ({
  contacts: [],
  setContacts: (data) => set({ contacts: data }),
}));
