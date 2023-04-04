import { create } from "zustand";

export const useCountriesStore = create((set) => ({
  countries: [],
  setCountries: (data) => set({ countries: data }),
}));
