import { supabase } from '@/lib/initSupabase';
import { userAtom } from '@/states/session';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { setFusensAtom } from '../states/fusen';

export const useFetchFusen = () => {
	const setFusens = useSetAtom(setFusensAtom);
	const user = useAtomValue(userAtom);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (loading) return;

		async function getProfile() {
			if (user === null) return;

			setLoading(true);

			let { data, error } = await supabase
				.from('fusens')
				.select('*')
				.eq('user_id', user.id)
				.eq('is_archived', false)
				.order('updated_at', { ascending: true });

			if (error) {
				console.warn(error);
			} else if (data) {
				setFusens(data);
				console.log('fetch fusens');
			}

			setLoading(false);
		}

		getProfile();
	}, [user]);

	return { loading };
};
