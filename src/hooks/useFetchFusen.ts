import { supabase } from '@/lib/initSupabase';
import { userAtom } from '@/states/session';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { setFusensAtom, setWithArchivedAtom } from '../states/fusen';

type Props = {
	withArchived: boolean;
};

export const useFetchFusen = ({ withArchived }: Props = { withArchived: false }) => {
	const setFusens = useSetAtom(setFusensAtom);
	const setWithArchived = useSetAtom(setWithArchivedAtom);
	const user = useAtomValue(userAtom);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (loading) return;

		async function getProfile() {
			if (user === null) return;

			setLoading(true);

			let { data, error } = withArchived
				? await supabase
						.from('fusens')
						.select('*')
						.eq('user_id', user.id)
						.order('updated_at', { ascending: true })
				: await supabase
						.from('fusens')
						.select('*')
						.eq('user_id', user.id)
						.eq('is_archived', false)
						.order('updated_at', { ascending: true });

			if (error) {
				console.warn(error);
			} else if (data) {
				setFusens(data);
				setWithArchived(withArchived);
				console.log('fetch fusens');
			}

			setLoading(false);
		}

		getProfile();
	}, [user]);

	return { loading };
};
