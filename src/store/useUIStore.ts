import { create } from 'zustand';
import { Quiz, Assignment } from '../types';

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface UIState {
  theme: 'dark' | 'light';
  toast: ToastMessage | null;
  activeQuiz: Quiz | null;
  activeAssignment: Assignment | null;
  activeShareCardModal: boolean;
  isSearchOpen: boolean;
  
  // Actions
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  hideToast: () => void;
  setActiveQuiz: (quiz: Quiz | null) => void;
  setActiveAssignment: (assignment: Assignment | null) => void;
  setActiveShareCardModal: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  toast: null,
  activeQuiz: null,
  activeAssignment: null,
  activeShareCardModal: false,

  setTheme: (theme) => {
    set({ theme });
    document.documentElement.classList.add('dark');
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.add('dark');
      return { theme: nextTheme };
    });
  },

  showToast: (title, message, type = 'info') => {
    const id = Date.now().toString();
    set({ toast: { id, title, message, type } });
    
    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      set((state) => {
        if (state.toast?.id === id) {
          return { toast: null };
        }
        return {};
      });
    }, 4500);
  },

  hideToast: () => set({ toast: null }),
  setActiveQuiz: (activeQuiz) => set({ activeQuiz }),
  setActiveAssignment: (activeAssignment) => set({ activeAssignment }),
  setActiveShareCardModal: (activeShareCardModal) => set({ activeShareCardModal }),
  isSearchOpen: false,
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
}));
