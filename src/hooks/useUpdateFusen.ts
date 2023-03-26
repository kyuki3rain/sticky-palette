import { COLOR_TAGS } from '@/const/colorTags';
import { SIZE_TAGS } from '@/const/size';
import { supabase } from '@/lib/initSupabase';
import {
	getWithArchivedAtom,
	orderFusenIdAtom,
	removeFusenAtom,
	setFusenAtom,
} from '@/states/fusen';
import { userAtom } from '@/states/session';
import { Fusen } from '@/types/fusen';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

type Params = {
	title: string;
	content: string;
	color: string;
	size: string;
};

const validateParams = (params: Params) => {
	if (!COLOR_TAGS.includes(params.color)) return false;
	if (!SIZE_TAGS.includes(params.size)) return false;

	return true;
};

export const useUpdateFusen = () => {
	const setFusen = useSetAtom(setFusenAtom);
	const removeFusen = useSetAtom(removeFusenAtom);
	const orderFusenId = useSetAtom(orderFusenIdAtom);
	const user = useAtomValue(userAtom);
	const withArchived = useAtomValue(getWithArchivedAtom);

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

	const archiveFusen = useCallback((id: string) => {
		supabase
			.from('fusens')
			.update({ is_archived: true })
			.eq('id', id)
			.then((res) => {
				if (res.error) console.warn(res.error.message);
				else if (!withArchived) removeFusen(id);
				else orderFusenId(id);
			});
	}, []);

	const deleteFusen = useCallback((id: string) => {
		supabase
			.from('fusens')
			.delete()
			.eq('id', id)
			.eq('is_archived', true)
			.then((res) => {
				if (res.error) console.warn(res.error.message);
				else removeFusen(id);
			});
	}, []);

	const createFusen = useCallback(
		(params: Params) => {
			if (user === null) return;

			supabase
				.from('fusens')
				.insert({ ...params, user_id: user.id })
				.select()
				.then((res) => {
					if (res.error) console.warn(res.error.message);
					else if (res.data) setFusen(res.data[0]);
				});
		},
		[user],
	);

	const updateFusen = useCallback((params: Params, id: string) => {
		supabase
			.from('fusens')
			.update({ ...params })
			.eq('id', id)
			.select()
			.then((res) => {
				console.log(res);
				if (res.error) console.warn(res.error.message);
				else if (res.data) setFusen(res.data[0]);
			});
	}, []);

	const createOrUpdateFusen = useCallback((params: Params, id?: string) => {
		if (!validateParams(params)) return;

		if (id === undefined) createFusen(params);
		else updateFusen(params, id);
	}, []);

	return {
		updateFusenPosition,
		createOrUpdateFusen,
		archiveFusen,
		deleteFusen,
	};
};
