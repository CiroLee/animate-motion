import { useRef } from 'react';
import type { AnimationOptions } from './types';
import { checkRef } from './utils';
export function useAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  function animate(keyframes: Keyframe[], options?: AnimationOptions): Animation {
    checkRef(ref);
    return ref.current!.animate(keyframes, options);
  }

  return {
    ref,
    animate
  };
}
