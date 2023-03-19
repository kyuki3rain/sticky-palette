import { createFusen } from '@/types/fusen';
import { renderHook, act } from '@testing-library/react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
	getFusenAtom,
	getFusenIdsAtom,
	resetFusenAtom,
	setFusenAtom,
	setFusensAtom,
} from './fusen';

describe('fusen test', () => {
	const { result: setFusen } = renderHook(() => useSetAtom(setFusenAtom));
	const { result: setFusens } = renderHook(() => useSetAtom(setFusensAtom));
	const { result: resetFusen } = renderHook(() => useSetAtom(resetFusenAtom));

	const test1 = createFusen({ id: 'test1', title: 'test1', content: 'test1', x: 0, y: 0 });
	const test2 = createFusen({ id: 'test2', title: 'test2', content: 'test2', x: 0, y: 0 });
	const test3 = createFusen({ id: test1.id, title: 'test3', content: 'test3', x: 0, y: 0 });

	const getFusenIds = () => renderHook(() => useAtomValue(getFusenIdsAtom)).result;
	const getFusen = (id: string) => renderHook(() => useAtomValue(getFusenAtom(id))).result;

	test('セットしていない付箋はnull', () => {
		expect(getFusenIds().current).toStrictEqual([]);
		expect(getFusen(test1.id).current).toBe(null);
		expect(getFusen(test2.id).current).toBe(null);
	});

	test('付箋をセットできる', () => {
		act(() => {
			setFusen.current(test1);
		});

		expect(getFusenIds().current).toStrictEqual([test1.id]);
		expect(getFusen(test1.id).current).toBe(test1);
	});

	test('idの違う付箋をセットできる', () => {
		act(() => {
			setFusen.current(test2);
		});

		expect(getFusenIds().current).toStrictEqual([test1.id, test2.id]);
		expect(getFusen(test2.id).current).toBe(test2);
	});

	test('idが同じ付箋は更新される', () => {
		act(() => {
			setFusen.current(test3);
		});

		expect(getFusenIds().current).toStrictEqual([test1.id, test2.id]);
		expect(getFusen(test1.id).current).toBe(test3);
	});

	test('付箋をリセットできる', () => {
		act(() => {
			resetFusen.current();
		});

		expect(getFusenIds().current).toStrictEqual([]);
		expect(getFusen(test1.id).current).toBe(null);
		expect(getFusen(test2.id).current).toBe(null);
	});

	test('付箋をまとめてセットできる', () => {
		act(() => {
			setFusens.current([test1, test2]);
		});

		expect(getFusenIds().current).toStrictEqual([test1.id, test2.id]);
		expect(getFusen(test1.id).current).toBe(test1);
		expect(getFusen(test2.id).current).toBe(test2);
	});
});
