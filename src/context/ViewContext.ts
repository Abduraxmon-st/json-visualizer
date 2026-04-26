"use client";

import { create } from "zustand";

export type WorkspaceView = "visualize" | "typescript";

interface ViewState {
  activeView: WorkspaceView;
  setActiveView: (activeView: WorkspaceView) => void;
}

export const useWorkspaceView = create<ViewState>((set) => ({
  activeView: "visualize",
  setActiveView: (activeView) => set({ activeView }),
}));
