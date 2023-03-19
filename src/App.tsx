import { useEffect } from 'react';
import Field from './components/Field';
import { supabase } from '@/lib/initSupabase';
import { useAtom } from 'jotai';
import { Auth } from '@supabase/auth-ui-react';
import { sessionAtom } from './states/session';
import { useFetchFusen } from './hooks/useFetchFusen';

function App() {
	const [session, setSession] = useAtom(sessionAtom);
	const { loading } = useFetchFusen();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="overflow-hidden">
			{!session ? (
				<Auth supabaseClient={supabase} providers={['google']} />
			) : (
				<Field key={session.user.id} />
			)}
		</div>
	);
}

export default App;
