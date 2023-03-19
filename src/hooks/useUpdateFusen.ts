import { supabase } from '@/lib/initSupabase';
import { setFusenAtom } from '@/states/fusen';
import { sessionAtom } from '@/states/session';
import { Fusen } from '@/types/fusen';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

export const useUpdateFusen = () => {
	const setFusen = useSetAtom(setFusenAtom);
	const session = useAtomValue(sessionAtom);

	const updateFusenPosition = useCallback((fusen: Fusen) => {
		if (fusen.user_id === undefined) return;

		setFusen(fusen);

		supabase
			.from('fusens')
			.update({ x: fusen.x, y: fusen.y })
			.eq('id', fusen.id)
			.then((res) => {
				if (res.error) console.warn(res.error.message);
			});
	}, []);

	const createFusen = useCallback(
		(title: string, content: string, color: string) => {
			if (session === null) return;

			supabase
				.from('fusens')
				.insert({ title, content, color, user_id: session.user.id })
				.select()
				.then((res) => {
					if (res.error) console.warn(res.error.message);
					else if (res.data) setFusen(res.data[0]);
				});
		},
		[session],
	);

	const updateFusen = useCallback((title: string, content: string, color: string, id: string) => {
		supabase
			.from('fusens')
			.update({ title, content, color })
			.eq('id', id)
			.select()
			.then((res) => {
				console.log(res);
				if (res.error) console.warn(res.error.message);
				else if (res.data) setFusen(res.data[0]);
			});
	}, []);

	const createOrUpdateFusen = useCallback(
		(title: string, content: string, color: string, id?: string) => {
			if (id === undefined) createFusen(title, content, color);
			else updateFusen(title, content, color, id);
		},
		[],
	);

	return {
		updateFusenPosition,
		createOrUpdateFusen,
	};
};
