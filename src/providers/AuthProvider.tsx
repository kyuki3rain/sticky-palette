import Loading from '@/components/Loading';
import { supabase } from '@/lib/initSupabase';
import { setSessionAtom, setIsPasswordResetAtom } from '@/states/session';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

type Props = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
	const setSession = useSetAtom(setSessionAtom);
	const setIsPasswordReset = useSetAtom(setIsPasswordResetAtom);
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

	if (loading) return <Loading />;

	return <div>{children}</div>;
}
