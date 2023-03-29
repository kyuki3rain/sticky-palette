import Fusen from './Fusen';
import { useAtom, useSetAtom } from 'jotai';
import { useFetchFusen } from '@/hooks/useFetchFusen';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { useCallback, useRef, useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { supabase } from '@/lib/initSupabase';
import { COLOR_TAGS } from '@/const/colorTags';
import ColorTag from './ColorTag';
import Modal from '../../components/Modal';
import { getFusenIdsAtom } from '@/states/fusen';
import Loading from '@/components/Loading';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setTransformRefAtom } from '@/states/transformRef';

export default function Field() {
	const ref = useRef<ReactZoomPanPinchRef | null>(null);
	const setTransformRef = useSetAtom(setTransformRefAtom);

	const [fusenIds] = useAtom(getFusenIdsAtom);
	const [isMoveable, setIsMoveable] = useState<boolean>(false);
	const { height, width } = useWindowSize();
	const { loading } = useFetchFusen();
	const navigate = useNavigate();

	const onDrag = useCallback(() => {
		setIsMoveable(true);
	}, []);
	const onStop = useCallback(() => {
		setIsMoveable(false);
	}, []);

	if (loading) return <Loading />;

	return (
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
				onInit={() => {
					setTransformRef(ref);
				}}
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
			<button
				onClick={(e) => {
					e.preventDefault();
					navigate('list');
				}}
				title="Contact Sale"
				className="fixed bottom-10 right-8 z-10 flex h-16 w-16 items-center justify-center text-4xl rounded-full bg-blue-600 text-2xl sm:text-4xl sm:h-20 sm:w-20 text-white drop-shadow-lg hover:bg-blue-700 hover:drop-shadow-2xl"
			>
				<AiOutlineUnorderedList />
			</button>
			<Modal />
		</div>
	);
}
