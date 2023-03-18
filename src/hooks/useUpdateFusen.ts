import { supabase } from '@/lib/initSupabase';
import { setFusenAtom } from '@/states/fusen';
import { Fusen } from '@/types/fusen';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

export const useUpdateFusen = () => {
	const setFusen = useSetAtom(setFusenAtom);

	const updateFusenPosition = useCallback((fusen: Fusen) => {
		if (fusen.user_id === undefined) return;

		setFusen(fusen);

		supabase
			.from('fusens')
			.update({ x: fusen.x, y: fusen.y })
			.eq('id', fusen.id)
			.then((res) => {
				if (res.error) alert(res.error.message);
			});
	}, []);

	return {
		updateFusenPosition,
	};
};
