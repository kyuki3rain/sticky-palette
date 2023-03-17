import Draggable from 'react-draggable';
import { useAtom } from 'jotai';
import { getFusenAtom } from '../states/fusen';
import { useRef } from 'react';

type Props = {
	id: string;
};

export default function Fusen({ id }: Props) {
	const [fusen] = useAtom(getFusenAtom(id));
	const nodeRef = useRef(null);

	return (
		<Draggable defaultPosition={fusen.position} nodeRef={nodeRef}>
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
