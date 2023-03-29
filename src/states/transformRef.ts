import { atom } from 'jotai';
import { MutableRefObject } from 'react';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { windowSizeAtom } from './windowSize';

const transformRefAtom = atom<MutableRefObject<ReactZoomPanPinchRef | null> | null>(null);

export const setTransformRefAtom = atom(
	null,
	(get, set, state: MutableRefObject<ReactZoomPanPinchRef | null>) => set(transformRefAtom, state),
);

export const getTransformRefAtom = atom((get) => get(transformRefAtom));

export const getScaleFnAtom = atom((get) => () => get(transformRefAtom)?.current?.state.scale);
export const getCenterPositionFnAtom = atom((get) => () => {
	const state = get(transformRefAtom)?.current?.instance.transformState;
	if (!state) return { x: 0, y: 0 };

	const size = get(windowSizeAtom);
	return {
		x: (-state.positionX + size.width / 2) / state.scale,
		y: (-state.positionY + size.height / 2) / state.scale,
	};
});
