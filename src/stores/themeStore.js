import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: false,
      toggleTheme: () => set({ isDark: !get().isDark }),
      setTheme: (isDark) => set({ isDark }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useThemeStore;
