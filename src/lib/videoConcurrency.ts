interface ManagedVideo {
  id: string;
  el: HTMLVideoElement;
  inView: boolean;
  distance: number;
}

function getMaxConcurrent(): number {
  if (typeof window === "undefined") return 6;
  const isLowEnd =
    navigator.hardwareConcurrency <= 4 ||
    ["slow-2g", "2g", "3g"].includes(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).connection?.effectiveType ?? ""
    );
  return isLowEnd ? 1 : 2;
}

class VideoPlaybackPool {
  private registry: ManagedVideo[] = [];
  private max: number;
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.max = getMaxConcurrent();
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(max-width: 768px)");
      if (mql.matches) this.max = 1;
      mql.addEventListener("change", (e) => {
        this.max = e.matches ? 1 : getMaxConcurrent();
        this.schedule();
      });
    }
  }

  register(id: string, el: HTMLVideoElement) {
    this.registry.push({ id, el, inView: false, distance: Infinity });
  }

  unregister(id: string) {
    this.registry = this.registry.filter((v) => v.id !== id);
  }

  setInView(id: string, visible: boolean) {
    const v = this.registry.find((v) => v.id === id);
    if (v) v.inView = visible;
    this.schedule();
  }

  updateDistance(id: string, distance: number) {
    const v = this.registry.find((v) => v.id === id);
    if (v) v.distance = distance;
  }

  private schedule() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }

    const visible = this.registry
      .filter((v) => v.inView && v.el.src)
      .sort((a, b) => a.distance - b.distance);

    const playing = this.registry.filter((v) => !v.el.paused);

    // Play visible videos within limit
    visible.forEach((v, i) => {
      if (i < this.max) {
        if (v.el.paused) this.playWithRetry(v);
      } else {
        if (!v.el.paused) v.el.pause();
      }
    });

    // Pause videos no longer visible
    playing.forEach((v) => {
      if (!v.inView && !v.el.paused) v.el.pause();
    });
  }

  private playWithRetry(video: ManagedVideo) {
    video.el
      .play()
      .catch(() => {
        // Retry once after 500ms
        this.retryTimeout = setTimeout(() => {
          if (video.el.paused && video.inView && video.el.src) {
            video.el.play().catch(() => {});
          }
        }, 500);
      });
  }
}

export const pool = new VideoPlaybackPool();
