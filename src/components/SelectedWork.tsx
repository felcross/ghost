"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";
import { portfolioImages, portfolioClients } from "@/config/images";

interface Project {
  id: number;
  title: string;
  client: string;
  image: string;
}

export default function SelectedWork() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, tArray } = useTranslation();
  const projectTitles = tArray("selectedWork.projects") as string[];

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const projects: Project[] = projectTitles.map((title, i) => ({
    id: i + 1,
    title,
    client: portfolioClients[i] || "",
    image: portfolioImages[i] || "",
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left + 20,
      y: e.clientY - rect.top - 100,
    });
  };

  const handleTap = (project: Project) => {
    setActiveProject((prev) => (prev?.id === project.id ? null : project));
  };

  return (
    <section id="work" className="py-20 lg:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            {t("selectedWork.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-text-on-light">
            {t("selectedWork.title")}
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
        >
          {projects.map((project, index) => (
            <div key={project.id}>
              <div
                className="work-item border-b border-border-light py-6 lg:py-8"
                onMouseEnter={() => !isTouchDevice && setHoveredProject(project)}
                onMouseLeave={() => !isTouchDevice && setHoveredProject(null)}
                onClick={() => handleTap(project)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-text-on-light-subtle text-sm font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:var(--font-inter)] text-2xl lg:text-3xl font-black tracking-tight text-text-on-light">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-text-on-light-faint text-sm tracking-widest uppercase">
                    {project.client}
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {activeProject?.id === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="md:hidden overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-48 object-cover rounded-lg mt-2 mb-4"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {!isTouchDevice && (
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none fixed z-50 w-64 h-40 lg:w-80 lg:h-48 overflow-hidden shadow-2xl"
                  style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                  }}
                >
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
