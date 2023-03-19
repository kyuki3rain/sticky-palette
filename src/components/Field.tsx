import Fusen from './Fusen';
import { useAtom } from 'jotai';
import { getFusenIdsAtom } from '../states/fusen';
import { useFetchFusen } from '@/hooks/useFetchFusen';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { useCallback, useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { supabase } from '@/lib/initSupabase';
import { COLOR_TAGS } from '@/const/colorTags';
import ColorTag from './ColorTag';
import Modal from './Modal';

export default function Field() {
	const [fusenIds] = useAtom(getFusenIdsAtom);
	const [isMoveable, setIsMoveable] = useState<boolean>(false);
	const { height, width } = useWindowSize();

	const onDrag = useCallback(() => {
		setIsMoveable(true);
	}, []);
	const onStop = useCallback(() => {
		setIsMoveable(false);
	}, []);

	return (
		<>
			<TransformWrapper
				initialScale={1}
				disabled={isMoveable}
				minScale={0.5}
				maxScale={3}
				initialPositionX={width / 2}
				initialPositionY={height / 2}
				limitToBounds={false}
				pinch={{ step: 5 }}
				doubleClick={{ disabled: true }}
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
			<Modal />
		</>
	);
}
