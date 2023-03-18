import { Session } from '@supabase/auth-helpers-react';
import { atom } from 'jotai';

export const sessionAtom = atom<Session | null>(null);
