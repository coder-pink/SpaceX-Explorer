
import { create } from 'zustand';

type SortBy = 'name' | 'date' | 'success';
type SortOrder = 'asc' | 'desc';

interface AppStore {
  search: string;
  currentPage: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
  setSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (order: SortOrder) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  search: '',
  currentPage: 1,
  sortBy: 'name',
  sortOrder: 'asc',
  setSearch: (value) => set({ search: value }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
}));
