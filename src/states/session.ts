import { Session } from '@supabase/auth-helpers-react';
import { atom } from 'jotai';

const sessionAtom = atom<Session | null>(null);
const isPasswordResetAtom = atom<boolean>(false);

export const setSessionAtom = atom(null, (get, set, session: Session | null) =>
	set(sessionAtom, session),
);
export const setIsPasswordResetAtom = atom(null, (get, set, isPasswordReset: boolean) =>
	set(isPasswordResetAtom, isPasswordReset),
);

export const shouldAuthAtom = atom((get) => !get(sessionAtom) || get(isPasswordResetAtom));
export const userAtom = atom((get) => get(sessionAtom)?.user ?? null);
export const getIsPasswordResetAtom = atom((get) => get(isPasswordResetAtom));
