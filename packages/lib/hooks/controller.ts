import type { Animations } from './types';
export function play(animations: Animations, cb?: (...args: any[]) => void) {
  if (animations.every(Boolean)) {
    animations.forEach((animation) => {
      animation!.playbackRate = 1;
      animation!.play();
    });
    allFinish(animations, 'play', cb);
  }
}

export function allFinish(animations: Animations, trigger: 'play' | 'reverse', cb?: (...args: any[]) => void) {
  if (animations.every(Boolean)) {
    Promise.all(animations.map((animation) => animation!.finished))
      .then(() => {
        cb?.(trigger);
      })
      .catch((error) => {
        // TODO maybe there are some other kinds of errors
        console.warn('[animations maybe aborted]', error);
      });
  }
}

export function pause(animations: Animations) {
  animations.forEach((animation) => {
    if (animation) {
      animation.pause();
    }
  });
}

export function cancel(animations: Animations) {
  animations.forEach((animation) => animation?.cancel());
}

export function reverse(animations: Animations, cb?: (...args: any[]) => void) {
  if (animations.every(Boolean)) {
    animations.forEach((animation) => {
      animation!.playbackRate = -1;
      animation!.play();
    });
    allFinish(animations, 'reverse', cb);
  }
}

export const resume = (animations: Animations) => {
  animations.forEach((animation) => {
    if (animation) {
      animation.play();
    }
  });
};
