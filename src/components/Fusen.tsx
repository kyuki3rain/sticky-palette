import Draggable from 'react-draggable';
import { useAtomValue } from 'jotai';
import { getFusenAtom } from '../states/fusen';
import { useRef } from 'react';

type Props = {
	id: string;
};

export default function Fusen({ id }: Props) {
	const fusen = useAtomValue(getFusenAtom(id));
	const nodeRef = useRef(null);

	if (fusen === null) return <></>;

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
