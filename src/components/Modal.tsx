import { COLOR_TAGS, getBGColor } from '@/const/colorTags';
import { useUpdateFusen } from '@/hooks/useUpdateFusen';
import { closeModalAtom, getModalParamsAtom, isOpenModalAtom } from '@/states/modal';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';

const Modal = () => {
	const isOpen = useAtomValue(isOpenModalAtom);

	if (!isOpen) return <></>;

	return <ModalView />;
};

const ModalView = () => {
	const { createOrUpdateFusen } = useUpdateFusen();

	const close = useSetAtom(closeModalAtom);
	const params = useAtomValue(getModalParamsAtom);
	const [title, setTitle] = useState(params.title ?? '');
	const [content, setContent] = useState(params.content ?? '');
	const [color, setColor] = useState(params.color ?? 'gray');

	return (
		<div className='fixed top-0 left-0 w-full h-full block'>
			<div
				className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
				onClick={(e) => {
					e.stopPropagation();
					close();
				}}
				onKeyDown={(e) => {
					e.stopPropagation();
					close();
				}}
			/>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4">
				<div className="flex flex-col space-y-2 w-80">
					<label htmlFor="title">Title:</label>
					<input
						id="title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.currentTarget.value)}
						className="border border-gray-300 p-2 rounded-md"
					/>
					<label htmlFor="content">Content:</label>
					<textarea
						id="content"
						value={content}
						onChange={(e) => setContent(e.currentTarget.value)}
						className="border border-gray-300 p-2 rounded-md"
					/>
					<label htmlFor="color">Color:</label>
					<div className="flex items-center space-x-2">
						<select
							id="color"
							value={color}
							onChange={(e) =>
								setColor(COLOR_TAGS.find((color) => color === e.target.value) ?? 'gray')
							}
							className="border border-gray-300 p-2 rounded-md"
						>
							{COLOR_TAGS.map((color) => (
								<option key={color} value={color}>
									{color}
								</option>
							))}
						</select>
						<div className={`w-6 h-6 rounded-full ${getBGColor(color)}`} />
					</div>
					<div className="flex justify-end space-x-2 pt-4">
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								close();
							}}
							className="border border-gray-300 p-2 rounded-md"
						>
							Cancel
						</button>
						<button
							type="button"
							className="bg-blue-500 text-white p-2 rounded-md"
							onClick={() => {
								createOrUpdateFusen(title, content, color, params.id);
								close();
							}}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
