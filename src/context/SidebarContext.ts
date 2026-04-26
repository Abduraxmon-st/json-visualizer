"use client";

import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  closeSidebar: () => void;
  openSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  closeSidebar: () => set({ isOpen: false }),
  openSidebar: () => set({ isOpen: true }),
  setSidebarOpen: (isOpen) => set({ isOpen }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
