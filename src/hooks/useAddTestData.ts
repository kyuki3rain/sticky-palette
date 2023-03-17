import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { resetFusenAtom, setFusenAtom } from '../states/fusen';

const testFusen = [
	{ id: 'test1', title: 'test1', content: 'test1', position: { x: 0, y: 0 } },
	{ id: 'test2', title: 'test2', content: 'test2', position: { x: 300, y: 0 } },
	{ id: 'test3', title: 'test3', content: 'test3', position: { x: 0, y: 300 } },
	{ id: 'test4', title: 'test4', content: 'test4', position: { x: 300, y: 300 } },
];

export const useAddTestData = () => {
	const setFusen = useSetAtom(setFusenAtom);
	const resetFusen = useSetAtom(resetFusenAtom);

	useEffect(() => {
		testFusen.map((fusen) => setFusen(fusen));
		return () => resetFusen();
	}, []);
};
