const MAX_ACTIVE = 2;
const queue: Array<() => void> = [];
let activeCount = 0;

export function requestSpriteSlot(onSlot: () => void) {
  if (activeCount < MAX_ACTIVE) {
    activeCount++;
    onSlot();
  } else {
    queue.push(onSlot);
  }
}

export function releaseSpriteSlot() {
  if (queue.length > 0) {
    const next = queue.shift()!;
    next();
  } else {
    activeCount--;
  }
}
