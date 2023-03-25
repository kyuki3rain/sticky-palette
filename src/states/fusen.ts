import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { Fusen } from '../types/fusen';

const fusensAtom = atomFamily((id: string) => atom<Fusen | null>(null));

export const getFusenAtom = atomFamily((id: string) => atom((get) => get(fusensAtom(id))));

const fusenIdsAtom = atom<Set<string>>(new Set([]));

export const getFusenIdsAtom = atom<string[]>((get) => [...get(fusenIdsAtom)]);

export const setFusenAtom = atom(null, (get, set, fusen: Fusen) => {
	set(fusensAtom(fusen.id), fusen);
	set(fusenIdsAtom, (prev) => new Set(prev.add(fusen.id)));
});

export const setFusensAtom = atom(null, (get, set, fusens: Fusen[]) => {
	const ids = fusens.map((fusen) => {
		set(fusensAtom(fusen.id), fusen);
		return fusen.id;
	});
	set(fusenIdsAtom, new Set(ids));
});

export const removeFusenAtom = atom(null, (get, set, id: string) => {
	set(fusensAtom(id), null);
	fusensAtom.remove(id);
	set(fusenIdsAtom, (prev) => {
		prev.delete(id);
		return new Set(prev);
	});
});

export const resetFusenAtom = atom(null, (get, set) => {
	for (const id of get(fusenIdsAtom)) {
		set(fusensAtom(id), null);
		fusensAtom.remove(id);
	}
	set(fusenIdsAtom, new Set([]));
});

export const orderFusenIdAtom = atom(null, (get, set, id: string) => {
	set(fusenIdsAtom, (prev) => {
		prev.delete(id);
		prev.add(id);
		return new Set(prev);
	});
});
