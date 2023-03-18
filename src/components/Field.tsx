import Fusen from './Fusen';
import { useAtom } from 'jotai';
import { getFusenIdsAtom } from '../states/fusen';
import { useFetchFusen } from '@/hooks/useFetchFusen';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { useCallback, useRef, useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function Field() {
	const [fusenIds] = useAtom(getFusenIdsAtom);
	const { loading } = useFetchFusen();
	const [isMoveable, setIsMoveable] = useState<boolean>(false);
	const { height, width } = useWindowSize();

	const onDrag = useCallback(() => {
		setIsMoveable(true);
	}, []);
	const onStop = useCallback(() => {
		setIsMoveable(false);
	}, []);

	return (
		<TransformWrapper
			initialScale={1}
			disabled={isMoveable}
			minScale={0.5}
			maxScale={3}
			limitToBounds={false}
			pinch={{ step: 5 }}
		>
			{({ instance }) => (
				<TransformComponent contentClass='main' wrapperStyle={{ height, width }}>
					{loading ? (
						<p>Loading...</p>
					) : (
						[...fusenIds].map((id) => (
							<Fusen
								id={id}
								key={id}
								onDrag={onDrag}
								onStop={onStop}
								scale={instance.transformState.scale}
							/>
						))
					)}
				</TransformComponent>
			)}
		</TransformWrapper>
	);
}
