import { setTransformRefAtom } from '@/states/transformRef';
import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

export function useTransformRef() {
	const ref = useRef<ReactZoomPanPinchRef | null>(null);
	const setTransformRef = useSetAtom(setTransformRefAtom);

	useEffect(() => {
		setTransformRef(ref);
	}, []);

	return { ref };
}
