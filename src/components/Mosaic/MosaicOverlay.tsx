"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types/project";
import { MosaicGrid } from "./MosaicGrid";
import { BackToGhostBox } from "./BackToGhostBox";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MosaicOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export function MosaicOverlay({ project, onClose }: MosaicOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Body scroll lock + background inert
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.setAttribute("aria-hidden", "true");
        mainContent.setAttribute("inert", "");
      }
    } else {
      document.body.style.overflow = "";
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.removeAttribute("aria-hidden");
        mainContent.removeAttribute("inert");
      }
    }
    return () => {
      document.body.style.overflow = "";
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.removeAttribute("aria-hidden");
        mainContent.removeAttribute("inert");
      }
    };
  }, [project]);

  // Focus management: save previous, focus overlay, restore on close
  useEffect(() => {
    if (project) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the overlay itself after a tick (Framer Motion needs to mount)
      const timer = setTimeout(() => {
        overlayRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [project]);

  // Keyboard: Escape + focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project) {
        onClose();
        return;
      }
      if (e.key === "Tab" && project && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          key="mosaic-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Project gallery: ${project.brand}`}
          tabIndex={-1}
          className="fixed inset-0 z-40 bg-dark-bg/95 flex items-center justify-center outline-none"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="w-full h-full overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={tileVariants}>
              <MosaicGrid images={project.gallery} />
            </motion.div>
          </motion.div>

          <BackToGhostBox onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
