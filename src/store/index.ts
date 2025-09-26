import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  isLoading: boolean;
}

interface UIStore extends UIState {
  setTheme: (theme: UIState['theme']) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'system',
        sidebarOpen: true,
        isLoading: false,

        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
        setLoading: (loading) => set({ isLoading: loading }),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ theme: state.theme }),
      }
    )
  )
);
