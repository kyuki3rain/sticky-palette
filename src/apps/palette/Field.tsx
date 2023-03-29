import Fusen from './Fusen';
import { useAtom } from 'jotai';
import { useFetchFusen } from '@/hooks/useFetchFusen';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useCallback, useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { supabase } from '@/lib/initSupabase';
import { COLOR_TAGS } from '@/const/colorTags';
import ColorTag from './ColorTag';
import Modal from '../../components/Modal';
import { getFusenIdsAtom } from '@/states/fusen';
import Loading from '@/components/Loading';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useTransformRef } from '@/hooks/useTransformRef';

export default function Field() {
	const [fusenIds] = useAtom(getFusenIdsAtom);
	const [isMoveable, setIsMoveable] = useState<boolean>(false);
	const navigate = useNavigate();
	const { height, width } = useWindowSize();
	const { loading } = useFetchFusen();
	const { ref } = useTransformRef();

	const onDrag = useCallback(() => {
		setIsMoveable(true);
	}, []);
	const onStop = useCallback(() => {
		setIsMoveable(false);
	}, []);

	if (loading) return <Loading />;

	return (
		<>
			<div className="select-none">
				<TransformWrapper
					initialScale={1}
					disabled={isMoveable}
					minScale={0.1}
					maxScale={3}
					initialPositionX={width / 2}
					initialPositionY={height / 2}
					limitToBounds={false}
					pinch={{ step: 5 }}
					doubleClick={{ disabled: true }}
					ref={ref}
				>
					{({ instance }) => (
						<TransformComponent contentClass='main' wrapperStyle={{ height, width }}>
							{[...fusenIds].map((id) => (
								<Fusen
									id={id}
									key={id}
									onDrag={onDrag}
									onStop={onStop}
									scale={instance.transformState.scale}
								/>
							))}
						</TransformComponent>
					)}
				</TransformWrapper>
				<button
					className="absolute top-2 right-4 button block"
					type="button"
					onClick={() => supabase.auth.signOut()}
				>
					Sign Out
				</button>
				<div className='absolute top-0 -left-8 h-full overflow-y-scroll hidden-scrollbar hover:w-20'>
					{COLOR_TAGS.map((color) => (
						<ColorTag key={color} color={color} />
					))}
				</div>
			</div>
			<button
				onClick={(e) => {
					e.preventDefault();
					navigate('list');
				}}
				title="to list"
				className="fixed bottom-10 right-8 flex h-16 w-16 items-center justify-center text-4xl rounded-full bg-blue-600 text-2xl sm:text-4xl sm:h-20 sm:w-20 text-white drop-shadow-lg hover:bg-blue-700 hover:drop-shadow-2xl"
			>
				<AiOutlineUnorderedList />
			</button>
			<Modal />
		</>
	);
}
