import { ja } from '@/const/ja';
import { supabase } from '@/lib/initSupabase';
import { getIsPasswordResetAtom } from '@/states/session';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAtomValue } from 'jotai';

export default function Main() {
	const isPasswordReset = useAtomValue(getIsPasswordResetAtom);

	return (
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
							brandButtonText: ThemeSupa.default.colors?.brandAccent,
							brand: ThemeSupa.default.colors?.defaultButtonBackground,
							defaultButtonBackgroundHover: '#6b7280',
						},
					},
				},
			}}
			localization={{
				variables: ja,
			}}
		/>
	);
}
