import { useRef } from 'react';
import { checkRef } from './utils';
import type { AnimationOptions } from './types';

const fadeKeyframes = [
  {
    opacity: 0
  },
  {
    opacity: 1
  }
];
// preset class
class MotionPreset {
  public defaultOptions: KeyframeAnimationOptions = {
    duration: 500,
    fill: 'none'
  };
  private _combineOPtions(options: AnimationOptions = {}) {
    if (typeof options === 'number') {
      return {
        ...this.defaultOptions,
        duration: options
      };
    }
    return {
      ...this.defaultOptions,
      ...options
    };
  }
  public fadeIn<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(fadeKeyframes, this._combineOPtions(options));
  }
  public fadeInDown<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [
        { opacity: 0, transform: 'translateY(-100%)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      this._combineOPtions(options)
    );
  }
  public fadeInUp<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [
        { opacity: 0, transform: 'translateY(100%)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      this._combineOPtions(options)
    );
  }

  public fadeInLeft<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [
        { opacity: 0, transform: 'translateX(-100%)' },
        { opacity: 1, transform: 'translateX(0)' }
      ],
      this._combineOPtions(options)
    );
  }
  public fadeInRight<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [
        { opacity: 0, transform: 'translateX(100%)' },
        { opacity: 1, transform: 'translateX(0)' }
      ],
      this._combineOPtions(options)
    );
  }
  public fadeOut<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    const opt = this._combineOPtions(options);
    return ref.current!.animate(fadeKeyframes, {
      ...opt,
      direction: 'reverse'
    });
  }

  public fadeOutDown<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(100%)' }
      ],
      this._combineOPtions(options)
    );
  }

  public fadeOutUp<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-100%)' }
      ],
      this._combineOPtions(options)
    );
  }
  public fadeOutLeft<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(-100%)' }
      ],
      this._combineOPtions(options)
    );
  }
  public fadeOutRight<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(100%)' }
      ],
      this._combineOPtions(options)
    );
  }

  public slideLeft<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }],
      this._combineOPtions(options)
    );
  }
  public slideRight<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }],
      this._combineOPtions(options)
    );
  }
  public slideUp<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }],
      this._combineOPtions(options)
    );
  }
  public slideDown<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }],
      this._combineOPtions(options)
    );
  }
  public zoomIn<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], this._combineOPtions(options));
  }
  public zoomOut<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate([{ transform: 'scale(1)' }, { transform: 'scale(0)' }], this._combineOPtions(options));
  }
  // special effects
  public flash<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      {
        opacity: [1, 0, 1, 0, 1],
        offset: [0, 0.25, 0.5, 0.75, 1]
      },
      this._combineOPtions(options)
    );
  }
  public pulse<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate({ transform: ['scale(1)', 'scale(1.1)', 'scale(1)'] }, this._combineOPtions(options));
  }

  public heartBeat<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      {
        transform: ['scale(1)', 'scale(1.2)', 'scale(1)', 'scale(1.2)', 'scale(1)'],
        offset: [0, 0.14, 0.28, 0.48, 0.8]
      },
      {
        ...this._combineOPtions(options),
        easing: 'ease-in-out'
      }
    );
  }
  public breath<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      {
        opacity: [1, 0.3, 1]
      },
      this._combineOPtions(options)
    );
  }
  public swing<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    ref.current!.style.cssText += 'transform-origin: top center;';
    return ref.current!.animate(
      {
        transform: ['rotate(0)', 'rotate(12deg)', 'rotate(-8deg)', 'rotate(5deg)', 'rotate(-5deg)', 'rotate(0)'],
        offset: [0, 0.2, 0.4, 0.6, 0.8]
      },
      this._combineOPtions(options)
    );
  }

  public shakeX<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      {
        transform: [
          'translateX(0)',
          'translateX(-10px)',
          'translateX(10px)',
          'translateX(-10px)',
          'translateX(10px)',
          'translateX(-10px)',
          'translateX(10px)',
          'translateX(-10px)',
          'translateX(10px)',
          'translateX(-10px)',
          'translateX(0)'
        ],
        offset: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      },
      this._combineOPtions(options)
    );
  }
  public shakeY<T extends HTMLElement>(ref: React.RefObject<T>, options?: AnimationOptions) {
    return ref.current!.animate(
      {
        transform: [
          'translateY(0)',
          'translateY(-8px)',
          'translateY(8px)',
          'translateY(-8px)',
          'translateY(8px)',
          'translateY(-8px)',
          'translateY(8px)',
          'translateY(-8px)',
          'translateY(8px)',
          'translateY(-8px)',
          'translateY(0)'
        ],
        offset: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      },
      this._combineOPtions(options)
    );
  }
}

type MethodNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

export type MotionName = keyof MethodNames<MotionPreset>;
const allMethodNames = Object.getOwnPropertyNames(MotionPreset.prototype);

export const presetMotionNames = allMethodNames.filter((key) => {
  const descriptor = Object.getOwnPropertyDescriptor(MotionPreset.prototype, key);
  return typeof descriptor?.value === 'function' && key !== 'constructor' && !key.startsWith('_');
}) as MotionName[];

// hooks
const animationPreset = new MotionPreset();
export function useMotion<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  function motion(name: MotionName, options?: AnimationOptions): Animation {
    checkRef(ref);
    return animationPreset[name](ref, options);
  }

  return {
    ref,
    motion
  };
}
