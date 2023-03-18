import { supabase } from '@/lib/initSupabase';
import { sessionAtom } from '@/states/session';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { setFusensAtom } from '../states/fusen';

export const useFetchFusen = () => {
	const setFusens = useSetAtom(setFusensAtom);
	const session = useAtomValue(sessionAtom);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (loading) return;

		async function getProfile() {
			if (session === null) return;

			setLoading(true);
			const { user } = session;

			let { data, error } = await supabase.from('fusens').select('*').eq('user_id', user.id);

			if (error) {
				console.warn(error);
			} else if (data) {
				setFusens(data);
				console.log(data);
			}

			setLoading(false);
		}

		getProfile();
	}, [session]);

	return { loading };
};
