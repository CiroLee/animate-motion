import type { ApiTableRow } from '@/components/ApiTable';
export const animationControllerCode = `// used for useGroup, useMultiple, useLineDraw hooks
interface AnimateController {
  play: () => void;
  pause: () => void;
  cancel: () => void;
  reverse: () => void;
  resume: () => void;
}
// used for useValue and useSpring hooks
interface ValueController extends Omit<AnimateController, 'reverse'> {
  isPlaying: boolean;
  isPaused: boolean;
}
`;

export const valueControllerCode = ``;

export const controllerRows: ApiTableRow[] = [
  {
    name: 'play',
    type: '() => void',
    desc: 'play the animation'
  },
  {
    name: 'pause',
    type: '() => void',
    desc: 'pause the animation'
  },
  {
    name: 'cancel',
    type: '() => void',
    desc: 'cancel the animation'
  },
  {
    name: 'reverse',
    type: '() => void',
    desc: 'reverse the animation'
  },
  {
    name: 'resume',
    type: '() => void',
    desc: 'resume the animation'
  }
];
