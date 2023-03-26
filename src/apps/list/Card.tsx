import { getBGColor } from '@/const/colorTags';
import { getFusenAtom } from '@/states/fusen';
import { openModalAtom } from '@/states/modal';
import { useAtomValue, useSetAtom } from 'jotai';
import moment from 'moment';

type Props = {
	id: string;
};

export default function Card({ id }: Props) {
	const fusen = useAtomValue(getFusenAtom(id));
	const open = useSetAtom(openModalAtom);

	if (!fusen) return <></>;

	return (
		<div
			className="my-2 flex cursor-pointer justify-start rounded-md p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-400"
			onClick={(e) => {
				e.preventDefault();
				open(fusen);
			}}
			onKeyDown={(e) => {}}
		>
			<span className={`m-2 h-2 w-2 rounded-full ${getBGColor(fusen.color)}`} />
			<div className="grow px-2 font-medium">
				<div className="truncate">{fusen.title ?? fusen.content}</div>
			</div>
			<div className="hidden text-sm font-normal tracking-wide text-gray-500 sm:block md:block lg:block xl:block">
				{moment(fusen.updated_at).format('YYYY/MM/DD')}
			</div>
		</div>
	);
}
