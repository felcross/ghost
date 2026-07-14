const MAX_MOBILE = 1;
const MAX_DESKTOP = 6;

interface ManagedVideo {
  id: string;
  el: HTMLVideoElement;
  inView: boolean;
}

const registry: ManagedVideo[] = [];
let isMobile = false;

if (typeof window !== "undefined") {
  const mql = window.matchMedia("(max-width: 768px)");
  isMobile = mql.matches;
  mql.addEventListener("change", (e) => {
    isMobile = e.matches;
    schedulePlayback();
  });
}

export function registerVideo(id: string, el: HTMLVideoElement) {
  registry.push({ id, el, inView: false });
}

export function unregisterVideo(id: string) {
  const idx = registry.findIndex((v) => v.id === id);
  if (idx !== -1) registry.splice(idx, 1);
}

export function setInView(id: string, visible: boolean) {
  const v = registry.find((v) => v.id === id);
  if (v) v.inView = visible;
  schedulePlayback();
}

function schedulePlayback() {
  const max = isMobile ? MAX_MOBILE : MAX_DESKTOP;
  const visible = registry.filter((v) => v.inView);
  const playing = registry.filter((v) => !v.el.paused);

  // If within limit, play all visible
  if (visible.length <= max) {
    visible.forEach((v) => {
      if (v.el.paused && v.el.src) v.el.play().catch(() => {});
    });
    return;
  }

  // Over limit: play first N visible, pause the rest
  visible.forEach((v, i) => {
    if (i < max) {
      if (v.el.paused && v.el.src) v.el.play().catch(() => {});
    } else {
      if (!v.el.paused) v.el.pause();
    }
  });

  // Pause any currently playing that are no longer visible
  playing.forEach((v) => {
    if (!v.inView && !v.el.paused) v.el.pause();
  });
}
