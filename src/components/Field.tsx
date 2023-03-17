import Fusen from './Fusen';
import { useAtom } from 'jotai';
import { getFusenIdsAtom } from '../states/fusen';

export default function Field() {
	const [fusenIds] = useAtom(getFusenIdsAtom);

	return (
		<div className="relative w-full h-full">
			{fusenIds.map((id) => (
				<Fusen id={id} key={id} />
			))}
		</div>
	);
}
