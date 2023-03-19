import { Fusen } from '@/types/fusen';
import { atom } from 'jotai';

const modalAtom = atom(false);
export const isOpenModalAtom = atom((get) => get(modalAtom));

const modalParamsAtom = atom<Partial<Fusen>>({});
export const getModalParamsAtom = atom((get) => get(modalParamsAtom));

export const openModalAtom = atom(null, (get, set, fusen: Partial<Fusen>) => {
	set(modalParamsAtom, fusen);
	set(modalAtom, true);
});

export const closeModalAtom = atom(null, (get, set) => {
	set(modalAtom, false);
	set(modalParamsAtom, {});
});
