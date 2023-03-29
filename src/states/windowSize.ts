import { atom } from 'jotai';
import { Size } from '@/types/size';

export const windowSizeAtom = atom<Size>({ width: 0, height: 0 });
