import { windowSizeAtom } from '@/states/windowSize';
import { useAtom } from 'jotai';
import { useLayoutEffect } from 'react';

export const useWindowSize = () => {
	const [size, setWindowSize] = useAtom(windowSizeAtom);
	useLayoutEffect(() => {
		const updateSize = (): void => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener('resize', updateSize);
		updateSize();

		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size;
};
