import Modal from '@/components/Modal';
import { BsFillStickiesFill } from 'react-icons/bs';
import { getFusenIdsAtom } from '@/states/fusen';
import { useAtom } from 'jotai';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useFetchFusen } from '@/hooks/useFetchFusen';
import Loading from '@/components/Loading';

export default function Main() {
	const [fusenIds] = useAtom(getFusenIdsAtom);
	const navigate = useNavigate();
	const { loading } = useFetchFusen({ withArchived: true });

	if (loading) return <Loading />;

	return (
		<div>
			<div className="mx-auto w-full max-w-screen-xl px-4">
				<div className="flex justify-center py-4">
					<div className="w-full">
						<div className="py-3 text-sm">
							{fusenIds.map((id) => (
								<Card id={id} key={id} />
							))}
						</div>
					</div>
				</div>
			</div>
			<button
				onClick={(e) => {
					e.preventDefault();
					navigate('/');
				}}
				title="to palette"
				className="fixed bottom-10 right-8 z-10 flex h-16 w-16 items-center justify-center text-4xl rounded-full bg-blue-600 text-2xl sm:text-4xl sm:h-20 sm:w-20 text-white drop-shadow-lg hover:bg-blue-700 hover:drop-shadow-2xl"
			>
				<BsFillStickiesFill />
			</button>
			<Modal />
		</div>
	);
}
