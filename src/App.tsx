import { useEffect } from 'react';
import Field from './components/Field';
import { supabase } from '@/lib/initSupabase';
import Auth from '@/components/Auth';
import { useAtom } from 'jotai';
import { sessionAtom } from './states/session';

function App() {
	const [session, setSession] = useAtom(sessionAtom);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<div className="container" style={{ padding: '50px 0 100px 0' }}>
			{!session ? <Auth /> : <Field key={session.user.id} />}
		</div>
	);
}

export default App;
