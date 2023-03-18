import Draggable from 'react-draggable';
import { useAtomValue } from 'jotai';
import { getFusenAtom } from '../states/fusen';
import { useRef } from 'react';
import { useUpdateFusen } from '@/hooks/useUpdateFusen';

type Props = {
	id: string;
	onDrag: (x: number, y: number) => void;
	onStop: (x: number, y: number) => void;
	scale: number;
};

export default function Fusen({ id, onDrag, onStop, scale }: Props) {
	const fusen = useAtomValue(getFusenAtom(id));
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
			scale={scale}
		>
			<div
				ref={nodeRef}
				className="absolute top-0 left-0 w-64 h-64 bg-gray-200 rounded-md shadow-md"
			>
				<h2>{fusen.title}</h2>
				<p>{fusen.content}</p>
			</div>
		</Draggable>
	);
}
