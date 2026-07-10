const MAX_MOBILE = 1;
const MAX_DESKTOP = 2;

interface ManagedVideo {
  el: HTMLVideoElement;
  id: string;
  intersectionRatio: number;
}

const registry: ManagedVideo[] = [];
let isMobile = false;

export function initVideoManager() {
  if (typeof window === "undefined") return;
  isMobile = window.matchMedia("(max-width: 768px)").matches;
}

export function registerVideo(id: string, el: HTMLVideoElement) {
  registry.push({ el, id, intersectionRatio: 0 });
}

export function unregisterVideo(id: string) {
  const idx = registry.findIndex((v) => v.id === id);
  if (idx !== -1) registry.splice(idx, 1);
}

export function updateIntersection(id: string, ratio: number) {
  const v = registry.find((v) => v.id === id);
  if (v) v.intersectionRatio = ratio;
  schedulePlayback();
}

function schedulePlayback() {
  const max = isMobile ? MAX_MOBILE : MAX_DESKTOP;
  const sorted = [...registry].sort(
    (a, b) => b.intersectionRatio - a.intersectionRatio
  );
  sorted.forEach((v, i) => {
    if (i < max && v.intersectionRatio > 0) {
      v.el.play().catch(() => {});
    } else {
      v.el.pause();
    }
  });
}
