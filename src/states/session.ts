import { Session } from '@supabase/auth-helpers-react';
import { atom } from 'jotai';

export const sessionAtom = atom<Session | null>(null);

export const isPasswordResetAtom = atom<boolean>(false);

export const shouldAuthAtom = atom((get) => !get(sessionAtom) || get(isPasswordResetAtom));
