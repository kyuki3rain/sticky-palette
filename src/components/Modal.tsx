import { COLOR_TAGS, getBGColor } from '@/const/colorTags';
import { SIZE_TAGS } from '@/const/size';
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
	const { createOrUpdateFusen, deleteFusenFromId } = useUpdateFusen();

	const close = useSetAtom(closeModalAtom);
	const params = useAtomValue(getModalParamsAtom);
	const [title, setTitle] = useState(params.title ?? '');
	const [content, setContent] = useState(params.content ?? '');
	const [color, setColor] = useState(params.color ?? 'gray');
	const [size, setSize] = useState(params.size ?? 'small');

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
					<div className="flex">
						<div className="flex-1">
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
						</div>
						<div className="flex-1">
							<label htmlFor="size">Size:</label>
							<div className="flex items-center space-x-2">
								<select
									id="size"
									value={size}
									onChange={(e) =>
										setSize(SIZE_TAGS.find((size) => size === e.target.value) ?? 'small')
									}
									className="border border-gray-300 p-2 rounded-md"
								>
									{SIZE_TAGS.map((size) => (
										<option key={size} value={size}>
											{size}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<div className="flex justify-end space-x-2 pt-4">
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								if (params.id) {
									deleteFusenFromId(params.id);
									close();
								}
							}}
							className="border bg-red-500 text-white px-3 py-1 rounded-md mr-auto"
						>
							Delete
						</button>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								close();
							}}
							className="border border-gray-300 px-3 py-1 rounded-md"
						>
							Cancel
						</button>
						<button
							type="button"
							className="bg-blue-500 text-white px-3 py-1 rounded-md"
							onClick={(e) => {
								e.stopPropagation();
								createOrUpdateFusen({ title, content, color, size }, params.id);
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
