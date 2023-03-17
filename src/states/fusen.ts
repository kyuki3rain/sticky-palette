import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { FusenView } from '../types/fusen';

const fusensAtom = atomFamily((id: string) =>
	atom<FusenView>({ id, title: '', content: '', position: { x: 0, y: 0 } }),
);

export const getFusenAtom = atomFamily((id: string) => atom((get) => get(fusensAtom(id))));

const fusenIdsAtom = atom<string[]>([]);

export const getFusenIdsAtom = atom<string[]>((get) => get(fusenIdsAtom));

export const setFusenAtom = atom(null, (get, set, fusen: FusenView) => {
	set(fusensAtom(fusen.id), fusen);
	set(fusenIdsAtom, (ids) => [...ids, fusen.id]);
});

export const resetFusenAtom = atom(null, (get, set) => {
	get(fusenIdsAtom).map((id) => fusensAtom.remove(id));
	set(fusenIdsAtom, []);
});
