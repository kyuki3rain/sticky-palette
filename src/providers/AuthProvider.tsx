import { supabase } from '@/lib/initSupabase';
import { sessionAtom, isPasswordResetAtom } from '@/states/session';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

type Props = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
	const setSession = useSetAtom(sessionAtom);
	const setIsPasswordReset = useSetAtom(isPasswordResetAtom);
	const [loading, isLoading] = useState(true);

	useEffect(() => {
		isLoading(true);
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			isLoading(false);
		});

		supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'PASSWORD_RECOVERY') setIsPasswordReset(true);
			else setIsPasswordReset(false);
			setSession(session);
		});
	}, []);

	if (loading) return <></>;

	return <div>{children}</div>;
}
