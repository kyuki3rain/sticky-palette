import { useEffect, useState } from 'react';
import Field from './components/Field';
import { supabase } from '@/lib/initSupabase';
import { useAtom } from 'jotai';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { sessionAtom } from './states/session';
import { useFetchFusen } from './hooks/useFetchFusen';
import { ja } from './const/ja';

function App() {
	const [session, setSession] = useAtom(sessionAtom);
	const [isPasswordReset, setIsPasswordReset] = useState(false);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'PASSWORD_RECOVERY') setIsPasswordReset(true);
			else setIsPasswordReset(false);
			setSession(session);
		});
	}, []);

	return (
		<div className="overflow-hidden">
			{!session || isPasswordReset ? (
				<Auth
					supabaseClient={supabase}
					view={isPasswordReset ? 'update_password' : 'sign_in'}
					providers={['google']}
					appearance={{
						theme: ThemeSupa,
						className: {
							container: 'w-full max-w-sm md:max-w-md mx-auto',
							button: 'hover:text-white',
						},
						style: {
							container: {
								marginRight: 'auto',
								marginLeft: 'auto',
							},
						},
						variables: {
							default: {
								colors: {
									brand: ThemeSupa.default.colors?.brandAccent,
									defaultButtonBackground: ThemeSupa.default.colors?.defaultButtonBackgroundHover,
									inputBackground: '',
								},
							},
						},
					}}
					localization={{
						variables: ja,
					}}
				/>
			) : (
				<Field key={session.user.id} />
			)}
		</div>
	);
}

export default App;
