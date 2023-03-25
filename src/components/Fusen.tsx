import Draggable from 'react-draggable';
import { useAtomValue, useSetAtom } from 'jotai';
import { getFusenAtom, orderFusenIdAtom } from '../states/fusen';
import { useMemo, useRef, useState } from 'react';
import { useUpdateFusen } from '@/hooks/useUpdateFusen';
import { getBGColor } from '@/const/colorTags';
import { openModalAtom } from '@/states/modal';
import { getSize } from '@/const/size';

type Props = {
	id: string;
	onDrag: () => void;
	onStop: () => void;
	scale: number;
};

export default function Fusen({ id, onDrag, onStop, scale }: Props) {
	const open = useSetAtom(openModalAtom);
	const fusen = useAtomValue(getFusenAtom(id));
	const orderFusen = useSetAtom(orderFusenIdAtom);
	const { updateFusenPosition } = useUpdateFusen();
	const nodeRef = useRef(null);
	const [touched, setTouched] = useState(false);

	if (fusen === null) return <></>;

	const size = useMemo(() => getSize(fusen.size), [fusen]);

	return (
		<Draggable
			defaultPosition={{ x: fusen.x - size.width / 2, y: fusen.y - size.height / 2 }}
			nodeRef={nodeRef}
			onStop={(_, data) => {
				onStop();
				if (fusen.x !== data.x || fusen.y !== data.y)
					updateFusenPosition({
						...fusen,
						x: data.x + size.width / 2,
						y: data.y + size.height / 2,
					});
			}}
			onDrag={() => onDrag()}
			onStart={() => orderFusen(id)}
			scale={scale}
		>
			<div
				ref={nodeRef}
				className={`absolute top-0 left-0 ${size.widthCSS} ${size.heightCSS} ${getBGColor(
					fusen.color,
				)} rounded-md shadow-md px-2 py-1`}
				onDoubleClick={(e) => {
					e.stopPropagation();
					open(fusen);
				}}
				onTouchStart={(e) => {
					e.stopPropagation();
					if (touched) open(fusen);
					else {
						setTouched(true);
						setTimeout(() => setTouched(false), 400);
					}
				}}
			>
				<div className="text-xl">{fusen.title}</div>
				<div className="pt-1 break-words whitespace-pre-line">{fusen.content}</div>
			</div>
		</Draggable>
	);
}
