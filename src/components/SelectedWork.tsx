"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  client: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Campanha Verão",
    client: "Renner",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: 2,
    title: "Lançamento Collection",
    client: "Filá",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    id: 3,
    title: "Fashion Week SP",
    client: "Vogue",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    id: 4,
    title: "Festival de Inverno",
    client: "Chili Beans",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
  },
  {
    id: 5,
    title: "Showroom Prime",
    client: "Ashua",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  },
  {
    id: 6,
    title: "Campanha Black",
    client: "Avatim",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
  },
];

export default function SelectedWork() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

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
    <section id="work" className="py-20 lg:py-32 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="mb-16">
          <p className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4">
            ● Selected Work
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
            PROJETOS
          </h2>
        </div>

        {/* Projects List */}
        <div
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
        >
          {projects.map((project, index) => (
            <div key={project.id}>
              <div
                className="work-item border-b border-[#111111]/10 py-6 lg:py-8"
                onMouseEnter={() => !isTouchDevice && setHoveredProject(project)}
                onMouseLeave={() => !isTouchDevice && setHoveredProject(null)}
                onClick={() => handleTap(project)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[#111111]/30 text-sm font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:var(--font-inter)] text-2xl lg:text-3xl font-black tracking-tight text-[#111111]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-[#111111]/40 text-sm tracking-widest uppercase">
                    {project.client}
                  </span>
                </div>
              </div>

              {/* Mobile inline image (hidden on desktop) */}
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
                      className="w-full h-48 object-cover rounded-lg mt-2 mb-4"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Desktop hover image (hidden on touch) */}
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
