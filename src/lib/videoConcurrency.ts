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
  return isLowEnd ? 2 : 6;
}

const ROTATION_INTERVAL = 4000;

class VideoPlaybackPool {
  private registry: ManagedVideo[] = [];
  private max: number;
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;
  private rotationInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.max = getMaxConcurrent();
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(max-width: 768px)");
      if (mql.matches) this.max = 3;
      mql.addEventListener("change", (e) => {
        this.max = e.matches ? 3 : getMaxConcurrent();
        this.schedule();
      });
    }
  }

  register(id: string, el: HTMLVideoElement) {
    this.registry.push({ id, el, inView: false, distance: Infinity });
  }

  unregister(id: string) {
    this.registry = this.registry.filter((v) => v.id !== id);
    if (this.registry.length === 0) this.stopRotation();
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

    // Start rotation if more videos available than limit
    if (visible.length > this.max) {
      this.startRotation();
    } else {
      this.stopRotation();
    }
  }

  private startRotation() {
    this.stopRotation();
    this.rotationInterval = setInterval(() => {
      const visible = this.registry
        .filter((v) => v.inView && v.el.src)
        .sort((a, b) => a.distance - b.distance);

      if (visible.length <= this.max) return;

      // Get currently playing
      const currentlyPlaying = visible.filter((v) => !v.el.paused);
      const playingIds = new Set(currentlyPlaying.map((v) => v.id));

      // Pause all
      currentlyPlaying.forEach((v) => v.el.pause());

      // Pick next batch: rotate to videos that weren't playing
      const notPlaying = visible.filter((v) => !playingIds.has(v.id));
      const nextBatch = notPlaying.slice(0, this.max);

      // If not enough non-playing, fill from playing (shouldn't happen)
      if (nextBatch.length < this.max) {
        const remaining = visible
          .filter((v) => !nextBatch.includes(v))
          .slice(0, this.max - nextBatch.length);
        nextBatch.push(...remaining);
      }

      nextBatch.forEach((v) => this.playWithRetry(v));
    }, ROTATION_INTERVAL);
  }

  private stopRotation() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
      this.rotationInterval = null;
    }
  }

  private playWithRetry(video: ManagedVideo) {
    video.el
      .play()
      .catch(() => {
        this.retryTimeout = setTimeout(() => {
          if (video.el.paused && video.inView && video.el.src) {
            video.el.play().catch(() => {});
          }
        }, 500);
      });
  }
}

export const pool = new VideoPlaybackPool();
