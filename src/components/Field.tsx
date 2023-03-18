import Fusen from './Fusen';
import { useAtom } from 'jotai';
import { getFusenIdsAtom } from '../states/fusen';
import { useFetchFusen } from '@/hooks/useFetchFusen';

export default function Field() {
	const [fusenIds] = useAtom(getFusenIdsAtom);

	const { loading } = useFetchFusen();

	return (
		<div className="relative w-full h-full">
			{loading ? <p>Loading...</p> : [...fusenIds].map((id) => <Fusen id={id} key={id} />)}
		</div>
	);
}
