import { create } from 'zustand';

interface AppState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  newsletterEmail: string;
  adminPanel: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setNewsletterEmail: (email: string) => void;
  setAdminPanel: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  searchQuery: '',
  newsletterEmail: '',
  adminPanel: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setNewsletterEmail: (email) => set({ newsletterEmail: email }),
  setAdminPanel: (open) => set({ adminPanel: open }),
}));
