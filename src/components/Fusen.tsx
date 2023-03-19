import Draggable from 'react-draggable';
import { useAtomValue, useSetAtom } from 'jotai';
import { getFusenAtom, orderFusenIdAtom } from '../states/fusen';
import { useRef } from 'react';
import { useUpdateFusen } from '@/hooks/useUpdateFusen';
import { getBGColor } from '@/const/colorTags';
import { openModalAtom } from '@/states/modal';

type Props = {
	id: string;
	onDrag: (x: number, y: number) => void;
	onStop: (x: number, y: number) => void;
	scale: number;
};

export default function Fusen({ id, onDrag, onStop, scale }: Props) {
	const open = useSetAtom(openModalAtom);
	const fusen = useAtomValue(getFusenAtom(id));
	const orderFusen = useSetAtom(orderFusenIdAtom);
	const { updateFusenPosition } = useUpdateFusen();
	const nodeRef = useRef(null);

	if (fusen === null) return <></>;

	return (
		<Draggable
			defaultPosition={{ x: fusen.x, y: fusen.y }}
			nodeRef={nodeRef}
			onStop={(_, data) => {
				onStop(data.x, data.y);
				updateFusenPosition({ ...fusen, x: data.x, y: data.y });
			}}
			onDrag={(_, data) => onDrag(data.x, data.y)}
			onStart={() => orderFusen(id)}
			scale={scale}
		>
			<div
				ref={nodeRef}
				className={`absolute top-0 left-0 w-64 h-64 ${getBGColor(
					fusen.color,
				)} rounded-md shadow-md px-2 py-1`}
				onDoubleClick={(e) => {
					e.stopPropagation();
					open(fusen);
				}}
			>
				<div className="text-xl">{fusen.title}</div>
				<div className="pt-1 break-words">{fusen.content}</div>
			</div>
		</Draggable>
	);
}
