"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HorizontalScrollProps {
  children: ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!wrapper || !pin || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: pin,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.kill();
      };
    });

    window.addEventListener("resize", () => ScrollTrigger.refresh());

    return () => {
      mm.revert();
      window.removeEventListener("resize", () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <>
      {/* Scroll wrapper — artificial height for scroll space */}
      <div ref={wrapperRef} className="scroll-wrapper">
        {/* Pin container — stays in viewport */}
        <div
          ref={pinRef}
          className="pin-container"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Horizontal track — slides left/right */}
          <div
            ref={trackRef}
            className="horizontal-track"
            style={{
              display: "flex",
              height: "100%",
              width: "max-content",
              willChange: "transform",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Mobile fallback — vertical stacking */}
      <style>{`
        @media (max-width: 768px) {
          .scroll-wrapper {
            height: auto !important;
          }
          .pin-container {
            position: relative !important;
            height: auto !important;
            overflow: visible !important;
          }
          .horizontal-track {
            flex-direction: column !important;
            width: 100% !important;
          }
          .horizontal-track > * {
            width: 100vw !important;
            min-height: 100vh;
          }
        }
      `}</style>
    </>
  );
}
