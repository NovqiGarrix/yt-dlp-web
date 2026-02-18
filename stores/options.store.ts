import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Format = "mp3" | "mp4" | "wav";

interface OptionsStoreState {
  format: Format;
}

interface OptionsStoreActions {
  setFormat: (format: Format) => void;
}

interface OptionsStore extends OptionsStoreState, OptionsStoreActions {}

const initialState: OptionsStoreState = {
  format: "mp3",
};

export const useOptionsStore = create<OptionsStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setFormat: (format: Format) => set({ format }),
      }),
      { name: "options-store" },
    ),
    { name: "options-store-devtools" },
  ),
);
