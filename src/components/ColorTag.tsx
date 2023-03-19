import { getBGColor } from '@/const/colorTags';
import { openModalAtom } from '@/states/modal';
import { useSetAtom } from 'jotai';
import { useMemo } from 'react';

export default function ColorTag({ color }: { color: string }) {
	const open = useSetAtom(openModalAtom);
	const bgColor = useMemo(() => getBGColor(color), [color]);

	return (
		<div
			className={`${bgColor} w-16 h-16 rounded-md mt-2 hover:transition-transform hover:translate-x-4`}
			onClick={(e) => {
				e.stopPropagation();
				console.log('sa');
				open({ color });
			}}
			onKeyDown={(e) => {
				e.stopPropagation();
				open({ color });
			}}
		/>
	);
}
