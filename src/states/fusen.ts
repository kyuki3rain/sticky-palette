import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { FusenView } from '../types/fusen';

const fusensAtom = atomFamily((id: string) => atom<FusenView | null>(null));

export const getFusenAtom = atomFamily((id: string) => atom((get) => get(fusensAtom(id))));

const fusenIdsAtom = atom<Set<string>>(new Set([]));

export const getFusenIdsAtom = atom<string[]>((get) => [...get(fusenIdsAtom)]);

export const setFusenAtom = atom(null, (get, set, fusen: FusenView) => {
	set(fusensAtom(fusen.id), fusen);
	set(fusenIdsAtom, (prev) => new Set(prev.add(fusen.id)));
});

export const setFusensAtom = atom(null, (get, set, fusens: FusenView[]) => {
	const ids = fusens.map((fusen) => {
		set(fusensAtom(fusen.id), fusen);
		return fusen.id;
	});
	set(fusenIdsAtom, (prev) => new Set([...prev, ...ids]));
});

export const resetFusenAtom = atom(null, (get, set) => {
	for (const id of get(fusenIdsAtom)) {
		set(fusensAtom(id), null);
		fusensAtom.remove(id);
	}
	set(fusenIdsAtom, new Set([]));
});
