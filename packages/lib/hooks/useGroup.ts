/**
 * @description advanced use. manage a group of elements using the same animation parameters
 */
import { useRef, useEffect, useCallback } from 'react';
import * as controller from './controller';
import { combineOptions } from './utils';
import type { AnimateController, DOMElement, Keyframes, SpecialAnimationOptions } from './types';

interface useGroupProps<T> {
  selectors?: string[];
  refs?: React.MutableRefObject<T | null>[];
  keyframes: Keyframes;
  options?: SpecialAnimationOptions;
  onComplete?: (trigger?: 'play' | 'reverse') => void;
  onStart?: () => void;
  onPause?: () => void;
  onCancel?: () => void;
  onResume?: () => void;
}

export function useGroup<T extends DOMElement>(props: useGroupProps<T>, deps: any[]): AnimateController {
  const { selectors = [], refs, keyframes, options = 0, onComplete, onStart, onPause, onCancel, onResume } = props;
  const animations = useRef<(Animation | undefined)[]>([]);
  const targets = useRef<T[]>();

  const getTargets = useCallback(() => {
    if (refs) {
      return refs.map((ref) => ref.current as T);
    }
    if (Array.isArray(selectors)) {
      const list: T[] = [];
      selectors.forEach((selector) => {
        list.push(...document.querySelectorAll<T>(selector));
      });
      return list;
    }
  }, [refs, selectors]);

  useEffect(() => {
    targets.current = getTargets();
    if (!targets.current) {
      throw new Error('useGroup: selectors or refs is required');
    }
    animations.current = targets.current!.map((el, index, arr) => {
      const animation = el.animate(keyframes, combineOptions(options, el, index, arr.length));
      animation.cancel();
      return animation;
    });

    return () => clear();
  }, deps);

  const clear = () => {
    targets.current?.forEach((el) => {
      el?.getAnimations().forEach((animation) => animation.cancel());
    });
  };

  const play = useCallback(() => {
    clear();
    onStart?.();
    controller.play(animations.current, onComplete);
  }, [onStart]);

  const pause = useCallback(() => {
    onPause?.();
    controller.pause(animations.current);
  }, []);

  const cancel = useCallback(() => {
    onCancel?.();
    controller.cancel(animations.current);
  }, [onCancel]);

  const reverse = useCallback(() => {
    controller.reverse(animations.current, onComplete);
  }, []);

  const resume = useCallback(() => {
    onResume?.();
    controller.resume(animations.current);
  }, [onResume]);

  return { play, pause, cancel, reverse, resume };
}
