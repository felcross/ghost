"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Project } from "@/types/project";
import { MosaicOverlay } from "./MosaicOverlay";

interface MosaicContextValue {
  openProject: (project: Project) => void;
  closeProject: () => void;
  isVitrineOpen: boolean;
}

const MosaicContext = createContext<MosaicContextValue | null>(null);

export function useMosaic() {
  const ctx = useContext(MosaicContext);
  if (!ctx) throw new Error("useMosaic must be used within MosaicProvider");
  return ctx;
}

export function MosaicProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <MosaicContext.Provider value={{ openProject, closeProject, isVitrineOpen: activeProject !== null }}>
      {children}
      <MosaicOverlay project={activeProject} onClose={closeProject} />
    </MosaicContext.Provider>
  );
}
